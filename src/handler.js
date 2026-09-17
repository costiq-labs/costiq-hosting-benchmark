// Shared behaviour contract for every packaging variant.
// Contract: / public page, /health JSON with revision and greeting, /fail controlled 500 with marker.
const REVISION = process.env.COSTIQ_REVISION || 'unset';
const GREETING = process.env.COSTIQ_GREETING || 'unset';
const FOOTER = process.env.COSTIQ_FOOTER || 'preview-test';

const noCache = {
  'cache-control': 'no-store, no-cache, must-revalidate',
  'cdn-cache-control': 'no-store',
  'surrogate-control': 'no-store',
};

function page() {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>CostIQ hosting test app</title></head>
<body>
<h1>CostIQ hosting test app</h1>
<p>Revision: <strong>${REVISION}</strong></p>
<p>Environment variable COSTIQ_GREETING resolves to: <strong>${GREETING}</strong></p>
<footer>${FOOTER}</footer>
</body>
</html>`;
}

function handle(pathname, params) {
  if (pathname.endsWith('/health')) {
    return { status: 200, type: 'application/json',
      body: JSON.stringify({ status: 'ok', revision: REVISION, greeting: GREETING, footer: FOOTER }) };
  }
  if (pathname.endsWith('/fail')) {
    const marker = (params && params.marker) || 'no-marker';
    const line = `COSTIQ_DELIBERATE_FAILURE marker=${marker} revision=${REVISION}`;
    console.error(line);
    if (typeof process !== 'undefined' && process.stderr) process.stderr.write(line + '\n');
    return { status: 500, type: 'application/json',
      body: JSON.stringify({ status: 'error', marker, revision: REVISION }) };
  }
  if (pathname === '/' || pathname === '' || pathname === '/api') {
    return { status: 200, type: 'text/html; charset=utf-8', body: page() };
  }
  return { status: 404, type: 'text/plain', body: 'not found' };
}

module.exports = { handle, noCache, REVISION, GREETING, FOOTER };
