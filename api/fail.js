const { handle, noCache } = require('../src/handler');
module.exports = (req, res) => {
  Object.entries(noCache).forEach(([k, v]) => res.setHeader(k, v));
  const marker = (req.query && req.query.marker) || 'no-marker';
  const r = handle('/fail', { marker });
  res.statusCode = r.status;
  res.setHeader('content-type', r.type);
  res.end(r.body);
};
