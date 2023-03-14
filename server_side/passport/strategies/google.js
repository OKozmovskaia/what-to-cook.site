// https://console.cloud.google.com/apis/credentials
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const config = require("config");
const get = require("lodash/get");
const authenticate = require("./authenticate");

module.exports = new GoogleStrategy(
  {
    clientID: config.get("providers.google.app_id"),
    clientSecret: config.get("providers.google.app_secret"),
    callbackURL: config.get("providers.google.callback_uri"),
    session: false,
  },
  function (accessToken, refreshToken, profile, done) {
    authenticate(
      "Google",
      get(profile, "emails[0].value"),
      profile.displayName,
      done
    );
  }
);
