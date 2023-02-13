import { buildCode } from 'bob-ts';
import { writeFile } from 'fs/promises';
import pkg from './package.json';

await Promise.all([
  buildCode({
    entryPoints: ['src'],
    clean: false,
    format: 'interop',
    outDir: 'dist',
    target: 'es2020',
    sourcemap: false,
  }),
  writeFile(
    './dist/package.json',
    JSON.stringify(
      {
        ...pkg,
        main: 'index.js',
      },
      null,
      2,
    ),
    'utf-8',
  ),
]);
