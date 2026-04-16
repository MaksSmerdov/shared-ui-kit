import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SorbentUiKit',
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        /^react($|\/)/,
        /^react-dom($|\/)/,
        /^@mui\/material($|\/)/,
        /^@mui\/icons-material($|\/)/,
        /^@mui\/x-date-pickers($|\/)/,
        /^@emotion\/react($|\/)/,
        /^@emotion\/styled($|\/)/,
        /^react-hook-form($|\/)/,
        /^react-select($|\/)/,
        /^dayjs($|\/)/,
      ],
    },
  },
});
