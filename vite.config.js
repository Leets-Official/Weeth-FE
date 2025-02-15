import path from 'path'; // path 모듈 추가
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import EnvironmentPlugin from 'vite-plugin-environment';

export default defineConfig({
  plugins: [react(), svgr(), EnvironmentPlugin('all')],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
