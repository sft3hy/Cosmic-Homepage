import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    strictPort: true,
    port: 80,
    // Allow this host (your ELB hostname)
    allowedHosts: [
      'localhost',
      'test-cosmichorizon-worker-68a3110f01feebd0.elb.us-gov-west-1.amazonaws.com'
    ],
  },
})
