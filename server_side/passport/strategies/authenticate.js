const User = require("../../models/User");

module.exports = async function authenticate(
  strategy,
  email,
  displayName,
  done
) {
  if (!email) {
    return done(
      null,
      false,
      "No account with this email OR your email is private"
    );
  }

  try {
    let user = await User.findOne({ email });

    if (user) {
      return done(null, user);
    }

    user = await User.create({
      email,
      displayName,
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
};
