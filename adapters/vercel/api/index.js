const { handle, noCache } = require('../../../src/handler');
module.exports = (req, res) => {
  Object.entries(noCache).forEach(([k, v]) => res.setHeader(k, v));
  const url = new URL(req.url, 'http://localhost');
  const r = handle(url.pathname, Object.fromEntries(url.searchParams));
  res.statusCode = r.status;
  res.setHeader('content-type', r.type);
  res.end(r.body);
};
