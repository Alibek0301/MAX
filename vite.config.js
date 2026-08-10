import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const normalizeBase = (value) => {
  if (!value || value === '.' || value === './') return './'
  const withLeadingSlash = value.startsWith('/') ? value : `/${value}`
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`
}

const defaultRepoBase = '/TransferPro/'

export default defineConfig(({ mode }) => {
  const configuredBase = process.env.VITE_BASE_PATH || './'

  return {
    plugins: [react()],
    // GitHub Pages project sites can be hosted under a repository subpath.
    // Use a relative base by default so the app works across deployments.
    base: mode === 'production' ? normalizeBase(configuredBase) : '/',
    build: {
      // PDF generation is loaded on demand and stays isolated in a separate chunk.
      // Increase warning threshold to reduce noise for this optional feature bundle.
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
