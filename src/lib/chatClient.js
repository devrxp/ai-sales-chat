import { extractReply, linkifyImages } from './formatReply'
import { mockAgent } from './mockAgent'

const WEBHOOK_URL = import.meta.env.VITE_CHAT_WEBHOOK_URL

/** true quando não há backend configurado e o chat usa o agente simulado */
export const isDemoMode = !WEBHOOK_URL

/**
 * Envia a mensagem ao agente e devolve a resposta em texto (markdown).
 * Contrato do webhook: POST { chatInput, sessionId } -> { output } (ou variações aceitas por extractReply).
 */
export async function sendMessage({ text, sessionId, signal }) {
  if (isDemoMode) {
    return linkifyImages(await mockAgent(text))
  }

  const res = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chatInput: text, sessionId }),
    signal,
  })

  if (!res.ok) throw new Error(`Agente respondeu HTTP ${res.status}`)

  return linkifyImages(extractReply(await res.json()))
}

/**
 * Gera a resposta em pedaços para o efeito de digitação na interface.
 */
export async function* typewriter(text, { chunkSize = 2, delayMs = 12, signal } = {}) {
  for (let i = chunkSize; i < text.length + chunkSize; i += chunkSize) {
    if (signal?.aborted) return
    yield text.slice(0, i)
    await new Promise((r) => setTimeout(r, delayMs))
  }
}
