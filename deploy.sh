#!/user/bin/env sh

set -e

npm run build

cd dist

git init
git add -A 
git commit -m "New Deployment"
git push -f git@github.com:3q-cindy/F2e_2022_2week.git master:gh-pages

cd -