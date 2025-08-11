const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const https = require('https');

// Serve favicon
app.use('/favicon.ico', express.static(path.join(__dirname, 'public', 'favicon.svg')));

// Load calendar data
const amazighCalendar = JSON.parse(fs.readFileSync(path.join(__dirname, 'amazighCalendar.json'), 'utf8'));
const gregorianCalendar = JSON.parse(fs.readFileSync(path.join(__dirname, 'gregorianCalendar.json'), 'utf8'));
const islamicCalendar = JSON.parse(fs.readFileSync(path.join(__dirname, 'islamicCalendar.json'), 'utf8'));

function toTifinaghNumeral(number) {
  const digitsMap = ['\u2D30', '\u2D63', '\u2D49', '\u2D4D', '\u2D3B', '\u2D54', '\u2D4E', '\u2D4F', '\u2D5C', '\u2D5B'];
  return String(number)
    .split('')
    .map(d => digitsMap[parseInt(d)])
    .join('');
}

function makeApiRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return makeApiRequest(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function getAmazighDate(date, useTifinagh, calendar) {
  const moroccoTime = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Casablanca',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date);

  const dateParts = moroccoTime.split(', ');
  const timePart = dateParts[1];

  let day, month, year;
  let calendarData;

  const gYear = date.getFullYear();

  if (calendar === 'amazigh') {
    const julianDate = new Date(date);
    julianDate.setDate(date.getDate() - 13);
    day = julianDate.getDate();
    month = julianDate.getMonth();
    year = gYear + 950;
    calendarData = amazighCalendar;
    const monthData = calendarData[month];
    return {
      calendar: calendar,
      day: useTifinagh ? toTifinaghNumeral(day) : day,
      monthNumber: useTifinagh ? toTifinaghNumeral(month + 1) : month + 1,
      monthNameLatin: monthData.latin,
      monthNameTifinagh: monthData.tifinagh,
      monthNameArabic: monthData.arabic,
      year: useTifinagh ? toTifinaghNumeral(year) : year,
      timeInMorocco: useTifinagh
        ? timePart
            .split(':')
            .map(n => toTifinaghNumeral(n))
            .join(':')
        : timePart
    };
  } else if (calendar === 'gregorian') {
    day = date.getDate();
    month = date.getMonth();
    year = gYear;
    calendarData = gregorianCalendar;
    const monthData = calendarData[month];
    return {
      calendar: calendar,
      day: useTifinagh ? toTifinaghNumeral(day) : day,
      monthNumber: useTifinagh ? toTifinaghNumeral(month + 1) : month + 1,
      monthNameLatin: monthData.latin,
      monthNameTifinagh: monthData.tifinagh,
      monthNameArabic: monthData.arabic,
      year: useTifinagh ? toTifinaghNumeral(year) : year,
      timeInMorocco: useTifinagh
        ? timePart
            .split(':')
            .map(n => toTifinaghNumeral(n))
            .join(':')
        : timePart
    };
  } else if (calendar === 'islamic') {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    const apiUrl = `https://api.aladhan.com/v1/timingsByCity/${formattedDate}?city=Casablanca&country=Morocco&method=2`;

    const islamicDateData = await makeApiRequest(apiUrl);

    const hijriDate = islamicDateData.data.date.hijri.date;
    const [islamicDay, islamicMonth, islamicYear] = hijriDate.split('-');
    
    const monthData = islamicCalendar[parseInt(islamicMonth) - 1];

    return {
      calendar: calendar,
      day: useTifinagh ? toTifinaghNumeral(parseInt(islamicDay)) : parseInt(islamicDay),
      monthNumber: useTifinagh ? toTifinaghNumeral(parseInt(islamicMonth)) : parseInt(islamicMonth),
      monthNameLatin: monthData.latin,
      monthNameTifinagh: monthData.tifinagh,
      monthNameArabic: monthData.arabic,
      year: useTifinagh ? toTifinaghNumeral(parseInt(islamicYear)) : parseInt(islamicYear),
      timeInMorocco: useTifinagh
        ? timePart
            .split(':')
            .map(n => toTifinaghNumeral(n))
            .join(':')
        : timePart
    };
  }
}

app.get('/api/time', async (req, res) => {
  const useTifinagh = req.query.numerals === 'tifinagh';
  const calendar = req.query.calendar;

  try {
    if (calendar) {
      const date = await getAmazighDate(new Date(), useTifinagh, calendar);
      res.json(date);
    } else {
      const amazighDate = await getAmazighDate(new Date(), useTifinagh, 'amazigh');
      const gregorianDate = await getAmazighDate(new Date(), useTifinagh, 'gregorian');
      const islamicDate = await getAmazighDate(new Date(), useTifinagh, 'islamic');
      res.json({
        amazigh: amazighDate,
        gregorian: gregorianDate,
        islamic: islamicDate
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch date' });
  }
});

app.get('/api/times', async (req, res) => {
  const useTifinagh = req.query.numerals === 'tifinagh';
  const calendar = req.query.calendar;
  let days = parseInt(req.query.days) || 1;
  if (days > 30) {
    days = 30;
  }
  const dates = [];
  try {
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      if (calendar) {
        dates.push(await getAmazighDate(date, useTifinagh, calendar));
      } else {
        const amazighDate = await getAmazighDate(date, useTifinagh, 'amazigh');
        const gregorianDate = await getAmazighDate(date, useTifinagh, 'gregorian');
        const islamicDate = await getAmazighDate(date, useTifinagh, 'islamic');
        dates.push({
          amazigh: amazighDate,
          gregorian: gregorianDate,
          islamic: islamicDate
        });
      }
    }
    res.json(dates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dates' });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Morocco Time API is running!',
    endpoints: {
      time: '/api/time',
      tifinagh: '/api/time?numerals=tifinagh',
      times: '/api/times?days=5',
      times_tifinagh: '/api/times?days=5&numerals=tifinagh',
      calendar_gregorian: '/api/time?calendar=gregorian',
      calendar_islamic: '/api/time?calendar=islamic'
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;