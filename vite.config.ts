// Plugins
import Components from 'unplugin-vue-components/vite'
import Vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'
import { VitePWA } from "vite-plugin-pwa";
import version from 'vite-plugin-package-version'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    vuetify({
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    Components(),
    version(),
    ViteFonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: ['favicon.ico', 'robots.txt'],
      manifest: {
        name: "Mülli.app",
        short_name: "Mülli.app",
        description: "Wie entsorge ich im Landkreis Konstanz …",
        theme_color: "#FF6F00",
        background_color: "#ffffff",
        icons: [
          {
            "src": "img/icons/icon-48x48.png",
            "sizes": "48x48",
            "type": "image/png",
            "purpose": "maskable any"
            },
            {
            "src": "img/icons/icon-72x72.png",
            "sizes": "72x72",
            "type": "image/png",
            "purpose": "maskable any"
            },
            {
            "src": "img/icons/icon-96x96.png",
            "sizes": "96x96",
            "type": "image/png",
            "purpose": "maskable any"
            },
            {
            "src": "img/icons/icon-128x128.png",
            "sizes": "128x128",
            "type": "image/png",
            "purpose": "maskable any"
            },
            {
            "src": "img/icons/icon-144x144.png",
            "sizes": "144x144",
            "type": "image/png",
            "purpose": "maskable any"
            },
            {
            "src": "img/icons/icon-152x152.png",
            "sizes": "152x152",
            "type": "image/png",
            "purpose": "maskable any"
            },
            {
            "src": "img/icons/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable any"
            },
            {
            "src": "img/icons/icon-384x384.png",
            "sizes": "384x384",
            "type": "image/png",
            "purpose": "maskable any"
            },
            {
            "src": "img/icons/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable any"
            }
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            // URL-Muster, das auf deine Airtable-API-Endpunkte passt
            urlPattern: /^https:\/\/api\.airtable\.com\//,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 2 * 60 * 60 // 2 Stunden
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        additionalData: `
          @use "@/styles/variables.scss" as *;
          @use "@/styles/_mixins.scss" as *;
          @use "@/styles/_scrollbar.scss" as *;
        `
      },
    }
  },
  server: {
    port: 3000,
  },
})
