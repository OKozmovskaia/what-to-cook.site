const passport = require("./index");
const config = require("config");

module.exports.oauth = async function oauth(ctx, next) {
  const provider = ctx.params.provider;

  await passport.authenticate(provider, {
    scope: config.get(`providers.${provider}.scope`),
  })(ctx, next);

  ctx.status = 200;
  ctx.body = { status: "ok", location: ctx.response.get("location") };
  ctx.response.remove("location");
};

module.exports.oauthCallback = async function oauthCallback(ctx, next) {
  const provider = ctx.request.body.provider;

  await passport.authenticate(provider, async (err, user, info) => {
    if (err) throw err;

    if (!user) {
      ctx.response.status = 400;
      ctx.body = {
        message: {
          body: info,
          error: true,
          success: false,
        },
      };
      return;
    }

    const token = await ctx.login(user._id);

    ctx.body = {
      token,
      message: {
        body: `Welcome, ${user.displayName}`,
        success: true,
        error: false,
      },
    };
  })(ctx, next);
};
