import { useState } from 'react'
import Chat from './components/Chat'
import { resetSession } from './lib/session'

export default function App() {
  // Trocar a key remonta o Chat: conversa e sessão começam do zero
  const [conversation, setConversation] = useState(0)

  const handleReset = () => {
    resetSession()
    setConversation((n) => n + 1)
  }

  return <Chat key={conversation} onReset={handleReset} />
}
