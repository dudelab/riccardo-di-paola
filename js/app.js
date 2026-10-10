(() => {
  "use strict";

  const RACCOLTE = window.RACCOLTE;
  const main = document.getElementById("contenuto");

  // La quartina citata nel volume del 2004 apre le Poesie per Cecilia.
  const cecilia = RACCOLTE.find((r) => r.id === "cecilia");
  cecilia.poems.unshift({ n: 0, section: 0, lines: window.QUARTINA_1996.lines, data: window.QUARTINA_1996.data });

  // Elenco piatto di tutte le poesie, nell'ordine delle raccolte.
  const TUTTE = [];
  for (const r of RACCOLTE) {
    for (const p of r.poems) {
      p.raccolta = r;
      p.indice = TUTTE.length;
      TUTTE.push(p);
    }
  }

  // ---------- utilità ----------

  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  // Minuscole senza accenti, conservando la lunghezza della stringa.
  const piega = (s) => [...s].map((c) => (c === "’" ? "'" : c.normalize("NFD")[0].toLowerCase())).join("");

  const nomeRaccolta = (r) => (r.year ? `${r.title} ${r.year}` : r.title);
  const etichetta = (p) => (p.n === 0 ? p.data : String(p.n));
  const rif = (p) => `${nomeRaccolta(p.raccolta)}, ${etichetta(p)}`;
  const url = (p) => `#/poesie/${p.raccolta.id}/${p.n}`;

  const quante = (n, uno, molti) => (n === 1 ? `una ${uno}` : `${n} ${molti}`);
  const quanti = (n, uno, molti) => (n === 1 ? `un ${uno}` : `${n} ${molti}`);

  // Trova le corrispondenze di più regole in una riga e le avvolge, senza sovrapposizioni.
  // Il testo fuori dalle corrispondenze viene sfuggito; *corsivo* diventa <i>.
  function componi(riga, regole = []) {
    const trovate = [];
    for (const r of regole) {
      const re = new RegExp(r.re.source, r.re.flags.includes("g") ? r.re.flags : r.re.flags + "g");
      let m;
      while ((m = re.exec(riga))) {
        if (!m[0]) { re.lastIndex++; continue; }
        trovate.push({ da: m.index, a: m.index + m[0].length, avvolgi: r.avvolgi });
        if (r.una) break;
      }
    }
    trovate.sort((x, y) => x.da - y.da);
    let out = "", pos = 0;
    for (const t of trovate) {
      if (t.da < pos) continue;
      out += esc(riga.slice(pos, t.da)) + t.avvolgi(esc(riga.slice(t.da, t.a)));
      pos = t.a;
    }
    out += esc(riga.slice(pos));
    return out.replace(/\*([^*]+)\*/g, "<i>$1</i>");
  }

  const verso = (riga, regole = []) => `<span class="v">${componi(riga, regole)}</span>`;
  const versi = (p, regole) => `<p class="versi">${p.lines.map((l) => verso(l, regole)).join("")}</p>`;
  const evidenzia = (re) => [{ re, avvolgi: (s) => `<mark>${s}</mark>` }];

  // Tutti i versi che soddisfano una regola, raggruppati per raccolta.
  function occorrenze(re) {
    const r1 = new RegExp(re.source, re.flags.replace("g", ""));
    const out = [];
    for (const p of TUTTE) p.lines.forEach((l) => { if (r1.test(l)) out.push({ p, l }); });
    return out;
  }

  function elencoOccorrenze(occ, re, raggruppa = true) {
    let html = '<ul class="occorrenze">', ultima = null;
    for (const { p, l } of occ) {
      if (raggruppa && p.raccolta !== ultima) {
        html += `<h3>${esc(nomeRaccolta(p.raccolta))}</h3>`;
        ultima = p.raccolta;
      }
      html += `<li><span class="verso">${componi(l, evidenzia(re))}</span><a class="rif" href="${url(p)}">${esc(raggruppa ? etichetta(p) : rif(p))}</a></li>`;
    }
    return html + "</ul>";
  }

  const contaPoesie = (occ) => new Set(occ.map((o) => o.p)).size;

  // ---------- pagine ----------

  function home() {
    document.title = "Riccardo Di Paola";
    main.innerHTML = `
      <div class="frontespizio">
        <figure>
          <img src="img/brenna.jpg" alt="Disegno a carboncino: Riccardo, giovane, con la barba, affacciato alla finestra di una mansarda, le braccia appoggiate al davanzale.">
          <figcaption>Disegno di Nicoletta Brenna, 2003</figcaption>
        </figure>
        <div>
          <h1>Riccardo Di Paola</h1>
          <p class="date">Milano 1948 · Namibia 2003</p>
          <div class="presentazione">
            <p>Insegnò latino e greco al Liceo Manzoni di Milano, viaggiò per tutta la vita e
            scrisse versi fin da ragazzo, che fece stampare in pochissimi esemplari. Qui sono
            raccolte ${TUTTE.length} sue poesie, scritte tra il 1980 e il 2000, con quanto serve
            per leggerle.</p>
          </div>
          <section class="a-caso" aria-live="polite">
            <span class="etichetta">Aperto a caso</span>
            <div class="corpo"></div>
          </section>
          <ul class="indice-sezioni">
            <li><a href="#/poesie"><b>Poesie</b><span>Nove raccolte e l’indice dei capoversi</span></a></li>
            <li><a href="#/vita"><b>Vita</b><span>Milano, Palermo, la scuola, i viaggi</span></a></li>
            <li><a href="#/parole"><b>Parole</b><span>Un glossario, e ogni parola di ogni verso</span></a></li>
            <li><a href="#/ricorrenze"><b>Ricorrenze</b><span>La luna, le isole, i pipistrelli, e altro che ritorna</span></a></li>
            <li><a href="#/ritratti"><b>Ritratti</b><span>Una fotografia, due disegni, una pagina</span></a></li>
          </ul>
        </div>
      </div>`;

    const box = main.querySelector(".a-caso");
    const candidati = TUTTE.filter((p) => p.lines.length <= 5);
    let attuale = null;
    const mostra = () => {
      let p;
      do p = candidati[Math.floor(Math.random() * candidati.length)]; while (p === attuale && candidati.length > 1);
      attuale = p;
      box.querySelector(".corpo").innerHTML = `
        ${versi(p)}
        <div class="rif">
          <a class="fonte" href="${url(p)}">${esc(rif(p))}</a>
          <button type="button">un’altra</button>
        </div>`;
      box.querySelector("button").addEventListener("click", () => {
        box.classList.add("cambia");
        setTimeout(() => { mostra(); box.classList.remove("cambia"); }, 350);
      });
    };
    mostra();
  }

  function poesie() {
    document.title = "Le poesie · Riccardo Di Paola";
    main.innerHTML = `
      <div class="colonna">
        <h1 class="titolo">Le poesie</h1>
        <p class="sottotitolo">Nove raccolte, in ordine di tempo.</p>
        <ul class="raccolte">
          ${RACCOLTE.map((r) => `
            <li>
              <span class="anno">${esc(r.year || "s.d.")}</span>
              <a href="#/poesie/${r.id}">${esc(r.title)}</a>
              <span class="quante">${r.poems.length}</span>
            </li>`).join("")}
        </ul>
        <p><a href="#/poesie/capoversi">Indice dei capoversi</a></p>
        <hr class="filetto">
        <section class="nota-testo">
          <h2>Nota al testo</h2>
          <p>I testi seguono la trascrizione delle raccolte completata nell’aprile 2025. Grafie,
          accenti, maiuscole e punteggiatura sono quelli della trascrizione, anche dove paiono
          insoliti: in una poesia come questa è difficile, e imprudente, distinguere
          l’invenzione dal refuso. Si è corretto un solo errore evidente di battitura
          (<i>rivOlte</i>, in <i>Abiogenesi</i> 1994, 30).</p>
          <p>Le poesie non hanno titolo: sono indicate con il numero che portano nella
          raccolta o, negli indici, con il primo verso. La quartina datata 15 luglio 1996 è
          citata nella nota biografica del volume del 2004.</p>
        </section>
      </div>`;
  }

  function capoversi() {
    document.title = "Indice dei capoversi · Riccardo Di Paola";
    const coll = new Intl.Collator("it", { sensitivity: "base", ignorePunctuation: true });
    const voci = TUTTE.map((p) => ({ p, c: p.lines[0].replace(/\*/g, "") }))
      .sort((a, b) => coll.compare(a.c, b.c));
    let html = "", lettera = null;
    for (const { p, c } of voci) {
      const l = piega(c.replace(/^[^\p{L}]+/u, ""))[0].toUpperCase();
      if (l !== lettera) { html += `<h3 id="l-${l}">${l}</h3>`; lettera = l; }
      html += `<li><a href="${url(p)}">${componi(c)}</a><span class="rif">${esc(rif(p))}</span></li>`;
    }
    main.innerHTML = `
      <div class="colonna-larga">
        <span class="sopratitolo"><a href="#/poesie">Le poesie</a></span>
        <h1 class="titolo">Indice dei capoversi</h1>
        <p class="sottotitolo">Il primo verso di ogni poesia, in ordine alfabetico.</p>
        <ul class="capoversi">${html}</ul>
      </div>`;
  }

  function raccolta(r) {
    document.title = `${nomeRaccolta(r)} · Riccardo Di Paola`;
    const pos = RACCOLTE.indexOf(r);
    const prec = RACCOLTE[pos - 1], succ = RACCOLTE[pos + 1];
    let corpo = "", sezione = 0;
    for (const p of r.poems) {
      if (p.section !== sezione) { corpo += '<hr class="sezione-stacco">'; sezione = p.section; }
      corpo += `
        <div class="componimento" id="p-${p.n}">
          <a class="num" href="${url(p)}" aria-label="Apri la poesia ${esc(etichetta(p))}">${p.n === 0 ? "·" : p.n}</a>
          ${versi(p)}
          ${p.data ? `<p class="tenue"><i>${esc(p.data)}</i></p>` : ""}
        </div>`;
    }
    main.innerHTML = `
      <div class="colonna">
        <header class="raccolta-testa">
          <span class="sopratitolo"><a href="#/poesie">Le poesie</a>${r.year ? " · " + esc(r.year) : ""}</span>
          <h1 class="titolo">${esc(r.title)}</h1>
          <div class="premessa">${window.NOTE_RACCOLTE[r.id] || ""}</div>
        </header>
        ${corpo}
        <nav class="passa" aria-label="Raccolte">
          ${prec ? `<a href="#/poesie/${prec.id}"><small>raccolta precedente</small><em>${esc(prec.title)}</em></a>` : ""}
          ${succ ? `<a class="succ" href="#/poesie/${succ.id}"><small>raccolta seguente</small><em>${esc(succ.title)}</em></a>` : ""}
        </nav>
      </div>`;
  }

  function poesia(p) {
    document.title = `${p.lines[0].replace(/\*/g, "")} · Riccardo Di Paola`;
    const voci = window.GLOSSARIO.filter((g) => p.lines.some((l) => g.re.test(l)));
    const regole = voci.map((g) => ({ re: g.re, una: true, avvolgi: (s) => `<a class="gl" href="#/parole/${g.id}">${s}</a>` }));
    const temi = window.RICORRENZE.filter((t) => p.lines.some((l) => t.re.test(l)));
    const prec = TUTTE[p.indice - 1], succ = TUTTE[p.indice + 1];
    const apparato = voci.length || temi.length ? `
      <aside class="apparato">
        ${voci.length ? `<h2>Parole</h2><dl>${voci.map((g) => `
          <dt><a href="#/parole/${g.id}">${esc(g.voce)}</a></dt>
          <dd>${g.testo}</dd>`).join("")}</dl>` : ""}
        ${temi.length ? `<h2>Ricorre</h2><p class="ric">${temi.map((t) => `<a href="#/ricorrenze/${t.id}">${esc(t.titolo)}</a>`).join("")}</p>` : ""}
      </aside>` : "";
    main.innerHTML = `
      <article class="lettura">
        <div class="testa">
          <a href="#/poesie/${p.raccolta.id}">${esc(nomeRaccolta(p.raccolta))}</a>
          <span class="n">${esc(p.n === 0 ? "·" : String(p.n))}</span>
          ${apparato ? `<button class="interruttore" type="button"></button>` : ""}
        </div>
        ${versi(p, regole)}
        ${p.data ? `<p class="data">${esc(p.data)}</p>` : ""}
        ${apparato}
        <nav class="passa" aria-label="Poesie">
          ${prec ? `<a href="${url(prec)}"><small>${esc(rif(prec))}</small><em>${componi(prec.lines[0])}</em></a>` : ""}
          ${succ ? `<a class="succ" href="${url(succ)}"><small>${esc(rif(succ))}</small><em>${componi(succ.lines[0])}</em></a>` : ""}
        </nav>
      </article>`;
    const btn = main.querySelector(".interruttore");
    if (btn) {
      const aggiorna = () => {
        const solo = document.documentElement.classList.contains("solo-testo");
        btn.textContent = solo ? "con le note" : "solo il testo";
        btn.setAttribute("aria-pressed", String(solo));
      };
      aggiorna();
      btn.addEventListener("click", () => {
        const solo = document.documentElement.classList.toggle("solo-testo");
        try { localStorage.setItem("soloTesto", solo ? "1" : "0"); } catch (e) {}
        aggiorna();
      });
    }
  }

  function vita() {
    document.title = "La vita · Riccardo Di Paola";
    main.innerHTML = `
      <div class="vita">
        <div class="testo">
          <h1 class="titolo">La vita</h1>
          <p class="sottotitolo">Milano 1948 · Namibia 2003</p>
          <div class="racconto">${window.VITA}</div>
          <div class="quartina-finale">${versi({ lines: window.QUARTINA_1996.lines })}</div>
        </div>
        <div class="immagini">
          <figure>
            <img src="img/fotografia.jpg" alt="Fotografia di Riccardo in età matura, di profilo, lo sguardo rivolto in basso a sinistra.">
            <figcaption>Fotografia, dal volume del 2004</figcaption>
          </figure>
          <figure>
            <img src="img/del-bello.jpg" alt="Disegno a matita e sfumino: Riccardo, giovane e con la barba, seduto, a torso nudo.">
            <figcaption>Disegno di Gianfranco Del Bello</figcaption>
          </figure>
        </div>
      </div>`;
  }

  function parole(voce) {
    document.title = "Le parole · Riccardo Di Paola";
    const coll = new Intl.Collator("it", { sensitivity: "base" });
    const voci = [...window.GLOSSARIO].sort((a, b) => coll.compare(a.voce, b.voce));
    const statoTesto = { certo: "documentato", lettura: "lettura probabile", aperto: "non risolto" };
    const iniziali = [...new Set(voci.map((g) => piega(g.voce)[0].toUpperCase()))];
    let html = "", lettera = null;
    for (const g of voci) {
      const l = piega(g.voce)[0].toUpperCase();
      const occ = occorrenze(g.re);
      html += `
        <article class="voce" id="${l !== lettera ? "l-" + l : "v-" + g.id}" data-voce="${g.id}">
          <h3><a href="#/parole/${g.id}">${esc(g.voce)}</a><span class="stato ${g.stato}">${statoTesto[g.stato]}</span></h3>
          <p>${g.testo}</p>
          ${elencoOccorrenze(occ, g.re, false)}
        </article>`;
      lettera = l;
    }
    main.innerHTML = `
      <div class="colonna-larga">
        <h1 class="titolo">Le parole</h1>
        <div class="premessa">
          <p>Per anni, in famiglia, si è telefonato a Riccardo per sapere che cosa volesse dire
          una parola. Adesso le parole da spiegare sono le sue.</p>
        </div>
        <form class="cerca" role="search">
          <label for="q">Cerca nei versi</label>
          <input id="q" type="search" autocomplete="off" spellcheck="false" placeholder="una parola, o il suo inizio">
          <div class="risultati" aria-live="polite"></div>
        </form>
        <h2 class="etichetta">Glossario</h2>
        <p class="tenue">Ogni voce dice se il significato è documentato, se è una lettura
        probabile o se resta da trovare. Sotto, i versi in cui la parola compare.</p>
        <nav class="alfabeto" aria-label="Iniziali">${iniziali.map((l) => `<a href="#/parole/l-${l}">${l}</a>`).join("")}</nav>
        <div class="voci">${html}</div>
        <hr class="filetto">
        <h2 class="etichetta">Parole senza spiegazione</h2>
        <p class="tenue">Per queste non si è trovata una spiegazione che convinca.</p>
        <ul class="aperte">
          ${window.SENZA_SPIEGAZIONE.map((s) => {
            const o = occorrenze(s.re)[0];
            return `<li><a href="${url(o.p)}" title="${esc(o.l.replace(/\*/g, ""))}">${esc(s.voce)}</a></li>`;
          }).join("")}
        </ul>
      </div>`;

    const input = main.querySelector("#q");
    const out = main.querySelector(".risultati");
    main.querySelector("form").addEventListener("submit", (e) => e.preventDefault());
    const cerca = () => {
      const q = input.value.trim();
      if (q.length < 2) { out.innerHTML = ""; return; }
      const fq = piega(q);
      const occ = [];
      const parola = /[\p{L}\p{M}]+/gu;
      for (const p of TUTTE) {
        for (const l of p.lines) {
          const fl = piega(l);
          if (q.includes(" ") ? fl.includes(fq) : [...l.matchAll(parola)].some((m) => piega(m[0]).startsWith(fq))) occ.push({ p, l });
        }
      }
      if (!occ.length) { out.innerHTML = `<p class="esito">Nessun verso contiene «${esc(q)}».</p>`; return; }
      // Evidenzia confrontando sul testo piegato: le posizioni coincidono con l'originale.
      const evid = (l) => {
        const fl = piega(l);
        const tratti = [];
        if (q.includes(" ")) {
          let i = fl.indexOf(fq);
          while (i >= 0) { tratti.push([i, i + fq.length]); i = fl.indexOf(fq, i + fq.length); }
        } else {
          for (const m of l.matchAll(parola)) if (piega(m[0]).startsWith(fq)) tratti.push([m.index, m.index + m[0].length]);
        }
        let s = "", pos = 0;
        for (const [a, b] of tratti) { s += esc(l.slice(pos, a)) + `<mark>${esc(l.slice(a, b))}</mark>`; pos = b; }
        return (s + esc(l.slice(pos))).replace(/\*([^*]+)\*/g, "<i>$1</i>");
      };
      let html = `<p class="esito">${quanti(occ.length, "verso", "versi")} in ${quante(contaPoesie(occ), "poesia", "poesie")}.</p><ul class="occorrenze">`;
      let ultima = null;
      for (const { p, l } of occ) {
        if (p.raccolta !== ultima) { html += `<h3>${esc(nomeRaccolta(p.raccolta))}</h3>`; ultima = p.raccolta; }
        html += `<li><span class="verso">${evid(l)}</span><a class="rif" href="${url(p)}">${esc(etichetta(p))}</a></li>`;
      }
      out.innerHTML = html + "</ul>";
    };
    input.addEventListener("input", cerca);

    if (voce) {
      const el = main.querySelector(`#${CSS.escape(voce)}`) || main.querySelector(`[data-voce="${CSS.escape(voce)}"]`);
      if (el) {
        if (el.dataset.voce === voce) el.classList.add("indicata");
        requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
      }
      return true;
    }
  }

  function ricorrenze() {
    document.title = "Ricorrenze · Riccardo Di Paola";
    main.innerHTML = `
      <div class="colonna">
        <h1 class="titolo">Ricorrenze</h1>
        <div class="premessa">
          <p>Alcune immagini tornano da una raccolta all’altra, ogni volta un po’ diverse. Per
          ciascuna sono riportati tutti i versi in cui compare: contati, non scelti.</p>
        </div>
        <ul class="temi">
          ${window.RICORRENZE.map((t) => {
            const occ = occorrenze(t.re);
            return `<li><a href="#/ricorrenze/${t.id}"><span class="t">${esc(t.titolo)}</span><span class="c">${quante(contaPoesie(occ), "poesia", "poesie")}</span></a></li>`;
          }).join("")}
        </ul>
      </div>`;
  }

  function ricorrenza(t) {
    document.title = `${t.titolo} · Riccardo Di Paola`;
    const occ = occorrenze(t.re);
    const raccolte = new Set(occ.map((o) => o.p.raccolta)).size;
    main.innerHTML = `
      <div class="colonna-larga">
        <span class="sopratitolo"><a href="#/ricorrenze">Ricorrenze</a></span>
        <h1 class="titolo">${esc(t.titolo)}</h1>
        <p class="sottotitolo">${quanti(occ.length, "verso", "versi")}, in ${quante(contaPoesie(occ), "poesia", "poesie")} di ${quante(raccolte, "raccolta", "raccolte")}.</p>
        <div class="premessa"><p>${t.testo}</p></div>
        ${elencoOccorrenze(occ, t.re)}
      </div>`;
  }

  function ritratti() {
    document.title = "Ritratti · Riccardo Di Paola";
    main.innerHTML = `
      <div>
        <div class="ritratti-testa">
          <h1 class="titolo">Ritratti</h1>
          <p class="sottotitolo">Riprodotti dal volume del dicembre 2004.</p>
        </div>
        <div class="ritratti">
          ${window.RITRATTI.map((r) => `
            <figure>
              <img src="${r.src}" alt="${esc(r.titolo)}" loading="lazy">
              <figcaption><b>${esc(r.titolo)}</b><span>${esc(r.nota)}</span></figcaption>
            </figure>`).join("")}
        </div>
      </div>`;
  }

  function nonTrovata() {
    document.title = "Riccardo Di Paola";
    main.innerHTML = `<p class="vuoto-pagina">Questa pagina non esiste. <a href="#/">Torna all’inizio</a>.</p>`;
  }

  // ---------- instradamento ----------

  function instrada() {
    const parti = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
    const [sez, a, b] = parti;
    let resta = false;
    if (!sez) home();
    else if (sez === "poesie" && !a) poesie();
    else if (sez === "poesie" && a === "capoversi") capoversi();
    else if (sez === "poesie") {
      const r = RACCOLTE.find((x) => x.id === a);
      const p = r && b !== undefined ? r.poems.find((x) => String(x.n) === b) : null;
      if (r && b === undefined) raccolta(r);
      else if (p) poesia(p);
      else nonTrovata();
    }
    else if (sez === "vita") vita();
    else if (sez === "parole") resta = parole(a);
    else if (sez === "ricorrenze" && !a) ricorrenze();
    else if (sez === "ricorrenze") {
      const t = window.RICORRENZE.find((x) => x.id === a);
      t ? ricorrenza(t) : nonTrovata();
    }
    else if (sez === "ritratti") ritratti();
    else nonTrovata();

    document.querySelectorAll(".testata nav a").forEach((el) => {
      el.setAttribute("aria-current", String(el.dataset.sez === sez));
    });
    if (!resta) window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }

  window.addEventListener("hashchange", instrada);

  // Frecce: poesia precedente e seguente.
  document.addEventListener("keydown", (e) => {
    if (e.target.closest("input, textarea") || e.metaKey || e.ctrlKey || e.altKey) return;
    const link = e.key === "ArrowLeft" ? main.querySelector(".passa a:not(.succ)")
      : e.key === "ArrowRight" ? main.querySelector(".passa a.succ") : null;
    if (link && main.querySelector(".lettura")) location.hash = link.getAttribute("href");
  });

  // Giorno e notte.
  const btnTema = document.querySelector(".tema");
  const scuro = () => {
    const t = document.documentElement.dataset.theme;
    return t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  };
  const etichettaTema = () => { btnTema.textContent = scuro() ? "giorno" : "notte"; };
  btnTema.addEventListener("click", () => {
    const t = scuro() ? "light" : "dark";
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem("tema", t); } catch (e) {}
    etichettaTema();
  });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", etichettaTema);
  etichettaTema();

  instrada();
})();
