import { Hono, Context } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { cors } from 'hono/cors';
import { createLayout, createViewerContainer, createRouteCard, createDateCard, DateData } from './ui/omniversify';

// Import data from TS files
import { amazighCalendar } from './amazighCalendar';
import { gregorianCalendar } from './gregorianCalendar';
import { islamicCalendar } from './islamicCalendar';

const app = new Hono();

// Enable CORS
app.use('/*', cors());

// Serve static files
app.use('/favicon.ico', serveStatic({ path: './public/favicon.svg' }));
app.use('/public/*', serveStatic({ root: './' }));

// --- Type Definitions ---
// Re-export or redefine if strictly needed, but imported types are better
interface CalendarMonth {
    order: number;
    latin: string;
    tifinagh: string;
    arabic: string;
}

interface DateResponse {
    calendar: string;
    day: number | string;
    monthNumber: number | string;
    monthNameLatin: string;
    monthNameTifinagh: string;
    monthNameArabic: string;
    year: number | string;
    timeInMorocco: string;
}

// --- Helper Functions ---

function toTifinaghNumeral(number: number | string): string {
    const digitsMap = ['\u2D30', '\u2D63', '\u2D49', '\u2D4D', '\u2D3B', '\u2D54', '\u2D4E', '\u2D4F', '\u2D5C', '\u2D5B'];
    return String(number)
        .split('')
        .map(d => {
            const parsed = parseInt(d);
            return isNaN(parsed) ? d : digitsMap[parsed];
        })
        .join('');
}

function toTifinaghTime(timeStr: string): string {
    return timeStr.split(':').map(n => toTifinaghNumeral(n)).join(':');
}

// Helper: Content Negotiation
function shouldReturnHtml(c: Context): boolean {
    const format = c.req.query('format');
    const jsonParam = c.req.query('json');
    const htmlParam = c.req.query('html');

    // 1. Query Params Override Everything
    if (format === 'json' || jsonParam === 'true') return false;
    if (format === 'html' || htmlParam === 'true') return true;

    // 2. Accept Header Logic
    // If client explicitly accepts html (like a browser), give html.
    // If not (like curl or API client default), give json.
    const accept = c.req.header('Accept') || '';
    if (accept.includes('text/html')) {
        return true;
    }

    return false;
}

async function getAmazighDate(date: Date, useTifinagh: boolean, calendar: string): Promise<DateResponse> {
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
    const timePart = dateParts[1] || '';

    let day: number | string, month: number | string, year: number | string;
    const gYear = date.getFullYear();

    if (calendar === 'amazigh') {
        const julianDate = new Date(date);
        julianDate.setDate(date.getDate() - 13);

        day = julianDate.getDate();
        month = julianDate.getMonth(); // 0-indexed
        year = gYear + 950;

        // @ts-ignore - TS might complain about indexing generic array const, but it's safe
        const monthData = amazighCalendar[month] || { latin: 'Unknown', tifinagh: '', arabic: '' };

        return {
            calendar: 'amazigh',
            day: useTifinagh ? toTifinaghNumeral(day) : day,
            monthNumber: useTifinagh ? toTifinaghNumeral(month + 1) : month + 1,
            monthNameLatin: monthData.latin,
            monthNameTifinagh: monthData.tifinagh,
            monthNameArabic: monthData.arabic,
            year: useTifinagh ? toTifinaghNumeral(year) : year,
            timeInMorocco: useTifinagh ? toTifinaghTime(timePart) : timePart
        };

    } else if (calendar === 'gregorian') {
        day = date.getDate();
        month = date.getMonth();
        year = gYear;

        // @ts-ignore
        const monthData = gregorianCalendar[month] || { latin: 'Unknown', tifinagh: '', arabic: '' };

        return {
            calendar: 'gregorian',
            day: useTifinagh ? toTifinaghNumeral(day) : day,
            monthNumber: useTifinagh ? toTifinaghNumeral(month + 1) : month + 1,
            monthNameLatin: monthData.latin,
            monthNameTifinagh: monthData.tifinagh,
            monthNameArabic: monthData.arabic,
            year: useTifinagh ? toTifinaghNumeral(year) : year,
            timeInMorocco: useTifinagh ? toTifinaghTime(timePart) : timePart
        };

    } else if (calendar === 'islamic') {
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const y = date.getFullYear();
        const formattedDate = `${d}-${m}-${y}`;

        const apiUrl = `https://api.aladhan.com/v1/timingsByCity/${formattedDate}?city=Casablanca&country=Morocco&method=2`;

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
            const response = await fetch(apiUrl, { signal: controller.signal });
            clearTimeout(timeoutId);
            if (!response.ok) {
                throw new Error('Failed to fetch Islamic date');
            }
            const data = await response.json();
            const hijriDate = data.data.date.hijri.date; // "DD-MM-YYYY"
            const [islamicDayStr, islamicMonthStr, islamicYearStr] = hijriDate.split('-');

            const islamicMonthIndex = parseInt(islamicMonthStr) - 1;
            // @ts-ignore
            const monthData = islamicCalendar[islamicMonthIndex] || { latin: 'Unknown', tifinagh: '', arabic: '' };

            const iDay = parseInt(islamicDayStr);
            const iMonth = parseInt(islamicMonthStr);
            const iYear = parseInt(islamicYearStr);

            return {
                calendar: 'islamic',
                day: useTifinagh ? toTifinaghNumeral(iDay) : iDay,
                monthNumber: useTifinagh ? toTifinaghNumeral(iMonth) : iMonth,
                monthNameLatin: monthData.latin,
                monthNameTifinagh: monthData.tifinagh,
                monthNameArabic: monthData.arabic,
                year: useTifinagh ? toTifinaghNumeral(iYear) : iYear,
                timeInMorocco: useTifinagh ? toTifinaghTime(timePart) : timePart
            };
        } catch (e) {
            console.error('Error fetching Islamic date:', e);
            throw e;
        }
    }

    throw new Error('Invalid calendar type');
}

