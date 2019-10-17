#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка
npm run build


git init
git add dist
git commit -m 'deploy'
git subtree push --prefix dist origin gh-pages