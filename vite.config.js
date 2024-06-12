import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import nodePolyfills from 'vite-plugin-node-stdlib-browser';
// import { polyfillNode } from 'esbuild-plugin-polyfill-node';
import inject from '@rollup/plugin-inject';
import commonjs from 'vite-plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({

  define:{
    global:{}
  },
// resolve: {
//   alias: {
//     crypto: 'crypto-browserify',
//     buffer:'buffer'
//   },

  
// },
// // 
 resolve: {
  alias:{
    buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
  }
  // alias: {
  //   '@': path.resolve(__dirname, 'src'),
  // }
},
build: {
  rollupOptions: {
    plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
  },
},
 
// build: {
//   rollupOptions: {
//       plugins: [
//         inject({ 
//           // Buffer: ['buffer', 'Buffer'] 
//           "globalThis.Buffer": ["buffer", "Buffer"],
//           include:['buffer']

//         })
//       ],
//   },
  
// },

  plugins: [
    react(),
    commonjs(),
    // nodePolyfills(
    //   {
    //     buffer:true,
    //   }
    // )
  ],

  optimizeDeps: {
    include: ['buffer'],
    esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
            global:'globalThis'
        },
        // Enable esbuild polyfill plugins
        plugins: [
            NodeGlobalsPolyfillPlugin({
                buffer: true,
                crypto:true
            }),
            // nodePolyfills()
            // NodeModul
            // nodePolyfills(
            //     {
                
            //     }
            // )
        ]
    }
  },
  server:{
    port: 3002
  }
})
