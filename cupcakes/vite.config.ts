import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// Manipulação de SVG no Vite 4.0 é feito aqui, é feito um d.ts, pode reaproveitar o arquivo vite-env pra personalizar os d.ts ou fazer um custom geral ou fazer um custom individual ex: svg.d.ts. E para padronizar os svg em forma de componentes:  Ex: import { ReactComponent as Logo } from './logo.svg'; na pasta assets
import svgr from 'vite-plugin-svgr'

// Aqui são as configurações do Vite
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr({
    svgrOptions: {
      // svgrOptions options 
    },
  })],
  resolve: {
    // https://www.divotion.com/blog/how-to-configure-import-aliases-in-vite-typescript-and-jest e https://chat.openai.com/c/5e9d6665-60f3-4588-93ed-9220abc239b0
    // Aqui são os alias para importação de arquivos, alem do tsconfig.paths.json, é importante configurar aqui também, usando os mesmos alias do tsconfig @components, @pages, @utils, etc... porque como nos arquivos estamos importando dessa maneira: @config/index por conta do tsconfig.paths.json, na web ou seja o vite tem que saber a localização dos arquivos passando por aqui, se nao vai dar erro quando tentar importar algum arquivo nesse estilo @config/index ex: Failed to resolve import "@config/index" from "src\routes.tsx". Does the file exist?
    alias: {
      "@": path.resolve(__dirname, './src'),
      "@config": path.resolve(__dirname, './src/config'),
      "@assets": path.resolve(__dirname, './src/assets'),
      "@components": path.resolve(__dirname, './src/components'),
      "@hooks": path.resolve(__dirname, './src/hooks'),
      "@pages": path.resolve(__dirname, './src/pages'),
      "@routes": path.resolve(__dirname, './src/routes'),
      "@utils": path.resolve(__dirname, './src/utils'),
      "@lib": path.resolve(__dirname, './src/lib'),
    }
  },
  
})
