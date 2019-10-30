#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка
npm run build

# git rm -r --cached dist
git init
git add dist
git commit -m 'deploy'
git push origin --delete gh-pages
git subtree push --prefix dist origin gh-pages