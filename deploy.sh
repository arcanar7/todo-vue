#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка
npm run build

cd dist

# git rm -r --cached dist
git init
git add -A
git commit -m 'deploy'
# git push origin --delete gh-pages
# git subtree push --prefix dist origin gh-pages
git push -f git@github.com:arcanar7/todo-vue.git master:gh-pages