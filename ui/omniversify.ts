/**
 * Omniversify UI Library
 * A reusable design system for Hono/Bun applications
 * Based on the Omniversify Design System & Style Guide
 */

// Design Tokens
export const OmniversifyTheme = {
    colors: {
        gold: '#C2B067',
        goldMuted: '#C2B067B3',
        goldLow: 'rgba(194, 176, 103, 0.1)',
        black: '#000000',
        white: '#FFFFFF',
        whiteMuted: '#FFFFFFB3',
        surface: '#0a0a0a',
    },
    fonts: {
        heading: "'Cinzel', serif",
        body: "'Source Sans 3', sans-serif",
    },
    spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
    },
    borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
    },
};

// CSS Generator
export function generateStyles(): string {
    const theme = OmniversifyTheme;
    return `
        :root {
            --gold: ${theme.colors.gold};
            --gold-muted: ${theme.colors.goldMuted};
            --gold-low: ${theme.colors.goldLow};
            --black: ${theme.colors.black};
            --white: ${theme.colors.white};
            --white-muted: ${theme.colors.whiteMuted};
            --surface: ${theme.colors.surface};
        }
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        body {
            font-family: ${theme.fonts.body};
            background-color: var(--black);
            color: var(--white);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        h1, h2, h3, .heading {
            font-family: ${theme.fonts.heading};
            color: var(--gold);
            text-transform: uppercase;
            letter-spacing: 1.2px;
        }
        header {
            padding: ${theme.spacing.lg} ${theme.spacing.sm};
            text-align: center;
            border-bottom: 1px solid var(--gold-muted);
            margin-bottom: ${theme.spacing.lg};
            background: linear-gradient(to right, transparent, var(--gold-muted), var(--gold-muted), transparent);
            background-size: 100% 1px;
            background-repeat: no-repeat;
            background-position: bottom;
        }
        .container {
            max-width: 1024px;
            margin: 0 auto;
            padding: 0 ${theme.spacing.sm};
            width: 100%;
            flex: 1;
        }
        .file-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: ${theme.spacing.md};
            padding: ${theme.spacing.sm} 0;
        }
        .file-card {
            background: var(--black);
            border: 1px solid var(--gold);
            border-radius: ${theme.borderRadius.md};
            padding: ${theme.spacing.md};
            text-align: center;
            text-decoration: none;
            color: var(--white);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .file-card:hover {
            background: var(--gold-low);
            transform: translateY(-4px);
            box-shadow: 0 4px 20px rgba(194, 176, 103, 0.2);
        }
        .file-icon {
            font-size: 3rem;
            margin-bottom: ${theme.spacing.sm};
            color: var(--gold);
        }
        .file-name {
            font-size: 0.9rem;
            word-break: break-all;
            font-weight: 600;
        }
        .viewer-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: ${theme.spacing.lg};
            padding: ${theme.spacing.lg} 0;
        }
        .viewer-actions {
            display: flex;
            gap: ${theme.spacing.sm};
        }
        .btn {
            background: transparent;
            color: var(--gold);
            border: 1px solid var(--gold);
            padding: 0.8rem 1.5rem;
            font-family: ${theme.fonts.heading};
            font-size: 0.8rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s;
            text-decoration: none;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-radius: ${theme.borderRadius.sm};
        }
        .btn:hover {
            background: var(--gold);
            color: var(--black);
        }
        .media-viewer {
            width: 100%;
            max-width: 800px;
            border: 1px solid var(--gold-muted);
            border-radius: ${theme.borderRadius.md};
            background: #050505;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        iframe, embed {
            width: 100%;
            height: 80vh;
            border: none;
            border-radius: ${theme.borderRadius.md};
        }
        img {
            max-width: 100%;
            height: auto;
            display: block;
            border-radius: ${theme.borderRadius.md};
        }
        pre {
            width: 100%;
            padding: ${theme.spacing.lg};
            background: #050505;
            color: var(--white-muted);
            white-space: pre-wrap;
            word-wrap: break-word;
            font-size: 0.9rem;
            border-radius: ${theme.borderRadius.md};
            border: 1px solid var(--gold-muted);
            max-height: 70vh;
            overflow-y: auto;
        }
        .breadcrumb {
            margin-bottom: ${theme.spacing.lg};
            font-size: 0.8rem;
            color: var(--gold-muted);
        }
        .breadcrumb a {
            color: var(--gold);
            text-decoration: none;
        }
        .fallback-view {
            text-align: center;
            padding: 4rem ${theme.spacing.lg};
            border: 1px dashed var(--gold-muted);
            border-radius: ${theme.borderRadius.md};
            width: 100%;
        }
    `;
}

// Component: Page Layout
export interface LayoutOptions {
    title: string;
    content: string;
    appName?: string;
}

