import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig, type PluginOption } from 'vite';

export default defineConfig(() => {
  return {
    resolve: { tsconfigPaths: true },
    plugins: [devtools(), tailwindcss(), tanstackStart(), viteReact()].filter(
      Boolean,
    ) as PluginOption[],
  };
});
