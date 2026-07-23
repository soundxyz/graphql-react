import { writePackageJson } from 'bob-esbuild/config/packageJson';
import { buildCode } from 'bob-ts';
import { execaCommand } from 'execa';
import { mkdir, readdir, rm } from 'fs/promises';

import pkg from './package.json';

await rm('dist', { force: true, recursive: true }).catch(() => null);
await mkdir('dist').catch(() => null);

await Promise.all([
  buildCode({
    entryPoints: ['src'],
    clean: false,
    format: 'esm',
    outDir: 'dist',
    target: 'es2019',
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
          './package.json': './package.json',
        },
      };
    },
  }),
  execaCommand(`tsc -p tsconfig.build.json`),
  execaCommand(`cp README.md dist/README.md`),
]);

// `buildCode`'s `entryPoints: ['src']` bundles every file under `src`,
// including `*.test.ts` — strip those back out so tests aren't shipped
// to consumers via `publishConfig.directory`.
const distFiles = await readdir('dist');
await Promise.all(
  distFiles
    .filter(file => file.includes('.test.'))
    .map(file => rm(`dist/${file}`, { force: true })),
);
