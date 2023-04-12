const Router = require("koa-router");
const config = require("config");
const axios = require("axios");
const { v4: uuid } = require("uuid");

const mustBeAuthenticated = require("./mustBeAuthenticated");
const passport = require("../passport");
const { oauth, oauthCallback } = require("../passport/oauth");
const { forgotPassword, resetPassword } = require("./forgotPassword");

const User = require("../models/User");
const Session = require("../models/Session");
const Recipe = require("../models/Recipe");
const Product = require("../models/Product");

const router = new Router();

router.use(async (ctx, next) => {
  const header = ctx.request.get("Authorization");
  if (!header) return next();

  const token = header.split(" ")[1];
  if (!token) return next();

  const session = await Session.findOne({ token }).populate("user");
  if (!session) {
    ctx.throw(401, "Authentication token invalid or expired");
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
    id: user.id,
    message: {
      body: "Congratulations! Account successfully created.",
      success: true,
      error: false,
    },
  };
});

router.get("/me", mustBeAuthenticated, async (ctx, next) => {
  const products = await Product.findOne({ user: ctx.user._id });
  const numberOfProducts = products.productList.length;

  ctx.body = {
    email: ctx.user.email,
    username: ctx.user.displayName,
    numberOfProducts,
    numberOfRecipes: ctx.user.recipes.length,
  };
});

router.post("/log-in", async (ctx, next) => {
  await passport.authenticate("local", async (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      ctx.throw(400, info);
    }

    const existSession = await Session.findOne({ user: user._id });
    if (existSession) await existSession.deleteOne();

    const token = await ctx.login(user._id);
    ctx.body = {
      token,
      id: user._id,
      message: {
        body: `Welcome back, ${user.displayName}`,
        success: true,
        error: false,
      },
    };
  })(ctx, next);
});

router.get("/oauth/:provider", oauth);
router.post("/oauth_callback", oauthCallback);

router.post("/forgot_password", mustBeAuthenticated, forgotPassword);
router.post("/reset_password", mustBeAuthenticated, resetPassword);

router.post("/save-recipe", mustBeAuthenticated, async (ctx, next) => {
  const { recipe } = ctx.request.body;
  const isRecipeSaved = await Recipe.findOne({ url: recipe.url });

  if (isRecipeSaved) {
    await User.findOneAndUpdate(
      { _id: ctx.user._id, recipes: { $ne: isRecipeSaved._id } },
      { $push: { recipes: isRecipeSaved._id } }
    );
  } else {
    const newRecipe = new Recipe(recipe);
    await newRecipe.save();

    await User.findByIdAndUpdate(
      { _id: ctx.user._id },
      { $push: { recipes: newRecipe._id } }
    );
  }

  ctx.body = {
    message: {
      body: `Recipe ${recipe.label} is saved successfully`,
      success: true,
      error: false,
    },
  };
});
router.get("/get-recipes", mustBeAuthenticated, async (ctx, next) => {
  const user_id = ctx.user._id;
  const user = await User.findById({ _id: user_id });
  const recipes = await Recipe.find({ _id: { $in: user.recipes } });
  ctx.body = recipes;
});

router.get(
  "/delete-recipe/:recipe_id",
  mustBeAuthenticated,
  async (ctx, next) => {
    const user_id = ctx.user._id;
    const recipe_id = ctx.params.recipe_id;

    const user = await User.findOneAndUpdate(
      { _id: user_id },
      { $pull: { recipes: recipe_id } },
      { new: true }
    );

    const recipes = await Recipe.find({ _id: { $in: user.recipes } });

    ctx.body = {
      recipes,
      message: {
        body: "You removed 1 recipe",
        success: true,
        error: false,
      },
    };
  }
);

router.post("/save-product", mustBeAuthenticated, async (ctx, next) => {
  const { product } = ctx.request.body;
  const user_id = ctx.user._id;

  const hasUserList = await Product.findOne({ user: user_id });

  if (hasUserList) {
    await Product.findOneAndUpdate(
      { user: user_id, "productList.title": { $ne: product.title } },
      { $push: { productList: product } }
    );
  } else {
    const newProduct = new Product({
      user: user_id,
      productList: [product],
    });
    await newProduct.save();
  }

  ctx.body = {
    message: {
      body: `Product ${product.title} is saved successfully`,
      success: true,
      error: false,
    },
  };
});

router.get("/get-product_list", mustBeAuthenticated, async (ctx, next) => {
  const user_id = ctx.user._id;
  const userProduct = await Product.findOne({ user: user_id });
  ctx.body = userProduct;
});

router.post("/update-product", mustBeAuthenticated, async (ctx, next) => {
  const user_id = ctx.user._id;
  const { product } = ctx.request.body;

  const userProduct = await Product.findOneAndUpdate(
    { user: user_id, "productList._id": product._id },
    {
      $set: {
        "productList.$.title": product.title,
        "productList.$.quantity": product.quantity,
        "productList.$.checked": product.checked,
        "productList.$.groupTitle": product.groupTitle,
      },
    },
    { new: true, upsert: true }
  );

  ctx.body = {
    userProduct,
    message: {
      body: `Product ${product.title} is updated successfully`,
      success: true,
      error: false,
    },
  };
});

router.get(
  "/delete-product/:product_id",
  mustBeAuthenticated,
  async (ctx, next) => {
    const product_id = ctx.params.product_id;
    const user_id = ctx.user._id;
    const userProduct = await Product.findOneAndUpdate(
      {
        user: user_id,
      },
      {
        $pull: { productList: { _id: product_id } },
      },
      { new: true }
    );

    ctx.body = {
      userProduct,
      message: {
        body: `Product is deleted`,
        success: true,
        error: false,
      },
    };
  }
);

module.exports = router;
