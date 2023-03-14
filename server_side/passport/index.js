const { KoaPassport } = require("koa-passport");
const passport = new KoaPassport();
const HttpsProxyAgent = require("https-proxy-agent");

const localStrategy = require("./strategies/local");
const githubStrategy = require("./strategies/github");
const facebookStrategy = require("./strategies/facebook");
const googleStrategy = require("./strategies/google");

if (process.env["https_proxy"]) {
  const httpsProxyAgent = new HttpsProxyAgent(process.env["https_proxy"]);
  googleStrategy._oauth2.setAgent(httpsProxyAgent);
}

passport.use(localStrategy);
passport.use(githubStrategy);
passport.use(facebookStrategy);
passport.use(googleStrategy);

module.exports = passport;
