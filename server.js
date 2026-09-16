const http = require('http');
const { handle, noCache } = require('./src/handler');
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const r = handle(url.pathname, Object.fromEntries(url.searchParams));
  Object.entries(noCache).forEach(([k, v]) => res.setHeader(k, v));
  res.writeHead(r.status, { 'content-type': r.type });
  res.end(r.body);
}).listen(PORT, () => console.log('listening on ' + PORT + ' revision=' + (process.env.COSTIQ_REVISION || 'unset')));