export function createLayout(options: LayoutOptions): string {
    const { title, content, appName = 'Amazigh Date API' } = options;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - ${appName}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        ${generateStyles()}
    </style>
</head>
<body>
    <header>
        <h1>${appName}</h1>
    </header>
    <main class="container">
        ${content}
    </main>
    <footer style="padding: 2rem; text-align: center; font-size: 0.8rem; color: var(--gold-muted); opacity: 0.5;">
        &copy; 2026 OMNIVERSIFY DESIGN SYSTEM
    </footer>
    <script>
        function printFile() {
             window.print();
        }
    </script>
</body>
</html>
    `;
}

// Component: Breadcrumb
export function createBreadcrumb(path: string[]): string {
    return `<div class="breadcrumb">${path.join(' / ')}</div>`;
}

// Component: File Card
export interface FileCardOptions {
    name: string;
    link: string;
    icon?: string;
    isDirectory?: boolean;
}

export function createFileCard(options: FileCardOptions): string {
    const { name, link, icon, isDirectory = false } = options;
    const displayIcon = icon || (isDirectory ? '📁' : '📄');

    return `
        <a href="${link}" class="file-card">
            <div class="file-icon">${displayIcon}</div>
            <div class="file-name">${name}</div>
        </a>
    `;
}

// Component: File Grid
export function createFileGrid(cards: string[]): string {
    return `<div class="file-grid">${cards.join('')}</div>`;
}

// Component: Button
export interface ButtonOptions {
    text: string;
    href?: string;
    onClick?: string;
    download?: string;
}

export function createButton(options: ButtonOptions): string {
    const { text, href, onClick, download } = options;

    if (href) {
        const downloadAttr = download ? `download="${download}"` : '';
        return `<a href="${href}" ${downloadAttr} class="btn">${text}</a>`;
    } else if (onClick) {
        return `<button onclick="${onClick}" class="btn">${text}</button>`;
    }

    return `<button class="btn">${text}</button>`;
}

// Component: Action Bar
export function createActionBar(buttons: string[]): string {
    return `<div class="viewer-actions">${buttons.join('')}</div>`;
}

// Component: Viewer Container
export function createViewerContainer(content: string): string {
    return `<div class="viewer-container">${content}</div>`;
}

// Additional Helper: API Route Card
export interface RouteCardOptions {
    path: string;
    description: string;
    exampleUrl: string;
    method?: string;
    queryParams?: string[];
}

export function createRouteCard(options: RouteCardOptions): string {
    const { path, description, exampleUrl, method = 'GET', queryParams = [] } = options;

    // Generate params tags if any
    const paramsHtml = queryParams.length > 0
        ? `<div style="margin-top: 0.5rem;">${queryParams.map(p => `<span style="display:inline-block; font-size:0.75rem; background:var(--gold-low); color:var(--gold); padding:0.2rem 0.5rem; border-radius:4px; margin-right:0.5rem; margin-bottom:0.3rem; border:1px solid var(--gold-muted);">?${p}</span>`).join('')}</div>`
        : '';

    return `
        <div class="file-card" style="align-items: flex-start; text-align: left; width: 100%;">
            <div style="display:flex; justify-content:space-between; width:100%; align-items:center; margin-bottom: 0.5rem;">
                <div class="file-name" style="font-size: 1.1rem; color: var(--gold);">${method} ${path}</div>
                <a href="${exampleUrl}" target="_blank" class="btn" style="padding: 0.4rem 0.8rem; font-size: 0.7rem;">Try It</a>
            </div>
            <div style="color: var(--white-muted); font-size: 0.9rem; margin-bottom: 0.5rem;">
                ${description}
            </div>
            ${paramsHtml}
        </div>
    `;
}

// Additional Helper: Date Display Card
export interface DateData {
    calendar: string;
    day: number | string;
    monthNumber: number | string;
    monthNameLatin: string;
    monthNameTifinagh: string;
    monthNameArabic: string;
    year: number | string;
    timeInMorocco: string;
}

export function createDateCard(dates: { amazigh?: DateData, gregorian?: DateData, islamic?: DateData } | DateData, jsonUrl: string = '?format=json'): string {
    // Helper to render a single calendar block
    const renderBlock = (data: DateData, title: string) => `
        <div style="flex: 1; padding: 1rem; min-width: 250px; border: 1px solid var(--gold-low); border-radius: 8px; background: rgba(0,0,0,0.3);">
            <h3 style="font-size: 0.9rem; margin-bottom: 0.5rem; color: var(--gold-muted); text-transform: uppercase; letter-spacing: 1px;">${title}</h3>
            <div style="font-size: 2.5rem; color: var(--gold); font-family: 'Cinzel', serif; margin-bottom: 0.25rem;">
                ${data.day}
            </div>
            <div style="font-size: 1.2rem; color: var(--white); margin-bottom: 0.25rem;">
                ${data.monthNameLatin}
            </div>
            <div style="font-size: 1rem; color: var(--white-muted); margin-bottom: 1rem; font-family: 'Noto Sans Tifinagh', sans-serif;">
                ${data.monthNameTifinagh} / ${data.monthNameArabic}
            </div>
            <div style="font-size: 1.5rem; color: var(--gold); font-weight: bold;">
                ${data.year}
            </div>
        </div>
    `;

    // Determine if we have one date or multiple
    let content = '';

    // Check if it's a single date object (has 'calendar' prop) or a composite object
    if ('calendar' in dates) {
        // Single date
        content = renderBlock(dates as DateData, (dates as DateData).calendar);
    } else {
        // Composite object
        const parts = [];
        if (dates.amazigh) parts.push(renderBlock(dates.amazigh, 'Amazigh'));
        if (dates.gregorian) parts.push(renderBlock(dates.gregorian, 'Gregorian'));
        if (dates.islamic) parts.push(renderBlock(dates.islamic, 'Islamic'));
        content = parts.join('');
    }

    const time = 'calendar' in dates ? (dates as DateData).timeInMorocco : (dates.amazigh?.timeInMorocco || '');

    return `
        <div style="background: var(--surface); border: 1px solid var(--gold); border-radius: 12px; padding: 2rem; margin-bottom: 2rem; text-align: center;">
            <div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; margin-bottom: 2rem;">
                ${content}
            </div>
            <div style="border-top: 1px solid var(--gold-low); padding-top: 1rem; color: var(--gold); font-size: 1.1rem; letter-spacing: 2px;">
                TIME IN MOROCCO: ${time}
            </div>
            <a href="${jsonUrl}" style="display: inline-block; margin-top: 1.5rem; color: var(--gold-muted); font-size: 0.8rem; text-decoration: none; border-bottom: 1px dotted var(--gold-muted);">
                View Raw JSON
            </a>
        </div>
    `;
}
