import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    base: mode === 'production' ? '/MAX/' : '/',
    build: {
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return

            if (id.includes('html2pdf.js')) return 'pdf-html2pdf'
            if (id.includes('jspdf')) return 'pdf-jspdf'
            if (id.includes('html2canvas')) return 'pdf-html2canvas'
            if (id.includes('react') || id.includes('scheduler')) return 'vendor-react'
            if (id.includes('framer-motion')) return 'vendor-motion'
            if (id.includes('lucide-react')) return 'vendor-icons'
          },
        },
      },
    },
  }
})
