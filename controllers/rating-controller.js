const ratingService = require("../service/rating-service")

class RatingController
{
    async addRating(req,res)
    {
        try
        {
            const {id,rating} = req.body
            const updatedRate = await ratingService.addRating(rating,id)
            res.json(updatedRate)
        }
        catch(e)
        {
            console.log(e)
        }
    }
}

module.exports = new RatingController()