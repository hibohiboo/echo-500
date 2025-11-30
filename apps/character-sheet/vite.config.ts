import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
const basePath = 'character-sheet';

export default defineConfig({
  base: `/${basePath}/`,
  define: {
    BASE_PATH: `${JSON.stringify(basePath)}`,
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
  ],
  optimizeDeps: {
    exclude: ['@electric-sql/pglite', '@kuzu/kuzu-wasm'],
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
    },
  },
  build: {
    outDir: '../dist/scenario-editor',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: (moduleId) => {
          if (moduleId.includes('node_modules')) {
            return chunkRule(moduleId);
          }
          return null;
        },
      },
    },
    assetsInlineLimit: 0,
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
});

function chunkRule(moduleId: string) {
  if (moduleId.includes('react-redux') || moduleId.includes('@reduxjs/toolkit'))
    return 'redux';
  if (moduleId.includes('react-router')) return 'router';
  if (moduleId.includes('react-icons')) return 'icons';
  if (moduleId.includes('@xyflow/react')) return 'reactflow';
  if (moduleId.includes('cytoscape')) return 'cytoscape';
  if (moduleId.includes('react-markdown') || moduleId.includes('remark-gfm'))
    return 'markdown';
  if (moduleId.includes('react')) return 'react';
  if (moduleId.includes('drizzle') || moduleId.includes('pglite')) return 'rdb';

  return 'vendor';
}
