import { buildCode } from 'bob-ts';

await Promise.all([
  buildCode({
    entryPoints: ['src'],
    clean: false,
    format: 'esm',
    outDir: 'dist',
    target: 'es2020',
    sourcemap: false,
  }),
]);
