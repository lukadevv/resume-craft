import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    environment: 'jsdom',
    // Inline these deps so Vitest/Vite can transform them and avoid CJS->ESM interop issues in workers.
    server: {
      deps: {
        inline: ['jsdom', 'html-encoding-sniffer', '@exodus/bytes'],
      },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
