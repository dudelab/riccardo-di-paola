// Testi del sito. Le citazioni dalle poesie devono coincidere con js/poesie.js:
// tools/verifica_citazioni.js le controlla tutte.

window.QUARTINA_1996 = {
  data: "15 luglio 1996",
  lines: [
    "Oltre la luna e oltre le comete",
    "in un rifugio che sognammo nostro",
    "ora che ridi e sfiori nuove mete",
    "come una notte d’Africa e d’agosto",
  ],
};

window.NOTE_RACCOLTE = {
  "abiogenesi-1980": `
    <p>Trenta componimenti, quasi tutti quartine. È la raccolta più ardua e più libera:
    latino, siciliano, qualche parola d’inglese e una quantità di parole che non stanno in
    nessun vocabolario convivono nello stesso verso, spesso senza verbo che le regga.</p>
    <p>Per ventidue testi la rima è occasionale. Dal ventitreesimo diventa regolare, alternata
    o incrociata, e da lì in avanti Riccardo non la lascerà quasi più.</p>`,
  "abiogenesi-1982": `
    <p>Dieci quartine a rima alternata. Il lessico resta prezioso ma la sintassi si distende,
    e accanto al latino compaiono il francese («À <i>les amours</i>») e un termine della
    psichiatria, <i>ecolalia</i>.</p>`,
  metamorfosi: `
    <p>Nove quartine. Vi affiorano le prime cose ricordate: «la vecchia strada cadenzata»,
    «i canali lenti dell’infanzia», «la gioventù persa per strada».</p>`,
  "abiogenesi-1994": `
    <p>Quaranta quartine, a dieci anni dalla raccolta precedente. Il dettato si fa limpido e
    le parole inventate si diradano; restano la luna, le isole, e arrivano i primi
    pipistrelli.</p>
    <p>Nella trascrizione i testi sono ordinati in gruppi: una prima serie di otto, poi
    gruppi di quattro.</p>`,
  "abiogenesi-ultima": `
    <p>Quattordici quartine. Il titolo annuncia una fine che non ci fu: l’anno dopo
    cominciano le <i>Itache</i>.</p>`,
  itache: `
    <p>Venti quartine. Il plurale del titolo è lo stesso con cui si chiude l’<i>Itaca</i> di
    Kavafis, dove il viaggiatore, ormai savio, ha capito che cosa significano le Itache.
    Qui Itaca è ora più lontana, ora toccata e «certo più bella del sogno di un artista».</p>`,
  "senza-titolo": `
    <p>Otto quartine, dell’anno del matrimonio con Cecilia. Ritornano le Itache, ormai
    «sbiadite», e la misura domestica delle campagne lombarde: «come se rogge fossero il tuo
    Nilo».</p>`,
  pipistrelli: `
    <p>Undici strofe in versi brevi, senza rima: la sola raccolta che lascia la quartina.
    Somiglia a un inventario di casa: la casa che «si dilata […] come mare», la
    lavatrice spenta «da cent’anni», il libro chiuso «a pagina ventotto».</p>`,
  cecilia: `
    <p>Le quartine dedicate a Cecilia. La trascrizione comincia dalla sesta: delle prime
    cinque non si conserva il testo. La nota biografica del volume del 2004 ne cita
    un’altra, datata 15 luglio 1996, che qui apre la serie.</p>`,
};

