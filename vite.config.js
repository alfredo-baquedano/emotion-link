import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath } from 'node:url'

const manifest = {
  display: 'standalone',
  display_override: ['window-controls-overlay'],
  lang: 'en-US',
  name: 'Emotion Link',
  short_name: 'Emotion Link',
  description: 'Emotion Link is a web app designed to help users organize and understand their emotion provides a visual representation of life events and interactions',
  form_factor: 'wide',
  theme_color: '#000',
  background_color: '#000',
  icons: [
    {
      src: 'icons/favicon16x16.ico',
      sizes: '16x16',
    },
    {
      src: 'icons/favicon32x32.ico',
      sizes: '32x32',
      purpose: 'any'
    },
    {
      src: 'icons/favicon64x64.ico',
      sizes: '64x64'
    },
    {
      src: 'icons/favicon96x96.ico',
      sizes: '96x96',
    },
    {
      src: 'icons/favicon128x128.ico',
      sizes: '128x128 144x144',
      purpose: 'maskable'
    },
    {
      src: 'icons/favicon1024x1024.png',
      sizes: '512x512 1024x1024',
      tyue: 'image/png'
    }
  ],
  screenshots: [
    {
      src: 'screenshots/desktop-demo-1.png',
      sizes: '1920x1080',
      type: 'image/png',
      form_factor: 'wide',
      label: 'Desktop display'
    },
    {
      src: 'screenshots/mobile-demo-1.png',
      sizes: '945x2048',
      type: 'image/png',
      form_factor: 'narrow',
      label: 'Mobile display'
    }
  ]
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env': env,
    },
    plugins: [react(), VitePWA({ manifest })],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src', import.meta.url))
        },
      ]
    }
  };
});
