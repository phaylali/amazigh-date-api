# ⴰⵎⴰⵣⵉⵖ Amazigh Date API

A minimal, open-source API that provides the current Amazigh (Berber) calendar date, using accurate Moroccan Standard Time. It supports output in both Latin and Tifinagh scripts.

---

## 🔗 API Endpoints

### All Calendars

```
GET /api/time
```

Example:
```
https://amazigh-date-api.omniversify.com/api/time
```

### Single Calendar

```
GET /api/time?calendar=[calendar_name]
```

Example:
```
https://amazigh-date-api.omniversify.com/api/time?calendar=amazigh
```

### Multiple Dates

```
GET /api/times
```

Example:
```
https://amazigh-date-api.omniversify.com/api/times?days=5
```

---

## 📥 Query Parameters

| Parameter | Type | Description |
|---|---|---|
| numerals | string | Optional. Set to `tifinagh` for Tifinagh digits |
| days | number | Optional. Number of dates to return (max 30) for the `/api/times` endpoint. |
| calendar | string | Optional. Set to `gregorian` or `islamic` to get the date in that calendar. If this parameter is not set, all calendars are returned. |

---

## 🧾 Example Response

### All Calendars (`/api/time`)
```json
{
  "amazigh": {
    "calendar": "amazigh",
    "day": 29,
    "monthNumber": 7,
    "monthNameLatin": "Yulyuz",
    "monthNameTifinagh": "ⵢⵓⵍⵢⵓⵣ",
    "monthNameArabic": "يوليوز",
    "year": 2975,
    "timeInMorocco": "10:30:21"
  },
  "gregorian": {
    "calendar": "gregorian",
    "day": 11,
    "monthNumber": 8,
    "monthNameLatin": "August",
    "monthNameTifinagh": "ⵓⴳⵓⵛⵜ",
    "monthNameArabic": "غشت",
    "year": 2025,
    "timeInMorocco": "10:30:21"
  },
  "islamic": {
    "calendar": "islamic",
    "day": 1,
    "monthNumber": 1,
    "monthNameLatin": "Muharram",
    "monthNameTifinagh": "ⵎⵓⵃⴰⵔⵔⴰⵎ",
    "monthNameArabic": "المحرّم",
    "year": 1445,
    "timeInMorocco": "10:30:21"
  }
}
```

### Single Calendar (`/api/time?calendar=amazigh&numerals=latin`)
```json
{
  "calendar": "amazigh",
  "day": 29,
  "monthNumber": 7,
  "monthNameLatin": "Yulyuz",
  "monthNameTifinagh": "ⵢⵓⵍⵢⵓⵣ",
  "monthNameArabic": "يوليوز",
  "year": 2975,
  "timeInMorocco": "10:30:21"
}
```

### Multiple Dates (`/api/times?days=2`)
```json
[
  {
    "amazigh": {
      "calendar": "amazigh",
      "day": 29,
      "monthNumber": 7,
      "monthNameLatin": "Yulyuz",
      "monthNameTifinagh": "ⵢⵓⵍⵢⵓⵣ",
      "monthNameArabic": "يوليوز",
      "year": 2975,
      "timeInMorocco": "10:30:21"
    },
    "gregorian": {
      "calendar": "gregorian",
      "day": 11,
      "monthNumber": 8,
      "monthNameLatin": "August",
      "monthNameTifinagh": "ⵓⴳⵓⵛⵜ",
      "monthNameArabic": "غشت",
      "year": 2025,
      "timeInMorocco": "10:30:21"
    },
    "islamic": {
      "calendar": "islamic",
      "day": 1,
      "monthNumber": 1,
      "monthNameLatin": "Muharram",
      "monthNameTifinagh": "ⵎⵓⵃⴰⵔⵔⴰⵎ",
      "monthNameArabic": "المحرّم",
      "year": 1445,
      "timeInMorocco": "10:30:21"
    }
  },
  {
    "amazigh": {
      "calendar": "amazigh",
      "day": 30,
      "monthNumber": 7,
      "monthNameLatin": "Yulyuz",
      "monthNameTifinagh": "ⵢⵓⵍⵢⵓⵣ",
      "monthNameArabic": "يوليوز",
      "year": 2975,
      "timeInMorocco": "10:30:21"
    },
    "gregorian": {
      "calendar": "gregorian",
      "day": 12,
      "monthNumber": 8,
      "monthNameLatin": "August",
      "monthNameTifinagh": "ⵓⴳⵓⵛⵜ",
      "monthNameArabic": "غشت",
      "year": 2025,
      "timeInMorocco": "10:30:21"
    },
    "islamic": {
      "calendar": "islamic",
      "day": 1,
      "monthNumber": 1,
      "monthNameLatin": "Muharram",
      "monthNameTifinagh": "ⵎⵓⵃⴰⵔⵔⴰⵎ",
      "monthNameArabic": "المحرّم",
      "year": 1445,
      "timeInMorocco": "10:30:21"
    }
  }
]
```

---

## 🕰️ How It Works

- Converts the current Gregorian calendar to the Julian calendar by subtracting 13 days, and then from the Julian calendar into the Amazigh calendar by adding +950 years.
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
