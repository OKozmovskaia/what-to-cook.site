const User = require("../models/User");
const Session = require("../models/Session");
const config = require("config");
const sendEmail = require("../utils.js/sendEmail");

module.exports.forgotPassword = async function forgotPassword(ctx, next) {
  const email = ctx.request.body.email;
  const user = await User.findOne({ email });
  if (!user) ctx.throw(401, "User with this email doesn't exist");

  const prevSession = await Session.findOne({ user: user._id });
  if (prevSession) await prevSession.deleteOne();

  const resetToken = await ctx.login(user._id);
  const link = `${config.get("clientURL")}/password_reset/${resetToken}/${
    user._id
  }`;

  sendEmail(
    user.email,
    "Password Reset",
    { name: user.displayName, link },
    "/emailTemplate.js/requestResetPassword.handlebars"
  );

  ctx.status = 200;
  ctx.body = {
    message: {
      body: `Check your email. We've sent password reset instructions.`,
      success: true,
      error: false,
    },
  };
};

module.exports.resetPassword = async function resetPassword(ctx, next) {
  const { id, token, password } = ctx.request.body;

  const tokenFromDB = await Session.findOne({ user: id });

  if (!tokenFromDB) ctx.throw(401, "Authentication token invalid or expired");

  if (tokenFromDB.token !== token)
    ctx.throw(401, "Authentication token invalid or expired");

  const user = await User.findOne({ _id: id });
  await user.setPassword(password);
  await user.save();

  sendEmail(
    user.email,
    "Password Reset Successfully",
    { name: user.displayName },
    "/emailTemplate.js/successResetPassword.handlebars"
  );

  await tokenFromDB.deleteOne();

  ctx.status = 200;
  ctx.body = {
    message: {
      body: `Congratulations!Password Reset Successfully. Go to login page and enter your credentials`,
      success: true,
      error: false,
    },
  };
};
