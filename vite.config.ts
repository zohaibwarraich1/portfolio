import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', 'three-stdlib'],
          'react-three': ['@react-three/fiber', '@react-three/drei', '@react-three/rapier', '@react-three/postprocessing'],
          'gsap': ['gsap', '@gsap/react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
