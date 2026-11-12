#!/usr/bin/env node
'use strict';
// Script usado por "npm run deploy": envia (git add + commit + push) as
// atualizações deste projeto para o GitHub. O GitHub Actions (veja
// .github/workflows/deploy-pages.yml) publica automaticamente dist/ no
// GitHub Pages a cada push na branch principal.
const { execFileSync } = require('child_process');

function git(args) {
  return execFileSync('git', args, { stdio: 'inherit' });
}

function gitOutput(args) {
  return execFileSync('git', args, { encoding: 'utf8' }).trim();
}

try {
  const branch = gitOutput(['rev-parse', '--abbrev-ref', 'HEAD']);
  console.log(`\n→ Enviando atualizações da branch "${branch}" para o GitHub...\n`);

  git(['add', '-A']);

  const pending = gitOutput(['status', '--porcelain']);
  if (pending) {
    const message = process.argv.slice(2).join(' ') || `chore: deploy ${new Date().toISOString()}`;
    git(['commit', '-m', message]);
  } else {
    console.log('Nada para commitar: a árvore de trabalho já está limpa.\n');
  }

  git(['push', 'origin', branch]);

  console.log('\n✔ Atualizações enviadas para o GitHub com sucesso.');
  console.log('  O GitHub Actions publicará automaticamente em https://worldinovabr.github.io/pcpm/\n');
} catch (err) {
  console.error('\n✘ Falha ao enviar as atualizações para o GitHub.');
  console.error(err.message || err);
  process.exitCode = 1;
}
