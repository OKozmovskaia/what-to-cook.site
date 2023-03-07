const Router = require("koa-router");
const config = require("config");
const axios = require("axios");
const { v4: uuid } = require("uuid");
const User = require("../models/User");
const Session = require("../models/Session");

const router = new Router();

router.use(async (ctx, next) => {
  const header = ctx.request.get("Authorization");
  if (!header) return next();

  const token = header.split(" ")[1];
  if (!token) return next();

  const session = await Session.findOne({ token }).populate("user");
  if (!session) {
    ctx.throw(401, "Invalid authentication token");
  }
  session.lastVisit = new Date();
  await session.save();

  ctx.user = session.user;
  return next();
});

router.get("/find-recipes", async (ctx) => {
  const q = ctx.request.query.q;

  const queryParams = {
    type: "public",
    q,
    ingr: "5-10",
    field: [
      "label",
      "url",
      "image",
      "ingredientLines",
      "totalTime",
      "cuisineType",
      "mealType",
      "dishType",
    ],
    app_key: config.get("edamam.key"),
    app_id: config.get("edamam.id"),
  };

  const response = await axios.get(`https://api.edamam.com/api/recipes/v2`, {
    params: queryParams,
    paramsSerializer: {
      indexes: null,
    },
  });

  const data = response.data;

  const recipes = data.hits.map((item) => ({ id: uuid(), ...item }));

  const chunkRecipes = {
    searchQuery: q,
    nextChunk: data._links.next,
    recipes,
    updateCount: recipes.length,
  };

  ctx.body = chunkRecipes;
});

router.post("/load-more", async (ctx) => {
  const link = ctx.request.body.href;
  const response = await axios.get(link);

  const data = response.data;

  const recipes = data.hits.map((item) => ({ id: uuid(), ...item }));

  const chunkRecipes = {
    nextChunk: data._links.next,
    recipes,
    updateCount: recipes.length,
  };

  ctx.body = chunkRecipes;
});

router.post("/sign-up", async (ctx) => {
  const { displayName, email, password } = ctx.request.body;
  const user = new User({ displayName, email, password });
  await user.setPassword(password);
  await user.save();

  const token = await ctx.login(user._id);
  ctx.body = {
    token,
    message: {
      body: "Condratulations! Account successfully creted.",
      success: true,
    },
  };
});

router.get("/me", (ctx, next) => {
  ctx.body = {
    email: ctx.user.email,
    username: ctx.user.displayName,
  };
});

module.exports = router;
