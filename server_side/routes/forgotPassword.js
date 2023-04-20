const User = require("../models/User");
const Session = require("../models/Session");
const config = require("config");
const sendEmail = require("../utils.js/sendEmail");

module.exports.forgotPassword = async function forgotPassword(ctx, next) {
  const email = ctx.request.body.email;
  const user = await User.findOne({ email });
  if (!user) ctx.throw(401, "No account with this e-mail");

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
      body: `We've sent password reset instructions. Check your email.`,
      success: true,
      error: false,
    },
  };
};

module.exports.resetPassword = async function resetPassword(ctx, next) {
  const { id, token, password } = ctx.request.body;

  const tokenFromDB = await Session.findOne({ user: id });

  if (!tokenFromDB) ctx.throw(401, "Authentication token invalid");

  if (tokenFromDB.token !== token)
    ctx.throw(401, "Authentication token invalid");

  const user = await User.findOne({ _id: id });
  const isOldPassword = await user.checkPassword(password);
  if (isOldPassword)
    ctx.throw(400, "You entered an Old Password. Generate a New one.");

  await user.setPassword(password);
  await user.save();

  sendEmail(
    user.email,
    "Congratulations! Your password changed.",
    { name: user.displayName },
    "/emailTemplate.js/successResetPassword.handlebars"
  );

  ctx.status = 200;
  ctx.body = {
    message: {
      body: `Congratulations!Password changed.`,
      success: true,
      error: false,
    },
  };
};