window.VITA = `
  <p>Riccardo Di Paola nacque a Milano il 22 novembre 1948. Perse la madre da bambino. A
  tenere insieme lui, il fratello maggiore Giorgio e la sorella più piccola fu soprattutto
  la nonna materna, Onorina: una donna sobria, che non prese mai la tessera annonaria, non
  fece mai il saluto fascista e a tavola teneva per sé gli avanzi, per lasciare il meglio ai
  bambini.</p>

  <p>Nel 1953 la famiglia si trasferì a Palermo, la città del padre. Lì Riccardo cominciò
  presto a scrivere versi, studiò lettere classiche e nel giugno 1972 si laureò con lode. In
  famiglia si racconta che, alla discussione della tesi, i professori si alzarono in piedi.
  Il greco antico non si limitava a leggerlo: lo parlava.</p>

  <p>Tornato a Milano, insegnò latino, greco, italiano e storia al Liceo classico Alessandro
  Manzoni. Chi lo conosceva lo chiamava per sapere: il significato di una parola, dove si
  trova un monte, una legge della fisica, una data. Rispondeva quasi sempre, con esattezza e
  senza farlo pesare, e davanti ai complimenti si schermiva con una battuta. «Era il nostro
  Internet prima che esistesse Internet», dice uno dei nipoti.</p>

  <p>Da giovane portava la barba e i capelli un po’ spettinati, e aveva uno sguardo che
  pareva fermarsi su qualcosa che gli altri non vedevano. È lo sguardo del disegno che
  Nicoletta Brenna gli dedicò nel 2003: Riccardo affacciato alla finestra di una
  mansarda.</p>

  <p>Dal ritorno a Milano viaggiò ogni anno, e ogni volta più lontano: l’Europa, poi
  l’Africa, la Thailandia, il Messico, l’India, il Nepal, il Vietnam. Tornava con piccoli
  regali per tutti, con scatole di diapositive da guardare insieme e con racconti esatti,
  spesso comici, mai retorici.</p>

  <p>Scrisse versi per tutta la vita e ne pubblicò pochissimi. Con l’amico scultore
  Gianfranco Del Bello, che per ogni poesia disegnava un’illustrazione, stampò le sue
  raccolte in edizioni private, di pochi esemplari. Non cercava lettori.</p>

  <p>Il 5 agosto 1997 sposò Cecilia, e con lei continuò a viaggiare in tutti i continenti.
  Il 2 agosto 2003, in Namibia, morirono insieme in un incidente stradale. Riccardo aveva
  cinquantaquattro anni.</p>

  <p>Nel dicembre 2004 le sue raccolte furono riunite in un volume, in ordine cronologico,
  con i disegni di Del Bello. La nota biografica, firmata con le iniziali <i>plg</i>, si
  chiude con una quartina delle <i>Poesie per Cecilia</i>, datata 15 luglio 1996:</p>
`;

