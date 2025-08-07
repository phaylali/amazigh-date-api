# ⴰⵎⴰⵣⵉⵖ Amazigh Date API

A minimal, open-source API that provides the current Amazigh (Berber) calendar date, using accurate Moroccan Standard Time. It supports output in both Latin and Tifinagh scripts.

---

## 🔗 API Endpoint

```
GET /api/date
```

Example:
```
https://your-vercel-url.vercel.app/api/date
```

---

## 📥 Query Parameters

| Parameter   | Type     | Description                                       |
|-------------|----------|---------------------------------------------------|
| numerals    | string   | Optional. Set to `tifinagh` for Tifinagh digits   |

---

## 🧾 Example Response

### Default Output (`?numerals=latin`)
```json
{
  "day": 7,
  "monthNumber": 8,
  "monthNameTifinagh": "ⵉⵖⵔⴰⵢⵔ",
  "gregorianEquivalentMonth": "August",
  "year": 2975,
  "timeInMorocco": "10:30:21"
}
```

### Tifinagh Numerals Output (`?numerals=tifinagh`)
```json
{
  "day": "ⵏ",
  "monthNumber": "ⵜ",
  "monthNameTifinagh": "ⵉⵖⵔⴰⵢⵔ",
  "gregorianEquivalentMonth": "August",
  "year": "ⵍⵛⵛⵔ",
  "timeInMorocco": "ⴻⵉ:ⵎⵣ:ⵉⵣ"
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
