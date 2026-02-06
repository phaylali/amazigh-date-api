# Development Notes - Amazigh Date API

## Vercel Deployment Issues & Solutions

### Issue 1: MPEG-2 Transport Stream Download
**Problem**: When visiting the Vercel-deployed site, the browser attempts to download a file (MPEG-2 transport stream) instead of displaying the website.

**Root Cause**: Vercel does not natively support Bun runtime. The initial deployment configuration was trying to run Bun code directly on Vercel's infrastructure, which caused incorrect MIME type detection and file serving behavior.

**Attempted Solutions**:

#### Attempt 1: Basic Vercel Configuration
```json
{
  "buildCommand": "bun install",
  "devCommand": "bun run dev",
  "installCommand": "bun install"
}
```
**Result**: ❌ Still downloading file

#### Attempt 2: Node.js Runtime with Functions
```json
{
  "functions": {
    "api/**/*.ts": {
      "runtime": "nodejs20.x"
    }
  }
}
```
**Result**: ❌ Build error: "Function Runtimes must have a valid version"

#### Attempt 3: Rewrites Configuration
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/api"
    }
  ]
}
```
**Result**: ❌ Still downloading file

### Current Status
The application works perfectly locally with Bun but has compatibility issues with Vercel's serverless platform.

### Potential Solutions to Explore

#### Option 1: Use Vercel's Edge Runtime
Hono has excellent support for Vercel Edge Runtime:
```typescript
// api/index.ts
export const config = {
  runtime: 'edge',
};

import app from '../index';
export default app.fetch;
```

#### Option 2: Proper Serverless Function Setup
Create individual serverless functions for each route:
```
api/
  index.ts       -> handles /
  time.ts        -> handles /api/time
  times.ts       -> handles /api/times
```

#### Option 3: Use @vercel/node Adapter
Install and configure the official Vercel Node adapter:
```bash
npm install @vercel/node
```

#### Option 4: Deploy to Bun-Compatible Platform
Consider alternative platforms that natively support Bun:
- **Railway**: Full Bun support
- **Fly.io**: Supports Bun via Docker
- **Render**: Supports Bun natively
- **Cloudflare Workers**: Hono works great here

### Technical Details

**Current Stack**:
- Runtime: Bun (local development)
- Framework: Hono v4
- Entry Point: `index.ts`
- Serverless Adapter: `/api/index.ts` (attempted)

**Vercel Constraints**:
- No native Bun support
- Requires Node.js or Edge runtime
- Serverless functions must export proper handlers
- TypeScript compilation happens during build

**File Structure**:
```
/
├── index.ts              # Main Hono app
├── api/
│   └── index.ts         # Vercel serverless entry point (attempted)
├── ui/
│   └── omniversify.ts   # UI components
├── *.ts                 # Calendar data files
└── vercel.json          # Vercel configuration
```

### Recommended Next Steps

1. **Try Edge Runtime** (Fastest to implement):
   - Update `/api/index.ts` to use Edge runtime config
   - Export `app.fetch` directly
   - This should work with Hono's design

2. **If Edge Runtime fails, switch platforms**:
   - Railway deployment is straightforward with Bun
   - Cloudflare Workers is another excellent option for Hono

3. **Alternative: Convert to Node.js**:
   - Change `package.json` to use Node.js
   - Update imports to use Node-compatible modules
   - Lose Bun's performance benefits but gain Vercel compatibility

### Notes on Content Negotiation
The content negotiation feature (HTML UI vs JSON) works perfectly locally. Need to ensure this continues working on whichever deployment platform is chosen.

### Migration Checklist
- [x] Converted Express to Hono
- [x] Converted JSON data to TypeScript
- [x] Implemented content negotiation
- [x] Created UI components
- [x] Local development working
- [ ] Vercel deployment working
- [ ] Production deployment verified

### References
- [Hono Vercel Deployment Guide](https://hono.dev/getting-started/vercel)
- [Vercel Edge Runtime Docs](https://vercel.com/docs/functions/edge-functions)
- [Hono Cloudflare Workers Guide](https://hono.dev/getting-started/cloudflare-workers)

---

**Last Updated**: 2026-02-06  
**Status**: Investigating Vercel deployment issues
