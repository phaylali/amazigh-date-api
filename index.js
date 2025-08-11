const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

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

function getAmazighDate(date, useTifinagh, calendar) {
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
  const datePart = dateParts[0].split('/');
  const timePart = dateParts[1];

  const gDay = parseInt(datePart[0]);
  const gMonth = parseInt(datePart[1]) - 1;
  const gYear = parseInt(datePart[2]);
  const amazighYear = gYear + 950;

  let calendarData;
  let year;

  switch (calendar) {
    case 'gregorian':
      calendarData = gregorianCalendar;
      year = gYear;
      break;
    case 'islamic':
      calendarData = islamicCalendar;
      // This is a placeholder for Islamic year calculation
      year = 1445;
      break;
    default:
      calendarData = amazighCalendar;
      year = amazighYear;
      break;
  }

  const monthData = calendarData[gMonth];

  return {
    calendar: calendar,
    day: useTifinagh ? toTifinaghNumeral(gDay) : gDay,
    monthNumber: useTifinagh ? toTifinaghNumeral(gMonth + 1) : gMonth + 1,
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
}

app.get('/api/time', (req, res) => {
  const useTifinagh = req.query.numerals === 'tifinagh';
  const calendar = req.query.calendar || 'amazigh';
  const date = getAmazighDate(new Date(), useTifinagh, calendar);
  res.json(date);
});

app.get('/api/times', (req, res) => {
  const useTifinagh = req.query.numerals === 'tifinagh';
  const calendar = req.query.calendar || 'amazigh';
  let days = parseInt(req.query.days) || 1;
  if (days > 30) {
    days = 30;
  }
  const dates = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push(getAmazighDate(date, useTifinagh, calendar));
  }
  res.json(dates);
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