// stato: "certo" (significato documentato), "lettura" (interpretazione probabile),
// "aperto" (significato non accertato)
window.GLOSSARIO = [
  { id: "abiogenesi", voce: "abiogenesi", re: /abiogenesi/i, stato: "certo",
    testo: `Termine della biologia, dal greco: l’origine della vita da materia non vivente,
    un tempo detta generazione spontanea. Dà il titolo a quattro raccolte; nei versi compare
    una volta sola, al plurale: «abiogenesi nascenti».` },
  { id: "aconito", voce: "aconito", re: /aconito/i, stato: "certo",
    testo: `Pianta velenosissima. Il mito la fa nascere dalla bava di Cerbero, trascinato
    da Eracle fuori dall’Ade.` },
  { id: "alcesti", voce: "Alcesti", re: /alcesti/i, stato: "certo",
    testo: `Nella tragedia di Euripide, la moglie che accetta di morire al posto del marito
    Admeto, e che Eracle strappa alla Morte sulla soglia del sepolcro.` },
  { id: "annona", voce: "annona", re: /annona/i, stato: "certo",
    testo: `Dal latino <i>annona</i>, il raccolto dell’anno; a Roma, l’approvvigionamento
    di grano per la città. Nell’Italia della guerra e del dopoguerra, la tessera annonaria
    era quella del razionamento. In famiglia si ricorda che la nonna Onorina non la prese
    mai.` },
  { id: "atturrato", voce: "atturrato", re: /atturrato/i, stato: "certo",
    testo: `Dal siciliano <i>atturrari</i>, tostare, abbrustolire (latino <i>torrere</i>);
    in senso figurato, seccato, esasperato. È la prima parola della prima raccolta.` },
  { id: "avaccia", voce: "avaccia", re: /avaccia/i, stato: "certo",
    testo: `Da <i>avacciare</i>, affrettare: voce antica, che Dante usa nella forma
    avverbiale <i>avaccio</i>, ‘presto’.` },
  { id: "baccellieri", voce: "baccellieri", re: /baccellieri/i, stato: "certo",
    testo: `Il baccelliere era, nelle università medievali, chi aveva il grado inferiore a
    quello di maestro; dal francese antico <i>bacheler</i>.` },
  { id: "cadatomba", voce: "cadatomba", re: /cadatomba/i, stato: "lettura",
    testo: `Composto non attestato. Ha il suono di <i>catacomba</i>, attraversato dal
    verbo <i>cadere</i>.` },
  { id: "chiaravalle", voce: "Chiaravalle", re: /chiaravalle/i, stato: "lettura",
    testo: `Con ogni probabilità l’abbazia cistercense alle porte di Milano, fondata nel
    1135.` },
  { id: "chiegga", voce: "chiegga", re: /chiegga/i, stato: "certo",
    testo: `Forma antica di <i>chieda</i>, di lunga tradizione nella lingua poetica.` },
  { id: "cinghia", voce: "cinghìa, cinghiglia", re: /cinghìa|cinghiglia/i, stato: "aperto",
    testo: `Due forme vicine, in due albe della raccolta del 1994: «un’alba che s’apre alla
    cinghiglia» e «un’alba di cinghìa». Entrambe stanno in rima, o quasi, con un verbo che
    si attorciglia o si assottiglia. Il significato resta da trovare.` },
  { id: "civettona", voce: "civettona", re: /civettona/i, stato: "certo",
    testo: `Accrescitivo di <i>civetta</i>, nel senso di donna che ama farsi corteggiare; la
    parola è nei vocabolari. Qui a civettare è la morte: «che morte placa che morte
    civettona».` },
  { id: "clamat", voce: "clamat", re: /clamat/i, stato: "certo",
    testo: `Latino: ‘grida, invoca’.` },
  { id: "colchico", voce: "colchico", re: /colchico/i, stato: "certo",
    testo: `<i>Colchicum autumnale</i>, fiore viola d’autunno, velenoso. Il nome viene dalla
    Colchide, la terra di Medea.` },
  { id: "corrivo", voce: "corrivo", re: /corrivo/i, stato: "certo",
    testo: `Che cede facilmente, precipitoso nel giudicare o nel concedersi. Voce
    letteraria.` },
  { id: "crocidanti", voce: "crocidanti", re: /crocidanti/i, stato: "certo",
    testo: `Da <i>crocidare</i>, il verso del corvo e della cornacchia.` },
  { id: "defossiani", voce: "defossiani", re: /defossiani/i, stato: "lettura",
    testo: `Dal latino <i>defossus</i>, ‘sepolto, interrato’, participio di
    <i>defodere</i>. «Interni defossiani»: stanze come scavi.` },
  { id: "delibato", voce: "delibato", re: /delibato/i, stato: "certo",
    testo: `Assaggiato appena, gustato a fior di labbra (latino <i>delibare</i>). Due volte:
    nel 1984 e, sedici anni dopo, nei <i>Pipistrelli</i>, dove a essere delibato è il
    «giuoco incerto della poesia».` },
  { id: "ecolalia", voce: "ecolalia", re: /ecolalia/i, stato: "certo",
    testo: `Termine della psichiatria: la ripetizione automatica di parole appena udite.` },
  { id: "emistichio", voce: "emistichio", re: /emistichio/i, stato: "certo",
    testo: `Ciascuna delle due metà di un verso divise dalla cesura.` },
  { id: "etera", voce: "etèra", re: /etèra/i, stato: "certo",
    testo: `Dal greco <i>hetaíra</i>, ‘compagna’: la cortigiana colta dell’antica Grecia.` },
  { id: "famuli", voce: "famuli", re: /famuli/i, stato: "certo",
    testo: `Dal latino <i>famulus</i>, il servo di casa.` },
  { id: "gimmi", voce: "gimmi", re: /gimmi/i, stato: "certo",
    testo: `L’inglese <i>gimme</i>, ‘dammi’, scritto come si pronuncia, rivolto a una
    sibilla.` },
  { id: "illune", voce: "illune", re: /illun[ei]/i, stato: "certo",
    testo: `Senza luna. Detto di giorni, di un’estate, di una nebbia: torna in quattro
    raccolte.` },
  { id: "iperbati", voce: "iperbati", re: /iperbati/i, stato: "certo",
    testo: `L’iperbato è la figura retorica che separa parole che andrebbero insieme (greco
    <i>hyperbatón</i>, ‘scavalcamento’).` },
  { id: "itache", voce: "Itache", re: /itache/i, stato: "certo",
    testo: `Plurale di Itaca. L’<i>Itaca</i> di Kavafis si chiude con lo stesso plurale: il
    viaggiatore, che vi è giunto povero e savio, avrà capito che cosa significano le
    Itache.` },
  { id: "lampare", voce: "lampare", re: /lampare/i, stato: "certo",
    testo: `Le lampade della pesca notturna, e le barche che le portano.` },
  { id: "liminare", voce: "liminare", re: /liminare/i, stato: "certo",
    testo: `La soglia, dal latino <i>limen</i>.` },
  { id: "lupanare", voce: "lupanare", re: /lupanare/i, stato: "certo",
    testo: `Dal latino <i>lupanar</i>, postribolo (<i>lupa</i> era la prostituta).` },
  { id: "marcita", voce: "marcita", re: /marcita/i, stato: "certo",
    testo: `Prato della pianura lombarda tenuto sotto un velo d’acqua corrente anche
    d’inverno, perché non geli e dia erba tutto l’anno.` },
  { id: "marradiano", voce: "marradiano", re: /marradiano/i, stato: "lettura",
    testo: `Di Marradi, il paese dell’Appennino dove nacque Dino Campana, il poeta dei
    <i>Canti orfici</i>. «Sibilla gimmi un canto marradiano»: un canto alla Campana,
    chiesto a una profetessa in inglese.` },
  { id: "moscardini", voce: "moscardini", re: /moscardini/i, stato: "certo",
    testo: `Due animali con lo stesso nome: il piccolo roditore che dorme tutto l’inverno e
    il polpo di scoglio. Il verso non sceglie.` },
  { id: "nausica", voce: "Nausica", re: /nausica/i, stato: "certo",
    testo: `Nausicaa, figlia del re dei Feaci, che nel sesto libro dell’<i>Odissea</i>
    trova Ulisse naufrago sulla spiaggia.` },
  { id: "nomen", voce: "nomen", re: /nomen/i, stato: "certo",
    testo: `Latino: ‘nome’.` },
  { id: "pataloudia", voce: "pataloudia", re: /pataloudia/i, stato: "certo",
    testo: `Il greco moderno <span lang="el">πεταλούδια</span> (<i>petaloúdia</i>),
    ‘farfalle’. È la prima parola della raccolta del 1994.` },
  { id: "peristalsio", voce: "peristalsio", re: /peristalsio/i, stato: "lettura",
    testo: `Formato su <i>peristalsi</i> (greco <i>peristaltikós</i>, ‘che stringe
    tutt’intorno’), il moto ondulatorio dei visceri.` },
  { id: "petebat", voce: "petebât", re: /petebât/i, stato: "lettura",
    testo: `Il latino <i>petebat</i>, imperfetto di <i>petere</i>: ‘cercava, chiedeva, si
    dirigeva verso’. L’accento circonflesso, estraneo al latino, gli dà un’aria francese; e
    il verso, «petebât che belo veramente», continua in un dialetto che non è siciliano.` },
  { id: "piovorno", voce: "piovorno", re: /piovorno/i, stato: "certo",
    testo: `Voce letteraria: piovoso, carico di pioggia.` },
  { id: "prefica", voce: "prèfica", re: /prèfica/i, stato: "certo",
    testo: `Donna pagata per piangere ai funerali (latino <i>praefica</i>).` },
  { id: "reina", voce: "reina", re: /reina/i, stato: "certo",
    testo: `Forma antica e poetica di <i>regina</i>.` },
  { id: "rogge", voce: "rogge", re: /rogge/i, stato: "certo",
    testo: `I canali d’irrigazione della pianura lombarda.` },
  { id: "scalmane", voce: "scalmane", re: /scalmane/i, stato: "certo",
    testo: `Vampate di calore, febbri improvvise. Voce toscana.` },
  { id: "sedula", voce: "sedùla", re: /sedùla/i, stato: "certo",
    testo: `Dal latino <i>sedulus</i>, ‘assiduo, premuroso’, da cui l’italiano letterario
    <i>sèdulo</i>. Riccardo sposta l’accento.` },
  { id: "semalbero", voce: "semalbero", re: /semalbero/i, stato: "aperto",
    testo: `Composto non attestato. Forse un mezzo albero (<i>semi-</i>), forse un albero che
    fa da segno (greco <i>sêma</i>).` },
  { id: "semele", voce: "semèle", re: /semèle/i, stato: "certo",
    testo: `Semele, figlia di Cadmo, amata da Zeus e madre di Dioniso. Chiese di vedere il
    dio nel suo vero aspetto e ne fu incenerita.` },
  { id: "settemplici", voce: "settemplici", re: /settemplici/i, stato: "certo",
    testo: `Dal latino <i>septemplex</i>, ‘di sette strati’: in Ovidio è lo scudo di Aiace,
    fatto di sette pelli di bue.` },
  { id: "smemorando", voce: "smemorando", re: /smemorando/i, stato: "certo",
    testo: `Da <i>smemorare</i>, perdere la memoria. Due volte, a sedici anni di distanza:
    «ti scindi smemorando» nel 1980, «smemorando la vita e le sue fughe» nelle
    <i>Itache</i>.` },
  { id: "solone", voce: "solone", re: /solone/i, stato: "lettura",
    testo: `Solone, il legislatore di Atene; in italiano, per antonomasia, un saccente.
    Spinse gli Ateniesi a riprendere Salamina ai Megaresi con un’elegia di cui si conserva
    l’invito: “Andiamo a Salamina, a combattere per l’isola amabile”. Di qui forse
    il distico «quando solone non certo megarese / andiamo all’isola all’isola divina».` },
  { id: "spartivento", voce: "spartivento", re: /spartivento/i, stato: "certo",
    testo: `Il punto che divide i venti. Spartivento si chiamano due capi del Mediterraneo,
    uno in Calabria e uno in Sardegna.` },
  { id: "terramare", voce: "terramare", re: /terramare/i, stato: "certo",
    testo: `Plurale di <i>terramara</i>: i villaggi dell’età del bronzo della pianura
    padana. Il nome viene dal dialetto emiliano <i>terra marna</i>, la terra grassa dei
    loro resti, che i contadini scavavano per concimare i campi.` },
  { id: "trenno", voce: "trenno", re: /trenno/i, stato: "lettura",
    testo: `Forse Trenno, il quartiere all’estremo ovest di Milano, con il suo parco e il suo
    ippodromo.` },
  { id: "tuberosa", voce: "tuberosa", re: /tuberosa/i, stato: "certo",
    testo: `<i>Polianthes tuberosa</i>, fiore bianco dal profumo intenso, più forte di
    notte.` },
  { id: "carminia", voce: "carminia", re: /carminia/i, stato: "aperto",
    testo: `Due strade possibili: il latino <i>carmina</i>, ‘canti’, e il rosso carminio.
    «Ultimo bardo di carminia svilta» le lascia aperte entrambe.` },
];

