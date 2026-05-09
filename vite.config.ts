import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    resolve: { tsconfigPaths: true },
    plugins: [TanStackRouterVite(), tailwindcss(), viteReact()],
  };
});
