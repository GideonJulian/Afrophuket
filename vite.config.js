import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [
    react(),
    {
      ...tailwindcss({
        theme: {
          extend: {
            keyframes: {
              scroll: {
                '0%': { transform: 'translateX(0%)' },
                '100%': { transform: 'translateX(-50%)' },
              },
            },
            animation: {
              'scroll-slow': 'scroll 60s linear infinite',
            },
          },
        },
        plugins: [],
      }),
      enforce: 'pre', // Ensure it loads early
    },
  ],
});
