// URL de imagem "solta" no texto, que não esteja já dentro de um link markdown ( ... )
const RAW_IMAGE_URL = /(?<!\()(https?:\/\/[^\s)]+?\.(?:jpg|jpeg|png|webp|avif|gif|svg)(?:\?[^\s)]*)?)(?!\))/gi

/**
 * Extrai o texto da resposta do agente.
 * Aceita os formatos mais comuns de webhooks (n8n, FastAPI, etc.):
 * string, { output }, { message }, { text }, { response } ou um array com um desses.
 */
export function extractReply(data) {
  const item = Array.isArray(data) ? data[0] : data
  if (typeof item === 'string') return item
  if (!item || typeof item !== 'object') return ''
  return item.output ?? item.message ?? item.text ?? item.response ?? JSON.stringify(item)
}

/**
 * LLMs às vezes devolvem a URL da imagem sem a sintaxe markdown.
 * Converte essas URLs em ![](url) para que a imagem seja renderizada no chat.
 */
export function linkifyImages(text) {
  return text.replace(RAW_IMAGE_URL, '![]($1)')
}
