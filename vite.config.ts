import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Menu_AI/', // <-- ajoute cette ligne
  plugins: [react()],
});
