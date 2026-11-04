/**
 * Agente simulado usado no modo demo (quando VITE_CHAT_WEBHOOK_URL não está definido).
 * Permite rodar e testar a interface sem backend, sem chave de API e sem custo.
 */

const CATALOG = [
  { name: 'Sedan Compacto 1.0', year: 2024, price: 'R$ 89.900', image: '/cars/sedan.svg', tags: ['economia', 'cidade'] },
  { name: 'SUV Médio Turbo', year: 2023, price: 'R$ 142.500', image: '/cars/suv.svg', tags: ['família', 'viagem', 'suv'] },
  { name: 'Hatch Elétrico', year: 2024, price: 'R$ 159.000', image: '/cars/hatch.svg', tags: ['elétrico', 'cidade'] },
]

const formatCar = (car) =>
  `**${car.name}** · ${car.year} · ${car.price}\n\n![${car.name}](${car.image})`

// A ordem importa: intenções específicas primeiro, saudação por último
const RULES = [
  {
    match: /(suv|família|familia|viagem)/i,
    reply: () => `Para família e viagem, esta é a nossa melhor opção:\n\n${formatCar(CATALOG[1])}\n\nQuer simular um financiamento?`,
  },
  {
    match: /(elétric|eletric)/i,
    reply: () => `Temos este elétrico disponível:\n\n${formatCar(CATALOG[2])}\n\nPosso agendar um test drive?`,
  },
  {
    match: /(estoque|carros|opç|opc|modelos|disponív|disponiv)/i,
    reply: () => `Estes são alguns carros do estoque:\n\n${CATALOG.map(formatCar).join('\n\n---\n\n')}`,
  },
  {
    match: /(financ|parcel|simul|entrada)/i,
    reply: () =>
      'Para simular, preciso de três informações:\n\n1. Qual carro te interessou\n2. Valor de entrada\n3. Em quantas parcelas (24, 36, 48 ou 60)\n\n_No modo demo os valores são ilustrativos._',
  },
  {
    match: /(test drive|agendar|visita|horário|horario)/i,
    reply: () =>
      'Claro! Tenho horários **amanhã às 10h** ou **às 15h**. Qual fica melhor? Assim que você confirmar, um vendedor recebe o agendamento.',
  },
  {
    match: /\b(oi|olá|ola|bom dia|boa tarde|boa noite)\b/i,
    reply: () =>
      'Olá! Eu sou a **Bia**, assistente virtual da loja. Posso te mostrar carros do estoque, simular um financiamento ou agendar um test drive. O que você procura?',
  },
]

const FALLBACK =
  'Posso te ajudar com **estoque**, **financiamento** ou **test drive**. Experimente perguntar: _"Quais carros vocês têm?"_'

export async function mockAgent(message) {
  await new Promise((r) => setTimeout(r, 500)) // simula a latência do LLM
  const rule = RULES.find((r) => r.match.test(message))
  return rule ? rule.reply() : FALLBACK
}
