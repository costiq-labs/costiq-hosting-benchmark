// Vercel adapter for the CostIQ hosting benchmark (kept in sync with root api/index.js).
const { handle, noCache } = require('../../../src/handler');
module.exports = (req, res) => {
  Object.entries(noCache).forEach(([k, v]) => res.setHeader(k, v));
  const raw = (req.query && req.query.__path) ? String(req.query.__path) : req.url;
  const url = new URL(raw, 'http://localhost');
  const r = handle(url.pathname, Object.fromEntries(url.searchParams));
  res.statusCode = r.status;
  res.setHeader('content-type', r.type);
  res.end(r.body);
};
