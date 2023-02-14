const Router = require("koa-router");
const config = require("config");
const axios = require("axios");
const { v4: uuid } = require("uuid");

const router = new Router();

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
  };

  ctx.body = chunkRecipes;
});

module.exports = router;
