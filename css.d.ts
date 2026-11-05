// Permite o import de efeito colateral `import '@/global.css'` (NativeWind).
// O TypeScript 6 passou a validar esses imports e os tipos do NativeWind
// não declaram módulos `.css`.
declare module '*.css';
