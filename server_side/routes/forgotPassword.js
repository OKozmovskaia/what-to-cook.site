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
  const link = `${config.get(
    "clientURL"
  )}/password_reset?token=${resetToken}&id=${user._id}`;

  sendEmail(
    user.email,
    "Password Reset",
    { name: user.name, link },
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

module.exports.resetPassword = async function resetPassword(ctx, next) {};
