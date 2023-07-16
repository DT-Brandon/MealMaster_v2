const router = require("express").Router();
const Recipe = require("../models/Recipe");
const User = require("../models/User");

//create a recipe

router.post("/add", async (req, res) => {
  const newRecipe = new Recipe(req.body);
  try {
    const savedRecipe = await newRecipe.save();
    res.status(200).json(savedRecipe);
  } catch (err) {
    res.status(500).json("an error from our side Occured please contact us if error persist");
    console.log(err)
  }
});
//update a recipe

router.put("/update/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe?.userId === req.body.userId) {
      await recipe.updateOne({ $set: req.body });
      res.status(200).json("the recipe has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json("an error from our side Occured please contact us if error persist");
  }
});

//delete a recipe

router.delete("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe.userId === req.body.userId) {
      await recipe.deleteOne();
      res.status(200).json("the recipe has been deleted");
    } else {
      res.status(403).json("you can delete only your recipe");
    }
  } catch (err) {
    res.status(500).json("an error from our side Occured please contact us if error persist");
  }
});

//like / unlike a recipe

router.put("/:id/like", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe.likes.includes(req.body.userId)) {
      if (recipe.dislikes.includes(req.body.userId)) {
        await recipe.updateOne({ $pull: { dislikes: req.body.userId } });
      }
      await recipe.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The recipe has been liked");
    } else {
      await recipe.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The recipe has been unliked");
    }
  } catch (err) {
    res.status(500).json("an error from our side Occured please contact us if error persist");
  }
});

//dislike / undislike a recipe

router.put("/:id/dislike", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe.dislikes.includes(req.body.userId)) {
      if (recipe.likes.includes(req.body.userId)) {
        await recipe.updateOne({ $pull: { likes: req.body.userId } });
      }
      await recipe.updateOne({ $push: { dislikes: req.body.userId } });
      res.status(200).json("The recipe has been disliked");
    } else {
      await recipe.updateOne({ $pull: { dislikes: req.body.userId } });
      res.status(200).json("The post has been undisliked");
    }
  } catch (err) {
    res.status(500).json("an error from our side Occured please contact us if error persist");
  }
});

//get a recipe

router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    const currentUser = await User.findById(recipe.userId);
    let newRecipe = recipe;
    newRecipe.userId = currentUser?.username;
    res.status(200).json(newRecipe);
  } catch (err) {
    console.log(err);
    res.status(500).json("an error from our side Occured please contact us if error persist");
  }
});
//Add or Remove a Recipe to favorites
router.put("/add/toFavorites/:id", async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId)
    if (!currentUser.favorites.includes(req.params.id)) {
      await currentUser.updateOne({ $push: { favorites: req.params.id } });
      res.status(200).json("The recipe added to favorites");
    } else {
      await currentUser.updateOne({ $pull: { favorites: req.params.id } });
      res.status(200).json("The recipe removed from favorites");
    }
  } catch (err) {
    res.status(500).json("an error from our side Occured please contact us if error persist");
  }
});

//get random recipes
router.get("/user/random", async (req, res) => {
  try {
    const recipes = await Recipe.find({ source: "Meal Master User" });
    const recipesFinal = await Promise.all(
      recipes.map(async (recipe) => {
        let newRecipe = recipe;
        const currentUser = await User.findById(recipe.userId);

        newRecipe.userId = currentUser ? currentUser.username : 'Anonymous';
        return newRecipe;
      })
    );
    const shuffled = recipesFinal.sort(() => 0.5 - Math.random());
    res.status(200).json(shuffled);
  } catch (err) {
    console.log(err);
    res.status(500).json("an error from our side Occured please contact us if error persist");
  }
});

//get a user favorites recipes
router.get("/:userId/favorites/recipes", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId)
    const recipesFavorites = await Promise.all(
      currentUser.favorites?.map(async (recipeId) => {
        let newRecipe = await Recipe.findById(recipeId);
        const recipeOwner = await User.findById(newRecipe.userId);

        newRecipe.userId = recipeOwner ? recipeOwner.username : 'Anonymous';
        return newRecipe;
      })
    );

    res.status(200).json(recipesFavorites);
  } catch (err) {
    console.log(err);
    res.status(500).json("an error from our side Occured please contact us if error persist");
  }
});

//get a user  all recipes
router.get("/:userId/myrecipes/all", async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.params.userId })
    const recipesFinal = await Promise.all(
      recipes.map(async (recipe) => {
        let newRecipe = recipe;
        const currentUser = await User.findById(recipe.userId);

        newRecipe.userId = currentUser ? currentUser.username : 'Anonymous';
        return newRecipe;
      })
    );

    res.status(200).json(recipesFinal);
  } catch (err) {
    console.log(err);
    res.status(500).json("an error from our side Occured please contact us if error persist");
  }
});

//comment a recipe

router.put("/:id/comment", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    await recipe.updateOne({ $push: { comments: req.body } });
    res.status(200).json("comment sent succesfully")
  } catch (err) {
    res.status(500).json("an error from our side Occured please contact us if error persist");
  }
});
//get a recipe comments

router.get("/:id/comment/all", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    const recipeComments = await Promise.all(
      recipe.comments.map(async (comment) => {
        let newComment = { ...comment };
        const currentUser = await User.findById(comment.userId);
        newComment.username = currentUser ? currentUser.username : 'Anonymous';
        return newComment;
      })
    );
    res.status(200).json(recipeComments)
  } catch (err) {
    res.status(500).json("an error from our side Occured please contact us if error persist");
  }
});

// search for Recipes

router.post("/all/search", async (req, res) => {
  try {
    let recipes = []
    recipes = await Recipe.find();
    if (req.body.title) {
      recipes = recipes.filter(
        (recipe) =>
          recipe.title.includes(req.body.title) ||
          recipe.desc.includes(req.body.title)
      );
    }
    if (req.body.cuisine) {
      recipes = recipes.filter((recipe) => recipe.cuisine.toLowerCase() === req.body.cuisine.toLowerCase());
    }
    if (req.body.diet) {
      recipes = recipes.filter((recipe) => recipe.diet.toLowerCase() === req.body.diet.toLowerCase());
    }
    if (req.body.maxTime) {
      recipes = recipes.filter(
        (recipe) => recipe.preparationTime <= req.body.maxTime
      );
    }
    if (req.body.maxCalories) {
      recipes = recipes.filter(
        (recipe) => recipe.calories <= req.body.maxCalories
      );
    }
    if (req.body.minCalories) {
      recipes = recipes.filter(
        (recipe) => recipe.calories >= req.body.minCalories
      );
    }
    if (req.body.Intolerances) {
      req.body.Intolerances.forEach((intolerance) => {
        recipes = recipes.filter(
          (recipe) => !recipe.intolerances.includes(intolerance)
        );
      });
    }
    const recipesFinal = await Promise.all(
      recipes.map(async (recipe) => {
        let newRecipe = recipe;
        const currentUser = await User.findById(recipe.userId);
        newRecipe.userId = currentUser?.username;
        return newRecipe;
      })
    );
    res.status(200).json(recipesFinal);
  } catch (err) {
    res.status(500).json("an error from our side Occured please contact us if error persist");
    console.log(err);
  }
});

module.exports = router;
