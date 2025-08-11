# ⴰⵎⴰⵣⵉⵖ Amazigh Date API

A minimal, open-source API that provides the current Amazigh (Berber) calendar date, using accurate Moroccan Standard Time. It supports output in both Latin and Tifinagh scripts.

---

## 🔗 API Endpoints

### Single Date

```
GET /api/time
```

Example:
```
https://your-vercel-url.vercel.app/api/time
```

### Multiple Dates

```
GET /api/times
```

Example:
```
https://your-vercel-url.vercel.app/api/times?days=5
```

---

## 📥 Query Parameters

| Parameter | Type | Description |
|---|---|---|
| numerals | string | Optional. Set to `tifinagh` for Tifinagh digits |
| days | number | Optional. Number of dates to return (max 30) |
| calendar | string | Optional. Set to `gregorian` or `islamic` to get the date in that calendar. Default is `amazigh` |

---

## 🧾 Example Response

### Default Output (`?calendar=amazigh&numerals=latin`)
```json
{
  "calendar": "amazigh",
  "day": 7,
  "monthNumber": 8,
  "monthNameLatin": "ɣuct",
  "monthNameTifinagh": "ⵖⵓⵛⵜ",
  "monthNameArabic": "غشت",
  "year": 2975,
  "timeInMorocco": "10:30:21"
}
```

### Tifinagh Numerals Output (`?calendar=amazigh&numerals=tifinagh`)
```json
{
  "calendar": "amazigh",
  "day": "ⵏ",
  "monthNumber": "ⵜ",
  "monthNameLatin": "ɣuct",
  "monthNameTifinagh": "ⵖⵓⵛⵜ",
  "monthNameArabic": "غشت",
  "year": "ⵍⵛⵛⵔ",
  "timeInMorocco": "ⴻⵉ:ⵎⵣ:ⵉⵣ"
}
```

### Gregorian Calendar Output (`?calendar=gregorian`)
```json
{
  "calendar": "gregorian",
  "day": 7,
  "monthNumber": 8,
  "monthNameLatin": "August",
  "monthNameTifinagh": "ⵓⴳⵓⵛⵜ",
  "monthNameArabic": "غشت",
  "year": 2025,
  "timeInMorocco": "10:30:21"
}
```

---

## 🕰️ How It Works

- Converts the current Gregorian date into the Amazigh calendar by adding +950 years.
- Time is based on Moroccan Standard Time (Africa/Casablanca timezone).
- Includes Tifinagh month names and optional digit conversion using IRCAM-style numerals.

---

## 🚀 Deploy to Vercel

1. Fork or clone the repository
2. Push to your GitHub account
3. Connect to [vercel.com](https://vercel.com/) and deploy
4. Done! Your API is live and public

---

## 📌 Roadmap

- Add weekday names in Tifinagh and Tamazight
- Add multilingual output (Tamazight, Arabic, French)
- Add historical Amazigh date lookups

---

## 👣 About

Made with ❤️ by [Omniversify](https://omniversify.com), a studio reimagining North African culture through code, games, and innovation.

Preserving identity — one API call at a time.

---

## 📜 License

MIT License — free for all to use, remix, and share.
