"""Genera js/poesie.js dalla trascrizione in bozza/poesie-zio.md.

Uso: python3 tools/build_data.py   (dalla cartella riccardo-di-paola)
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT.parent / "bozza" / "poesie-zio.md"
OUT = ROOT / "js" / "poesie.js"

# Ordine cronologico delle raccolte e intestazioni come compaiono nella bozza.
RACCOLTE = [
    ("abiogenesi-1980", "ABIOGENESI (1980)", "Abiogenesi", "1980"),
    ("abiogenesi-1982", "ABIOGENESI (1982)", "Abiogenesi", "1982"),
    ("metamorfosi", "METAMORFOSI (1984)", "Metamorfosi", "1984"),
    ("abiogenesi-1994", "ABIOGENESI (1994)", "Abiogenesi", "1994"),
    ("abiogenesi-ultima", "ABIOGENESI ULTIMA (1995)", "Abiogenesi ultima", "1995"),
    ("itache", "ITACHE (1996/97)", "Itache", "1996–1997"),
    ("senza-titolo", "SENZA TITOLO (1997)", "Senza titolo", "1997"),
    ("pipistrelli", "PIPISTRELLI (2000)", "Pipistrelli", "2000"),
    ("cecilia", "POESIE PER CECILIA (?)", "Poesie per Cecilia", ""),
]

# Correzioni di evidenti refusi di battitura della trascrizione.
REFUSI = {"rivOlte": "rivolte"}


def clean(line):
    line = " ".join(line.replace("\u2011", "-").split())
    for a, b in REFUSI.items():
        line = line.replace(a, b)
    return line


def split_blocks(text):
    headers = {h: key for key, h, *_ in RACCOLTE}
    blocks, current = {}, None
    for raw in text.splitlines():
        stripped = " ".join(raw.replace("\u202f", " ").split()).lstrip("#").strip()
        if stripped in headers:
            current = headers[stripped]
            blocks[current] = []
            continue
        if current:
            blocks[current].append(raw)
    return blocks


def parse_numbered(lines):
    poems, section = [], 0
    current = None
    for raw in lines:
        s = raw.strip()
        if s == "---":
            if poems:
                section += 1
            continue
        m = re.fullmatch(r"\**(\d+)\**", s)
        if m:
            current = {"n": int(m.group(1)), "section": section, "lines": []}
            poems.append(current)
            continue
        if not s or s.startswith("?"):
            continue
        if current is not None:
            current["lines"].append(clean(s))
    return poems


def parse_stanzas(lines):
    poems, buf = [], []
    for raw in lines + [""]:
        s = raw.strip()
        if s:
            buf.append(clean(s))
        elif buf:
            poems.append({"n": len(poems) + 1, "section": 0, "lines": buf})
            buf = []
    return poems


def main():
    blocks = split_blocks(SRC.read_text(encoding="utf-8"))
    out = []
    for key, _, title, year in RACCOLTE:
        lines = blocks[key]
        poems = parse_stanzas(lines) if key == "pipistrelli" else parse_numbered(lines)
        out.append({"id": key, "title": title, "year": year, "poems": poems})
        print(f"{key:20} {len(poems):3} poesie")
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(
        "// Generato da tools/build_data.py a partire da bozza/poesie-zio.md\n"
        "window.RACCOLTE = " + json.dumps(out, ensure_ascii=False, indent=1) + ";\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
