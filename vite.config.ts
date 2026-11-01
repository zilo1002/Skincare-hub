import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import sourceIdentifierPlugin from 'vite-plugin-source-identifier'

const isProd = process.env.BUILD_MODE === 'prod' || process.env.NODE_ENV === 'production'
export default defineConfig({
  // GitHub Pages 项目站地址是 zilo1002.github.io/Skincare-hub/，资源必须带仓库名前缀
  base: '/Skincare-hub/',
  plugins: [
    react(),
    sourceIdentifierPlugin({
      enabled: !isProd,
      attributePrefix: 'data-matrix',
      includeProps: true,
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
