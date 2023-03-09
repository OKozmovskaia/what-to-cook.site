const { KoaPassport } = require("koa-passport");
const passport = new KoaPassport();

const localStrategy = require("./strategies/local");
const githubStrategy = require("./strategies/github");

passport.use(localStrategy);
passport.use(githubStrategy);

module.exports = passport;
