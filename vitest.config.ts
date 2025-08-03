// vitest.config.ts

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    // Adiciona o ambiente de navegador simulado (jsdom)
    environment: 'jsdom',
    globals: true,
  },
})
