import { writePackageJson } from 'bob-esbuild/config/packageJson';
import { buildCode } from 'bob-ts';
import { execaCommand } from 'execa';
import { mkdir, rm } from 'fs/promises';

import pkg from './package.json';

await rm('dist', { force: true, recursive: true }).catch(() => null);
await mkdir('dist').catch(() => null);

await Promise.all([
  buildCode({
    entryPoints: ['src'],
    clean: false,
    format: 'esm',
    outDir: 'dist',
    target: 'es2020',
    sourcemap: false,
  }),
  writePackageJson({
    packageJson: pkg,
    distDir: 'dist',
    rewritePackage(pkg) {
      return {
        ...pkg,
        main: 'index.js',
        types: 'index.d.ts',
        exports: {
          '.': './index.js',
          './*': './*.js',
        },
      };
    },
  }),
  execaCommand(`tsc -p tsconfig.build.json`),
]);
