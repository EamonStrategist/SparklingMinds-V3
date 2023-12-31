/*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})*/
/*
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../dist/app',
    manifest: true,
    rollupOptions: {
      input: "./src/main.jsx",
    },
  },
});
import dotenv from 'dotenv';
dotenv.config();
*/

import dotenv from 'dotenv';
dotenv.config();

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const { PORT = 10000 } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
      '/auth': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
      '/api/products': {
        target: `http://localhost:${PORT}`,
      },
      '/admin/api/products' : {
        target: `http://localhost:${PORT}`,
      },
      
     
    },
  },
  build: {
     outDir: '../dist/app',
  },
});
