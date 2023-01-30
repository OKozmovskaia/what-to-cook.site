const Router = require("koa-router");
const config = require("config");
const axios = require("axios");
const { stringify } = require("qs");
const { v4: uuid } = require("uuid");

const router = new Router();

router.get("/find-recipes", async (ctx) => {
  const queryParams = {
    type: "public",
    q: ctx.params.query,
    ingr: "5-10",
    field: [
      "label",
      "url",
      "image",
      "ingredientLines",
      "totalTime",
      "healthlabels",
      "cuisineType",
      "mealType",
      "dishType",
    ],
    app_key: config.get("edamam.key"),
    app_id: config.get("edamam.id"),
  };

  const fetch = axios.create({
    paramsSerializer: {
      serialize: stringify,
    },
  });

  const response = await fetch.get(`https://api.edamam.com/api/recipes/v2`, {
    params: queryParams,
  });

  const data = response.data;

  const recipes = data.hits.map((item) => ({ id: uuid(), ...item }));

  const chunkRecipes = {
    count: data.count,
    nextChunk: data._links.next,
    recipes,
  };

  ctx.body = chunkRecipes;
});

module.exports = router;
