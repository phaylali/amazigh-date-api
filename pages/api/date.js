export default function handler(req, res) {
  const now = new Date();

  const moroccoTime = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Casablanca',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(now);

  const dateParts = moroccoTime.split(', ');
  const datePart = dateParts[0].split('/');
  const timePart = dateParts[1];

  const gDay = parseInt(datePart[0]);
  const gMonth = parseInt(datePart[1]) - 1;
  const gYear = parseInt(datePart[2]);
  const amazighYear = gYear + 950;

  const tifinaghMonths = [
    "\u2E62\u2D0F\u2D30\u2E2B", "\u2D31\u2D55\u2D0F\u2D30\u2E2B", "\u2D4E\u2D30\u2D55\u2D1A", "\u2E32\u2D31\u2D4B\u2E2B", "\u2D4E\u2D30\u2D4D\u2D4D\u2D55",
    "\u2E52\u2E2B\u2D0F\u2E2B", "\u2E52\u2E4B\u2E2B\u2D61\u2E2B", "\u2E32\u2E3D\u2D55\u2D30\u2D4D", "\u2D4B\u2E52\u2D4E\u2D4D\u2D30\u2E2B\u2D4B",
    "\u2D3D\u2E52\u2E2B\u2D55", "\u2E4B\u2E2B\u2E61\u2E4D\u2D55\u2E2B", "\u2D31\u2E4B\u2D4E\u2E52\u2D4D\u2D4B"
  ];

  const gregorianMonthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  function toTifinaghNumeral(number) {
    const digitsMap = ['\u2D30', '\u2D63', '\u2D49', '\u2D4D', '\u2D3B', '\u2D54', '\u2D4E', '\u2D4F', '\u2D5C', '\u2D5B'];
    return String(number)
      .split('')
      .map(d => digitsMap[parseInt(d)])
      .join('');
  }

  const useTifinagh = req.query.numerals === 'tifinagh';

  const response = {
    day: useTifinagh ? toTifinaghNumeral(gDay) : gDay,
    monthNumber: useTifinagh ? toTifinaghNumeral(gMonth + 1) : gMonth + 1,
    monthNameTifinagh: tifinaghMonths[gMonth],
    gregorianEquivalentMonth: gregorianMonthNames[gMonth],
    year: useTifinagh ? toTifinaghNumeral(amazighYear) : amazighYear,
    timeInMorocco: useTifinagh
      ? timePart
          .split(':')
          .map(n => toTifinaghNumeral(n))
          .join(':')
      : timePart
  };

  res.status(200).json(response);
} 
