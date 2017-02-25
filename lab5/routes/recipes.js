const express = require('express');
const router = express.Router();
const data = require("../data");
const recipesData = data.recipes;

router.get("/:id", (req, res) => {
    recipesData.getRecipeById(req.params.id).then((recipe) => {
        res.json(recipe);
    }).catch(() => {
        res.status(404).json({ error: `recipe not found with id ${req.params.id}` });
    });
});

router.get("/", (req, res) => {
    recipesData.getAllRecipes().then((recipesList) => {
        res.json(recipesList);
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
    let newRecipe = req.body;

    if (!newRecipe) {
        res.status(400).json({ error: "You must provide data to create a newRecipe" });
        return;
    }

    if (!newRecipe.title) {
        res.status(400).json({ error: "You must provide a recipe title" });
        return;
    }

    if (!newRecipe.ingredients) {
        res.status(400).json({ error: "You must provide recipe ingredients" });
        return;
    }

    if (!newRecipe.steps) {
        res.status(400).json({ error: "You must provide steps" });
        return;
    }
    if (!newRecipe.comments) {
        newRecipe.comments=[];
    }
    //console.log(newRecipe);
    recipesData.addRecipe(newRecipe.title,newRecipe.ingredients,newRecipe.steps,newRecipe.comments)
        .then((newRecipe) => {
            res.json(newRecipe);
        }, () => {
            res.status(500).send("500 Internal Error");
        });
});

router.put("/:id", (req, res) => {
    let newRecipe = req.body;
    if (!newRecipe) {
        res.status(400).json({ error: "You must provide data to update a Recipe" });
        return;
    }
    let getRecipe = recipesData.getRecipeById(req.params.id).then(() => {
        return recipesData.updateRecipe(req.params.id, newRecipe)
            .then((newRecipe) => {
                res.json(newRecipe);
            }, (e) => {
                res.status(404).send(e);
            });
    }).catch((e) => {
        res.status(404).json("Recipe not found");
    });
});

router.delete("/:id", (req, res) => {
    let recipe = recipesData.getRecipeById(req.params.id).then(() => {
        return recipesData.removeRecipe(req.params.id)
            .then(() => {
                res.sendStatus(200);
            }).catch(() => {
                res.sendStatus(500);
            });

    }).catch((e) => {
        console.log(e);
        res.status(404).json({ error: "Recipe not found" });
    });
});

module.exports = router;