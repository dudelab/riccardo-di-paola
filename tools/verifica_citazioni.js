// Controlla che ogni citazione «...» in js/contenuti.js compaia davvero nei versi.
// Una barra separa versi consecutivi; […] separa due parti dello stesso testo.
// Uso: node tools/verifica_citazioni.js   (dalla cartella riccardo-di-paola)
const fs = require("fs");
global.window = {};
require("../js/poesie.js");
const src = fs.readFileSync(__dirname + "/../js/contenuti.js", "utf8");
eval(src);

const norm = (s) =>
  s.replace(/<[^>]+>/g, "").replace(/\*/g, "").replace(/'/g, "’")
    .replace(/\s*\/\s*/g, " ").replace(/\s+/g, " ").toLowerCase().trim();

const corpus = [];
for (const r of window.RACCOLTE) for (const p of r.poems) corpus.push(norm(p.lines.join(" ")));
corpus.push(norm(window.QUARTINA_1996.lines.join(" ")));

// Le testimonianze non sono versi.
const NON_VERSI = [/Internet/];
const quotes = [...src.matchAll(/«([^»]+)»/g)]
  .map((m) => m[1])
  .filter((q) => !NON_VERSI.some((r) => r.test(q)));

let bad = 0;
for (const q of quotes) {
  const parts = q.split("[…]").map(norm);
  if (!corpus.some((c) => parts.every((p) => c.includes(p)))) {
    console.log("NON TROVATA:", q);
    bad++;
  }
}
console.log(`${quotes.length} citazioni, ${bad} non trovate`);
process.exit(bad ? 1 : 0);
