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

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const { PORT = 10000 } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
     outDir: '../dist/app',
  },
});
