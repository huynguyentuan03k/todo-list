import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    // Vite không dùng historyApiFallback, thay vào đó có `appType: 'spa'`
    open: true,
  },
  appType: 'spa', // ⚡ đảm bảo tất cả route fallback về index.html
});
