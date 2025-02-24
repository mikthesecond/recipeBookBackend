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
            const {data} = req.body
            const recipe = await recipeService.addRecipe(data)
            res.json(recipe)
        }
        catch(e)
        {
            console.log(e)
        }
    }
    async patchRecipe(req,res)
    {
        try{
            
            const {id} = req.body
            const {data} = req.body
            const recipe = await recipeService.patchRecipe(id,data)
            res.json(recipe)
        }
        catch(e)
        {
            console.log(e)
        }
    }
}

module.exports = new RecipeController()