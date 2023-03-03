module.exports = function mustBeAuthenticated(ctx, next) {
  if (!ctx.user) {
    ctx.throw(401, `User didn't login`);
  }

  return next();
};
