import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

const basePath = 'rulebook';

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
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
    },
    dedupe: ['react', 'react-dom', 'react-router'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router'],
  },
  build: {
    outDir: '../dist/rulebook',
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
  },
});

function chunkRule(moduleId: string) {
  if (moduleId.includes('react-markdown') || moduleId.includes('remark-gfm'))
    return 'markdown';
  if (moduleId.includes('mermaid')) return 'mermaid';
  // React系は全て同じチャンクに入れる（複数インスタンスを防ぐ）
  if (moduleId.includes('react')) {
    return 'react';
  }

  return 'vendor';
}
