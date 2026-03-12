# Cum să actualizezi lista de concerte

Deschide fișierul `assets/data/concerts.json` într-un editor de text (ex. Notepad, TextEdit).

---

## Adaugă un concert

Adaugă un rând nou la începutul listei (între `[` și primul element existent):

```json
{ "name": "Numele concertului", "location": { "en": "Venue, Oraș", "pt": "Venue, Oraș (portugheză)" }, "date": "2026-05-20", "time": "20:00", "url": "https://link-bilete.ro" },
```

**Câmpuri:**

| Câmp | Obligatoriu | Descriere |
|---|---|---|
| `name` | ✅ | Numele concertului sau evenimentului |
| `location` | ✅ | Locul: `"en"` = engleză, `"pt"` = portugheză. Poate fi identic în ambele. |
| `date` | ✅ | Data în format `"2026-05-20"`. Merge și doar anul `"2026"` sau luna `"2026-05"`. |
| `time` | ❌ | Ora de început, ex. `"20:00"`. Opțional. |
| `url` | ❌ | Link pentru cumpărare bilete. Opțional — dacă lipsește, nu apare niciun buton. |

> **Upcoming vs. Past** — Nu trebuie să specifici nimic. Site-ul verifică automat data și afișează concertul la „Upcoming" sau „Past" în funcție de ziua de azi.

---

## Modifică un concert

Găsește rândul corespunzător în fișier și schimbă câmpul dorit. Exemplu — adaugi un link de bilete:

```json
{ "name": "FITS", "location": { "en": "Sibiu", "pt": "Sibiu" }, "date": "2026-06-10", "url": "https://link-nou.ro" },
```

---

## Șterge un concert

Șterge rândul întreg. Ai grijă ca după fiecare rând (în afară de ultimul) să rămână virgula `,` la sfârșit.

**Corect:**
```json
  { "name": "Concert A", ... },
  { "name": "Concert B", ... }
```

**Greșit (virgulă lipsă după Concert A):**
```json
  { "name": "Concert A", ... }
  { "name": "Concert B", ... }
```

---

## Verificare

După orice modificare, poți valida fișierul JSON la [jsonlint.com](https://jsonlint.com) — lipește conținutul și apasă „Validate".
