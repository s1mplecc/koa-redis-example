function extractUserIdFromCtx(ctx) {
  return ctx.request.header.userid
}

module.exports = extractUserIdFromCtx
