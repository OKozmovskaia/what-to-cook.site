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
    if (err.code === 11000) {
      ctx.response.status = 401;
      ctx.body = {
        message: {
          body: `An account using this creadentials: ${Object.values(
            err.keyValue
          )}  already exists`,
          error: true,
        },
      };
    } else {
      ctx.response.status = err.statusCode || err.status || 500;
      ctx.body = {
        message: {
          body: err.message,
          error: true,
        },
      };
    }
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
