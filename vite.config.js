import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // a biblioteca de chat em um chunk separado: melhor cache entre deploys
        manualChunks: {
          'assistant-ui': ['@assistant-ui/react', '@assistant-ui/react-ui', '@assistant-ui/react-markdown'],
        },
      },
    },
  },
})
