const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const { v4: uuid } = require("uuid");

const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const Session = require("./models/Session");

const app = new Koa();

app.use(bodyParser());

// handle error
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log("New Error: ", err);
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.body = err;
  }
});

// create user session
app.use((ctx, next) => {
  ctx.login = async function (user) {
    const token = uuid();
    await Session.create({ token, user, lastVisit: new Date() });
    return token;
  };
  return next();
});

// register routes
app.use(routes.routes()).use(routes.allowedMethods());

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
