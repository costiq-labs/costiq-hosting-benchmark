const handler = require('../adapters/vercel/api/index.js');
module.exports = (req, res) => {
  if (req.query && typeof req.query.path === 'string') {
    const q = Object.entries(req.query).filter(([k]) => k !== 'path')
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');
    req.url = '/' + req.query.path + (q ? '?' + q : '');
  }
  return handler(req, res);
};
