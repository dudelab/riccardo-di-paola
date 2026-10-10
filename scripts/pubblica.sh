#!/bin/sh
# Pubblica il sito su GitHub Pages (repository pubblico dudelab/riccardo-di-paola).
set -e
cd "$(dirname "$0")/.."
node tools/verifica_citazioni.js
git add -A
if git diff --cached --quiet; then
  echo "Nessuna modifica da pubblicare"
else
  git commit -q -m "${1:-Aggiornamento del $(date +%Y-%m-%d)}"
fi
# Il push usa l'account GitHub personale; poi si torna a quello attivo prima.
PREV=$(gh auth status --active 2>/dev/null | sed -n 's/.*account \([^ ]*\).*/\1/p' | head -1)
gh auth switch --user dudelab >/dev/null
trap '[ -n "$PREV" ] && gh auth switch --user "$PREV" >/dev/null' EXIT
git push -q -u origin main
echo "Pubblicato su https://dudelab.github.io/riccardo-di-paola/"
