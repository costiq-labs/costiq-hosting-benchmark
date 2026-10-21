const { handle, noCache } = require('../src/handler');
module.exports = (req, res) => {
  Object.entries(noCache).forEach(([k, v]) => res.setHeader(k, v));
  const r = handle('/health', {});
  res.statusCode = r.status;
  res.setHeader('content-type', r.type);
  res.end(r.body);
};
