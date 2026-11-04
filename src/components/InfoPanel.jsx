import { Bot, Images, MessagesSquare, Webhook } from 'lucide-react'
import { isDemoMode } from '../lib/chatClient'

const FEATURES = [
  {
    icon: MessagesSquare,
    title: 'Conversa com memória',
    text: 'Cada aba recebe um ID de sessão. O agente usa esse ID para lembrar o contexto da conversa.',
  },
  {
    icon: Images,
    title: 'Respostas com imagens',
    text: 'Markdown renderizado com zoom nas fotos. URLs de imagem soltas no texto viram imagens automaticamente.',
  },
  {
    icon: Webhook,
    title: 'Backend desacoplado',
    text: 'O front conversa com qualquer agente via webhook: n8n, FastAPI ou outro serviço, com o mesmo contrato JSON.',
  },
  {
    icon: Bot,
    title: 'Efeito de digitação',
    text: 'A resposta é exibida em streaming no front para uma experiência mais natural.',
  },
]

export default function InfoPanel() {
  return (
    <aside className="no-scrollbar hidden max-w-[420px] flex-1 flex-col gap-5 overflow-y-auto pb-6 lg:flex">
      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
        <h3 className="mb-1 text-sm font-extrabold uppercase tracking-widest text-slate-900">Como funciona</h3>
        <p className="mb-6 text-sm text-slate-500">Webchat para atendimento comercial com agente de IA.</p>
        <ul className="flex flex-col gap-5">
          {FEATURES.map((feature) => (
            <li key={feature.title} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <feature.icon size={20} />
              </span>
              <div>
                <p className="font-bold text-slate-900">{feature.title}</p>
                <p className="text-sm leading-relaxed text-slate-600">{feature.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-800 p-7 text-white shadow-lg shadow-blue-500/20">
        <h3 className="mb-2 font-extrabold">{isDemoMode ? 'Modo demo' : 'Conectado ao agente'}</h3>
        <p className="text-[15px] leading-relaxed text-blue-50">
          {isDemoMode
            ? 'As respostas vêm de um agente simulado no navegador. Defina VITE_CHAT_WEBHOOK_URL para conectar um agente LLM real.'
            : 'As mensagens são enviadas ao agente configurado em VITE_CHAT_WEBHOOK_URL.'}
        </p>
      </div>
    </aside>
  )
}
