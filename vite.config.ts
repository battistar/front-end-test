import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import path from 'path';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

  return defineConfig({
    plugins: [react(), nodePolyfills()],
    server: {
      watch: {
        usePolling: true,
      },
      port: parseInt(process.env.VITE_PORT),
      strictPort: true,
      host: true,
    },
  });
};