// --- Routes ---

app.get('/', (c) => {
    const routes = [
        {
            path: '/api/time',
            description: 'Get the current date. Returns HTML for browsers, JSON for API clients.',
            exampleUrl: '/api/time',
            queryParams: ['calendar', 'numerals', 'format=json']
        },
        {
            path: '/api/times',
            description: 'Get future dates. Returns HTML for browsers, JSON for API clients.',
            exampleUrl: '/api/times?days=5',
            queryParams: ['days', 'format=json']
        }
    ];

    const cardsHtml = routes.map(r => createRouteCard(r)).join('');
    const content = `
    <div style="text-align:center; margin-bottom: 2rem;">
      <h2 style="color:var(--gold); margin-bottom:1rem;">API Documentation</h2>
      <p style="color:var(--white-muted);">Automated Content Negotiation: Add <code style="color:var(--gold); background:rgba(255,255,255,0.1); padding:2px 4px; border-radius:4px;">?format=json</code> to force JSON response.</p>
    </div>
    <div class="file-grid" style="grid-template-columns: 1fr;">
      ${cardsHtml}
    </div>
  `;

    const html = createLayout({
        title: 'Documentation',
        appName: 'Amazigh Date API',
        content: createViewerContainer(content)
    });

    return c.html(html);
});

app.get('/api/time', async (c) => {
    const useTifinagh = c.req.query('numerals') === 'tifinagh';
    const calendar = c.req.query('calendar');
    const returnHtml = shouldReturnHtml(c);

    try {
        let result;
        if (calendar) {
            result = await getAmazighDate(new Date(), useTifinagh, calendar);
        } else {
            const [amazigh, gregorian, islamic] = await Promise.all([
                getAmazighDate(new Date(), useTifinagh, 'amazigh'),
                getAmazighDate(new Date(), useTifinagh, 'gregorian'),
                getAmazighDate(new Date(), useTifinagh, 'islamic')
            ]);
            result = { amazigh, gregorian, islamic };
        }

        if (returnHtml) {
            // Render UI
            const url = new URL(c.req.url, `http://${c.req.header('host') || 'localhost'}`);
            url.searchParams.set('format', 'json');

            const html = createLayout({
                title: 'Current Time',
                appName: 'Amazigh Date API',
                // @ts-ignore: simplified check
                content: createDateCard(result as any, url.toString())
            });
            return c.html(html);
        }

        // Default JSON
        return c.json(result);

    } catch (error) {
        if (returnHtml) {
            return c.html('<h1>Error fetching date</h1>', 500);
        }
        return c.json({ error: 'Failed to fetch date' }, 500);
    }
});

app.get('/api/times', async (c) => {
    const useTifinagh = c.req.query('numerals') === 'tifinagh';
    const calendar = c.req.query('calendar');
    const returnHtml = shouldReturnHtml(c);

    let days = parseInt(c.req.query('days') || '1');

    if (isNaN(days) || days < 1) days = 1;
    if (days > 30) days = 30;

    const dates = [];
    try {
        for (let i = 0; i < days; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);

            if (calendar) {
                dates.push(await getAmazighDate(date, useTifinagh, calendar));
            } else {
                const [amazigh, gregorian, islamic] = await Promise.all([
                    getAmazighDate(date, useTifinagh, 'amazigh'),
                    getAmazighDate(date, useTifinagh, 'gregorian'),
                    getAmazighDate(date, useTifinagh, 'islamic')
                ]);
                dates.push({ amazigh, gregorian, islamic });
            }
        }

        if (returnHtml) {
            // Loop render for multiple days
            const url = new URL(c.req.url);
            url.searchParams.set('format', 'json');
            const jsonUrl = url.toString();

            const content = dates.map(d => createDateCard(d as any, jsonUrl)).join('');
            const html = createLayout({
                title: `Next ${days} Days`,
                appName: 'Amazigh Date API',
                content: createViewerContainer(content)
            });
            return c.html(html);
        }

        return c.json(dates);
    } catch (error) {
        if (returnHtml) {
            return c.html('<h1>Error fetching dates</h1>', 500);
        }
        return c.json({ error: 'Failed to fetch dates' }, 500);
    }
});

export default app;
