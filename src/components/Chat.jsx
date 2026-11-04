import { useMemo } from 'react'
import { AssistantRuntimeProvider, useLocalRuntime } from '@assistant-ui/react'
import { Thread } from '@assistant-ui/react-ui'
import '@assistant-ui/react-ui/styles/index.css'
import '@assistant-ui/react-markdown/styles/dot.css'
import { RotateCcw } from 'lucide-react'

import MarkdownText from './MarkdownText'
import InfoPanel from './InfoPanel'
import { sendMessage, typewriter, isDemoMode } from '../lib/chatClient'
import { getSessionId } from '../lib/session'

const WELCOME = {
  message:
    'Olá! 👋 Eu sou a Bia, assistente virtual de vendas. Posso mostrar carros do estoque, simular financiamento e agendar test drive.',
  suggestions: [
    { prompt: 'Quais carros vocês têm no estoque?' },
    { prompt: 'Procuro um SUV para a família' },
    { prompt: 'Quero agendar um test drive' },
  ],
}

// textos da interface do assistant-ui em português
const STRINGS = {
  composer: {
    input: { placeholder: 'Digite sua mensagem...' },
    send: { tooltip: 'Enviar' },
    cancel: { tooltip: 'Parar' },
  },
  thread: { scrollToBottom: { tooltip: 'Ir para o fim' } },
  assistantMessage: {
    copy: { tooltip: 'Copiar' },
    reload: { tooltip: 'Gerar de novo' },
  },
  userMessage: { edit: { tooltip: 'Editar' } },
}

const ERROR_TEXT = 'Desculpe, tive um problema de conexão com o agente. Tente novamente em instantes.'

export default function Chat({ onReset }) {
  const sessionId = useMemo(() => getSessionId(), [])

  const adapter = useMemo(
    () => ({
      async *run({ messages, abortSignal }) {
        const last = messages[messages.length - 1]
        const text = last.content
          .filter((part) => part.type === 'text')
          .map((part) => part.text)
          .join('')
          .trim()
        if (!text) return

        try {
          const reply = await sendMessage({ text, sessionId, signal: abortSignal })
          for await (const partial of typewriter(reply, { signal: abortSignal })) {
            yield { content: [{ type: 'text', text: partial }] }
          }
        } catch (err) {
          if (abortSignal?.aborted) return
          console.error('[chat] falha ao falar com o agente:', err)
          yield { content: [{ type: 'text', text: ERROR_TEXT }] }
        }
      },
    }),
    [sessionId],
  )

  const runtime = useLocalRuntime(adapter)

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-slate-50">
      <header className="relative z-10 flex w-full shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-xl text-white shadow-lg">
            🤖
          </div>
          <div>
            <h1 className="text-lg font-extrabold leading-tight tracking-tight text-slate-900">AI Sales Chat</h1>
            <p className="mt-0.5 flex items-center gap-1.5 text-sm font-medium text-green-600">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500" />
              Bia online{isDemoMode && ' · modo demo'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-100"
        >
          <RotateCcw size={16} />
          Nova conversa
        </button>
      </header>

      <main className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 flex-col gap-6 overflow-hidden p-4 sm:p-6 lg:flex-row lg:gap-8 lg:p-8">
        <section className="relative flex min-h-0 flex-[2] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <AssistantRuntimeProvider runtime={runtime}>
            <Thread
              welcome={WELCOME}
              strings={STRINGS}
              assistantMessage={{ components: { Text: MarkdownText } }}
            />
          </AssistantRuntimeProvider>
        </section>

        <InfoPanel />
      </main>
    </div>
  )
}
