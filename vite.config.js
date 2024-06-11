import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {NodeGlobalsPolyfillPlugin} from '@esbuild-plugins/node-globals-polyfill'
import commonjs from 'vite-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  define:{
    global:{}
  },
  plugins: [react(),commonjs()],
  optimizeDeps:{
    esbuildOptions:{
      plugins:[
        NodeGlobalsPolyfillPlugin({
          buffer:true,
          crypto:true
        })
      ]
    }
  }
})
