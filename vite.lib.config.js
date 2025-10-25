import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.js'),
      name: 'ReactGuidedWebTour',
      formats: ['es', 'umd'],
      fileName: (format) => `react-guided-webtour.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', '@heroui/react', 'framer-motion', 'clsx'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
          '@heroui/react': 'HeroUI',
          'framer-motion': 'FramerMotion',
          'clsx': 'clsx'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'style.css'
          }
          return assetInfo.name
        }
      }
    },
    cssCodeSplit: false,
    sourcemap: true,
    minify: 'esbuild',
    outDir: 'dist',
    emptyOutDir: true
  }
})