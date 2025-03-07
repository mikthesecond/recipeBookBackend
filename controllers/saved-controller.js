const savedService = require("../service/saved-service");

class Saved{
    async getSaved(req,res)
    {
        const {user_id} = req.query
        const recipes = await savedService.getSaved(user_id)
        res.json(recipes)
    }
    async addSaved(req,res)
    {
        const {recipe_id,user_id} = req.body
        const recipes = await savedService.addSaved(recipe_id,user_id)
        res.json(recipes)
    }

}

module.exports = new Saved()