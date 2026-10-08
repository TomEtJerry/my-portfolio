import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Images imported with "?responsive" are converted at build time to WebP in two widths
    // (800px for phones, 1440px for larger screens), so each device downloads only what it needs.
    imagetools({
      defaultDirectives: (url) =>
        url.searchParams.has('responsive')
          ? new URLSearchParams({ w: '800;1440', format: 'webp', quality: '82', as: 'picture' })
          : new URLSearchParams(),
    }),
  ],
});