// Parole per cui non si è trovata una spiegazione convincente.
window.SENZA_SPIEGAZIONE = [
  { voce: "andio", re: /andio/i },
  { voce: "bassantònio", re: /bassantònio/i },
  { voce: "caravigghiari", re: /caravigghiari/i },
  { voce: "gainere", re: /gainere/i },
  { voce: "Itche", re: /Itche/ },
  { voce: "magana", re: /magana/i },
  { voce: "panmriti", re: /panmriti/i },
  { voce: "ridolì", re: /ridolì/i },
  { voce: "rimalmezzo", re: /rimalmezzo/i },
  { voce: "sblogna", re: /sblogna/i },
  { voce: "verdarem", re: /verdarem/i },
];

window.RICORRENZE = [
  { id: "luna", titolo: "La luna",
    re: /\b(mezza)?lun(a|e|are)\b|illun[ei]\b/i,
    testo: `Quasi mai piena, quasi mai consolatoria. È straniata, capovolta, sdoppiata sopra
    i tetti, «colma di rughe e priva di speranze»; una volta è «forse l’unica compagna», con
    «romanticismo un po’ casuale». Conta anche quando manca: <i>illune</i>, senza
    luna, torna in quattro raccolte.` },
  { id: "isole", titolo: "Le isole",
    re: /\bisol(a|e|etta)\b|itac|nausica/i,
    testo: `Dall’«isola divina» della prima raccolta all’«isoletta senza più stagione»
    dell’ultima quartina per Cecilia. In mezzo c’è Itaca: toccata in un verso («E l’hai
    toccata Itaca l’hai vista»), più lontana in un altro, moltiplicata nel titolo di una
    raccolta.` },
  { id: "pipistrelli", titolo: "I pipistrelli",
    re: /pipistrell/i,
    testo: `Arrivano a metà degli anni Novanta, a salutare «il ritorno / d’un vecchio autunno
    fragile e discreto», e restano fino a dare il nome all’ultima raccolta. Lì, però, si
    vedono una volta sola, alla fine: «Poi pipistrelli morti alla deriva».` },
  { id: "rose", titolo: "Le rose",
    re: /\bros(a|e)\b/i,
    testo: `Quasi sempre già colte, traslocate, sfuggenti: «Le rose sono state tutte colte /
    né tu potevi trovare quella vera». Altrove rosa è soltanto un colore, quello di
    un’alba.` },
  { id: "grillo", titolo: "Il grillo",
    re: /grillo/i,
    testo: `Tre volte, tutte nella prima raccolta. Tocca la tenebra, canta «in voce di
    contralto», e c’è perfino una vela che chiede d’essere grillo. Poi tace.` },
  { id: "usignoli", titolo: "Gli usignoli",
    re: /usignol/i,
    testo: `L’uccello della poesia per antonomasia compare tre volte, e mai in buona salute:
    prima «semidormiente», poi in un «fiorire opaco», infine come canto che «un tempo / fu
    un canto d’usignolo» e che adesso, giungendo inaspettato, disturba.` },
  { id: "vento", titolo: "Il vento",
    re: /\bvent(o|i|are)\b|spartivento/i,
    testo: `Soffia in ogni raccolta, e più spesso porta via che portare: «Chiuso nel vento il
    tuo fuggiasco passo», «cedendo al vento libri giammai letti».` },
  { id: "sogno", titolo: "Il sogno",
    re: /\bsogn/i,
    testo: `La parola che ritorna più spesso. Raramente si avvera: i sogni sono
    «inconcludenti», «vagabondi», vanno «alla deriva»; una volta, verso la fine,
    «somigliano ai domani».` },
  { id: "poesia", titolo: "La poesia",
    re: /poesi|poet|poema|emistichio|\bversi\b|reduce verso|un verso vibri/i,
    testo: `Riccardo ne parla senza riguardi. La poesia è «quella che hai venduto / fingendo
    amori e cieli d’orticaria»; il poeta è «incerto o saltimbanco», si apre «malandato»,
    scrive «versi salottieri»; e c’è un autunno «senza poesia».` },
];

window.RITRATTI = [
  { src: "img/brenna.jpg",
    titolo: "Riccardo Di Paola affacciato alla mansarda",
    nota: "Disegno di Nicoletta Brenna, siglato NB 03. Riprodotto nel volume del 2004." },
  { src: "img/fotografia.jpg",
    titolo: "Fotografia",
    nota: "Dalla pagina biografica del volume del 2004." },
  { src: "img/del-bello.jpg",
    titolo: "Ritratto di Riccardo Di Paola",
    nota: "Disegno di Gianfranco Del Bello. Riprodotto nel volume del 2004." },
  { src: "img/nota-biografica.jpg",
    titolo: "La nota biografica del volume",
    nota: "Firmata plg. Dicembre 2004." },
];
