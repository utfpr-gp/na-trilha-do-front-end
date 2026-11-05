#!/usr/bin/env bash
# Uso: scripts/publicar-capitulo.sh <slug> "<título do PR>" <arquivo do corpo do PR>
# Marca o capítulo como publicado, roda testes, build e verificações, abre o PR e faz o merge quando a CI passa.
set -euo pipefail
slug="$1"; title="$2"; body="$3"
cd "$(dirname "$0")/.."
grep -q "'$slug'" src/data/catalog.js || { echo "slug $slug não está no catálogo"; exit 1; }
if ! grep -q "PUBLISHED = new Set(\[[^]]*'$slug'" src/data/catalog.js; then
  sed -i "s/const PUBLISHED = new Set(\[\(.*\)\]);/const PUBLISHED = new Set([\1, '$slug']);/" src/data/catalog.js
fi
npx vitest run > /tmp/vitest-$slug.log 2>&1 || { tail -30 /tmp/vitest-$slug.log; exit 1; }
grep -E "Tests " /tmp/vitest-$slug.log
npm run build > /tmp/build-$slug.log 2>&1 || { tail -30 /tmp/build-$slug.log; exit 1; }
npm run check 2>&1 | grep -E "✗|Contraste|Saída|Links"
npm run check > /dev/null 2>&1 || { echo "check falhou"; exit 1; }
branch=$(git branch --show-current)
git add -A
git commit -qm "$title

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git push -q -u origin "$branch"
url=$(gh pr create --base main --head "$branch" --title "$title" --body-file "$body")
echo "$url"
sleep 10
gh pr checks "$url" --watch --interval 15 > /dev/null
gh pr merge "$url" --merge --delete-branch > /dev/null
git checkout -q main && git pull -q
echo "merge feito: $(git log --oneline -1)"
