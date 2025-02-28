const ratingService = require("../service/rating-service")

class RatingController
{
    async addRating(req,res)
    {
        try
        {
            const {recipe_id,rate,user_id} = req.body
            const updatedRate = await ratingService.addRating(rate,recipe_id,user_id)
            res.json(updatedRate)
        }
        catch(e)
        {
            console.log(e)
        }
    }
    async getRating(req,res)
    {
        try
        {
            const {recipe_id,user_id} = req.query
            const rating = await ratingService.getRating(recipe_id,user_id)
            res.json(rating)
        }
        catch(e)
        {
            console.log(e)
        }
    }
    
}

module.exports = new RatingController()