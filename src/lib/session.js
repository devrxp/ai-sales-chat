const SESSION_KEY = 'ai-sales-chat:session-id'

/**
 * Retorna um ID de sessão estável para a aba atual.
 * O agente usa esse ID para manter a memória da conversa.
 */
export function getSessionId() {
  try {
    let id = sessionStorage.getItem(SESSION_KEY)
    if (!id) {
      id = crypto.randomUUID()
      sessionStorage.setItem(SESSION_KEY, id)
    }
    return id
  } catch {
    // sessionStorage indisponível (modo privado, iframe sandbox etc.)
    return crypto.randomUUID()
  }
}

export function resetSession() {
  try {
    sessionStorage.removeItem(SESSION_KEY)
  } catch {
    /* sem armazenamento: nada a limpar */
  }
}
