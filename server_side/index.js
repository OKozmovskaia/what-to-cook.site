const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const routes = require("./routes");
const PORT = process.env.PORT || 3001;

const app = new Koa();

app.use(bodyParser());

// handle error
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log("New Error: ", err);
    err.status = err.statusCode || err.status || 500;
    ctx.body = err.message;
  }
});

// register routes
app.use(routes.routes()).use(routes.allowedMethods());

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
