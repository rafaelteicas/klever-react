import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      include: ['src/{components,hooks}/**/*.{ts,tsx}'],
      exclude: ['**/index.ts'],
    },
    clearMocks: true,
    exclude: ['node_modules', '**/*e2e.spec.ts'],
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@context': path.resolve(__dirname, './src/context'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@pages': path.resolve(__dirname, './src/pages'),
      'test-utils': path.resolve(__dirname, './src/utils/test-utils.tsx'),
    },
  },
})
