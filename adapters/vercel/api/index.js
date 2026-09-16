// Vercel adapter probe for the CostIQ hosting benchmark.
// Temporary diagnostic: echo what the platform passes to the function.
module.exports = (req, res) => {
  res.statusCode = 200;
  res.setHeader('content-type', 'application/json');
  res.setHeader('cache-control', 'no-store, no-cache, must-revalidate');
  res.end(JSON.stringify({
    url: req.url,
    query: req.query || null,
    headers: {
      'x-forwarded-uri': req.headers['x-forwarded-uri'] || null,
      'x-vercel-original-url': req.headers['x-vercel-original-url'] || null,
      'x-original-url': req.headers['x-original-url'] || null,
      'x-matched-path': req.headers['x-matched-path'] || null,
      'x-forwarded-path': req.headers['x-forwarded-path'] || null,
      'x-now-route-matches': req.headers['x-now-route-matches'] || null,
      'x-vercel-sc-headers': req.headers['x-vercel-sc-headers'] || null
    }
  }));
};
