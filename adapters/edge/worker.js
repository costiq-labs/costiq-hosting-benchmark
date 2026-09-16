// Edge adapter for the CostIQ hosting benchmark, Cloudflare Workers style ES module.
// Same behaviour contract: / public page, /health JSON, /fail controlled 500 with marker.
// Edge results stay in the PARTIALLY_COMPARABLE / NOT_DIRECTLY_COMPARABLE class and are
// never merged into the long-running app host comparison.
export default {
  async fetch(request, env) {
    const REVISION = (env && env.COSTIQ_REVISION) || 'unset';
    const GREETING = (env && env.COSTIQ_GREETING) || 'unset';
    const noStore = {
      'cache-control': 'no-store, no-cache, must-revalidate',
      'cdn-cache-control': 'no-store',
      'surrogate-control': 'no-store',
    };
    const url = new URL(request.url);
    const path = url.pathname;

    if (path.endsWith('/health')) {
      return new Response(JSON.stringify({ status: 'ok', revision: REVISION, greeting: GREETING }), {
        status: 200, headers: { ...noStore, 'content-type': 'application/json' },
      });
    }

    if (path.endsWith('/fail')) {
      const marker = url.searchParams.get('marker') || 'no-marker';
      console.error(`COSTIQ_DELIBERATE_FAILURE marker=${marker} revision=${REVISION}`);
      return new Response(JSON.stringify({ status: 'error', marker, revision: REVISION }), {
        status: 500, headers: { ...noStore, 'content-type': 'application/json' },
      });
    }

    if (path === '/' || path === '') {
      const body = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>CostIQ hosting test app</title></head>
<body><h1>CostIQ hosting test app</h1>
<p>Revision: <strong>${REVISION}</strong></p>
<p>Environment variable COSTIQ_GREETING resolves to: <strong>${GREETING}</strong></p>
</body></html>`;
      return new Response(body, { status: 200, headers: { ...noStore, 'content-type': 'text/html; charset=utf-8' } });
    }

    return new Response('not found', { status: 404, headers: { ...noStore, 'content-type': 'text/plain' } });
  },
};
