module.exports = (req, res) => {
  res.statusCode = 404;
  res.setHeader('content-type', 'text/plain');
  res.end('not found');
};
