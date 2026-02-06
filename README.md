# ⴰⵎⴰⵣⵉⵖ Amazigh Date API

A beautiful, lightweight API that provides dates across three major calendars used in Morocco: **ⴰⵎⴰⵣⵉⵖ Amazigh (Berber)** 🏔️, **Gregorian** 📅, and **Islamic (Hijri)** 🌙. Built with Hono ⚡ and Bun 🥟 for blazing-fast performance 🚀.

**✨ Features:**
- 🌐 **Smart Content Negotiation**: Automatically serves beautiful UI to browsers, JSON to API clients
- 📅 **Three Calendar Systems**: Amazigh, Gregorian, and Islamic calendars
- ⵜ **Tifinagh Support**: Native Berber script for numbers and month names
- 🇲🇦 **Morocco Time**: All times in Africa/Casablanca timezone
- ⚡ **Lightning Fast**: Built on Bun runtime with Hono framework
- 🎨 **Moroccan Luxury UI**: Premium gold-themed interface inspired by Moroccan aesthetics

---

## 🚀 Quick Start

### Prerequisites
- [Bun](https://bun.sh/) installed on your system

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/amazigh-date-api.git
cd amazigh-date-api

# Install dependencies
bun install

# Start the development server
bun run dev
```

The API will be available at `http://localhost:3000`

---

## 📖 API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints Overview

| Endpoint | Description | Returns |
|----------|-------------|---------|
| `GET /` | Interactive API documentation | HTML UI |
| `GET /api/time` | Current date in all calendars | JSON/HTML |
| `GET /api/times` | Multiple future dates | JSON/HTML |

---

## 🔗 Detailed Endpoint Reference

### 1. Documentation Page

```
GET /
```

**Description**: Interactive documentation page listing all available endpoints with examples.

**Example**:
```bash
curl http://localhost:3000/
```

---

### 2. Current Date (All Calendars)

```
GET /api/time
```

**Description**: Returns the current date in Amazigh, Gregorian, and Islamic calendars.

**Query Parameters**:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `calendar` | string | all | Specific calendar: `amazigh`, `gregorian`, or `islamic` |
| `numerals` | string | latin | Set to `tifinagh` for Tifinagh numerals |
| `format` | string | auto | Force output: `json` or `html` |

**Examples**:

```bash
# All calendars (JSON for curl, HTML for browsers)
curl http://localhost:3000/api/time

# Force JSON output
curl http://localhost:3000/api/time?format=json

# Specific calendar
curl http://localhost:3000/api/time?calendar=amazigh

# Tifinagh numerals
curl http://localhost:3000/api/time?numerals=tifinagh

# Combined parameters
curl http://localhost:3000/api/time?calendar=islamic&numerals=tifinagh&format=json
```

**Response (All Calendars)**:
```json
{
  "amazigh": {
    "calendar": "amazigh",
    "day": 24,
    "monthNumber": 1,
    "monthNameLatin": "Yennayer",
    "monthNameTifinagh": "ⵢⵏⵏⴰⵢⵔ",
    "monthNameArabic": "يناير",
    "year": 2976,
    "timeInMorocco": "03:23:13"
  },
  "gregorian": {
    "calendar": "gregorian",
    "day": 6,
    "monthNumber": 2,
    "monthNameLatin": "February",
    "monthNameTifinagh": "ⴼⴰⴱⵔⵓⴰⵔⵉ",
    "monthNameArabic": "فبراير",
    "year": 2026,
    "timeInMorocco": "03:23:13"
  },
  "islamic": {
    "calendar": "islamic",
    "day": 18,
    "monthNumber": 8,
    "monthNameLatin": "Shaʿban",
    "monthNameTifinagh": "ⵛⵄⴱⴰⵏ",
    "monthNameArabic": "شعبان",
    "year": 1447,
    "timeInMorocco": "03:23:13"
  }
}
```

**Response (Single Calendar)**:
```json
{
  "calendar": "amazigh",
  "day": 24,
  "monthNumber": 1,
  "monthNameLatin": "Yennayer",
  "monthNameTifinagh": "ⵢⵏⵏⴰⵢⵔ",
  "monthNameArabic": "يناير",
  "year": 2976,
  "timeInMorocco": "03:23:13"
}
```

---

### 3. Multiple Future Dates

```
GET /api/times
```

**Description**: Returns an array of dates for multiple consecutive days.

**Query Parameters**:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `days` | number | 1 | Number of days to return (max: 30) |
| `calendar` | string | all | Specific calendar: `amazigh`, `gregorian`, or `islamic` |
| `numerals` | string | latin | Set to `tifinagh` for Tifinagh numerals |
| `format` | string | auto | Force output: `json` or `html` |

**Examples**:

```bash
# Next 5 days (all calendars)
curl http://localhost:3000/api/times?days=5

# Next 7 days (JSON format)
curl http://localhost:3000/api/times?days=7&format=json

# Next 3 days (Amazigh calendar only)
curl http://localhost:3000/api/times?days=3&calendar=amazigh

# Next 10 days with Tifinagh numerals
curl http://localhost:3000/api/times?days=10&numerals=tifinagh
```

**Response**:
```json
[
  {
    "amazigh": { ... },
    "gregorian": { ... },
    "islamic": { ... }
  },
  {
    "amazigh": { ... },
    "gregorian": { ... },
    "islamic": { ... }
  }
]
```

---

## 🎨 Content Negotiation

The API intelligently serves content based on the client:

### Automatic Detection

| Client Type | Default Response | Override |
|-------------|------------------|----------|
| **Web Browser** | Beautiful HTML UI | Add `?format=json` |
| **curl / API Client** | Raw JSON data | Add `?format=html` |
| **Postman / Insomnia** | Raw JSON data | Set `Accept: text/html` header |

### Force Specific Format

```bash
# Force JSON (even in browser)
http://localhost:3000/api/time?format=json

# Force HTML UI (even in curl)
http://localhost:3000/api/time?format=html

# Alternative: use Accept header
curl -H "Accept: text/html" http://localhost:3000/api/time
```

### UI Features

When viewing in a browser, you get:
- 🎨 **Moroccan Luxury Design**: Gold accents, elegant typography
- 📱 **Responsive Layout**: Works on all screen sizes
- 🔗 **Quick JSON Toggle**: "View Raw JSON" link preserves all query parameters
- ⵜ **Tifinagh Font Support**: Proper rendering of Berber script

---

## 🕰️ How It Works

### Calendar Calculations

**Amazigh Calendar**:
1. Converts Gregorian date to Julian calendar (subtract 13 days)
2. Adds 950 years to get Amazigh year
3. Uses Julian month/day for Amazigh month/day

**Gregorian Calendar**:
- Direct conversion using JavaScript Date API
- Timezone: Africa/Casablanca

**Islamic Calendar**:
- Fetches from [Aladhan API](https://aladhan.com/prayer-times-api)
- Method 2 (ISNA - Islamic Society of North America)
- Location: Casablanca, Morocco

### Tifinagh Numerals

When `numerals=tifinagh` is set, all numbers are converted to IRCAM-style Tifinagh digits:

| Latin | Tifinagh |
|-------|----------|
| 0 | ⴰ |
| 1 | ⵣ |
| 2 | ⵉ |
| 3 | ⵍ |
| 4 | ⵛ |
| 5 | ⵜ |
| 6 | ⵎ |
| 7 | ⵏ |
| 8 | ⵚ |
| 9 | ⵙ |

---

## 🛠️ Development

### Project Structure

```
amazigh-date-api/
├── index.ts                 # Main application (Hono routes)
├── amazighCalendar.ts       # Amazigh month data
├── gregorianCalendar.ts     # Gregorian month data
├── islamicCalendar.ts       # Islamic month data
├── ui/
│   └── omniversify.ts       # UI component library
├── public/
│   └── favicon.svg          # Favicon
├── package.json             # Dependencies
├── bun.lock                 # Lock file
└── README.md                # This file
```

### Available Scripts

```bash
# Development server (with hot reload)
bun run dev

# Production server
bun run start
```

### Tech Stack

- **Runtime**: [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime
- **Framework**: [Hono](https://hono.dev/) - Ultrafast web framework
- **Language**: TypeScript - Type-safe development
- **Styling**: Inline CSS with CSS variables - No build step needed

---

## 🌍 Deployment

### Deploy to Vercel

1. **Fork this repository** to your GitHub account

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com/)
   - Click "New Project"
   - Import your forked repository

3. **Configure Build Settings**:
   - Framework Preset: `Other`
   - Build Command: Leave empty (uses `vercel.json` config)
   - Output Directory: Leave empty
   - Install Command: `bun install` or `npm install`

4. **Deploy**: Click "Deploy" and wait for build to complete

5. **Done!** Your API is live at `https://your-project.vercel.app`

> **Note**: The app uses Hono's Vercel adapter to run on Vercel's Node.js runtime. All routes are handled through the `/api/index.ts` serverless function.

### Deploy to Other Platforms

**Railway**:
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

**Fly.io**:
```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Launch app
fly launch
fly deploy
```

---

## 📊 Usage Examples

### JavaScript/TypeScript

```typescript
// Fetch current date
const response = await fetch('http://localhost:3000/api/time?format=json');
const data = await response.json();
console.log(data.amazigh.year); // 2976

// Fetch next 7 days
const dates = await fetch('http://localhost:3000/api/times?days=7&format=json');
const calendar = await dates.json();
console.log(calendar.length); // 7
```

### Python

```python
import requests

# Get current date
response = requests.get('http://localhost:3000/api/time?format=json')
data = response.json()
print(f"Amazigh Year: {data['amazigh']['year']}")

# Get next 5 days
response = requests.get('http://localhost:3000/api/times?days=5&format=json')
dates = response.json()
for date in dates:
    print(f"{date['gregorian']['monthNameLatin']} {date['gregorian']['day']}")
```

### cURL

```bash
# Pretty-print JSON with jq
curl -s http://localhost:3000/api/time?format=json | jq .

# Extract specific field
curl -s http://localhost:3000/api/time?calendar=amazigh&format=json | jq -r '.year'

# Save to file
curl -s http://localhost:3000/api/times?days=30&format=json > calendar.json
```

---

## 🎯 Use Cases

- **Mobile Apps**: Display Amazigh calendar in your app
- **Websites**: Show current date in multiple calendars
- **Calendar Widgets**: Build custom calendar components
- **Cultural Projects**: Preserve and promote Amazigh heritage
- **Educational Tools**: Teach about different calendar systems
- **Event Planning**: Convert between calendar systems

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Report Bugs**: Open an issue with details
2. **Suggest Features**: Share your ideas in discussions
3. **Submit PRs**: Fork, create a branch, and submit a pull request
4. **Improve Docs**: Help make documentation clearer
5. **Add Translations**: Support more languages

---

## 📌 Roadmap

- [ ] Add weekday names (Amazigh, Arabic, French)
- [ ] Support for historical date lookups
- [ ] GraphQL API endpoint
- [ ] Webhook notifications for special dates
- [ ] Calendar conversion utilities
- [ ] Mobile SDK (React Native, Flutter)
- [ ] Multilingual UI (Tamazight, Arabic, French, English)

---

## 🙏 Acknowledgments

- **Aladhan API**: For Islamic calendar data
- **IRCAM**: For Tifinagh standardization
- **Amazigh Community**: For preserving our heritage

---

## 👣 About

Made with ❤️ by [Omniversify](https://omniversify.com) — a studio reimagining North African culture through code, games, and innovation.

**Preserving identity, one API call at a time.**

---

## 📜 License

MIT License — Free for all to use, remix, and share.

```
Copyright (c) 2026 Omniversify

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/phaylali/amazigh-date-api/issues)
- **Discussions**: [GitHub Discussions](https://github.com/phaylali/amazigh-date-api/discussions)
- **Email**: support@omniversify.com
- **Website**: [omniversify.com](https://omniversify.com)

---

**ⴰⵣⵓⵍ (Azul)** — Thank you for using Amazigh Date API! 🌟
