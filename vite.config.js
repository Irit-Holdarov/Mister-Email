import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  Base: "/Mister-Email",
  plugins: [react()],
})
