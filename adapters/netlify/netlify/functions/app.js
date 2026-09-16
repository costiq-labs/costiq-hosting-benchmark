const { handle, noCache } = require('../../../../src/handler');
exports.handler = async (event) => {
  const r = handle(event.path || '/', event.queryStringParameters || {});
  return { statusCode: r.status, headers: { ...noCache, 'content-type': r.type }, body: r.body };
};
