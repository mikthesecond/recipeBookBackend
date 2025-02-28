const recipeService = require('../service/recipe-service')


class RecipeController
{
    async getRecipes(req,res)
    {
        try{
            const recipes = await recipeService.getRecipes()
            res.json(recipes)
        }
        catch(e)
        {
            console.log(e)
        }
    }
    async getRecipe(req,res)
    {
        try{
            const {id}=req.params
            const recipe = await recipeService.getRecipe(id)
            res.json(recipe)
        }
        catch(e)
        {
            console.log(e)
        }
    }
    async addRecipe(req,res)
    {
        try{
            const {recipe} = req.body
            const recipes = await recipeService.addRecipe(recipe)
            res.json(recipes)
        }
        catch(e)
        {
            console.log(e)
        }
    }
    async patchRecipe(req,res)
    {
        try{
            const {recipe} = req.body
            const recipes = await recipeService.patchRecipe(recipe)
            res.json(recipes)
        }
        catch(e)
        {
            console.log(e)
        }
    }
    async deleteRecipe(req,res)
    {
        try{
            const {recipe_id} = req.query
            const recipes = await recipeService.deleteRecipe(recipe_id)
            res.json(recipes)
        }
        catch(e)
        {
            console.log(e)
        }
    }
}

module.exports = new RecipeController()