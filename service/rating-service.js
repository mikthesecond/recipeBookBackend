const pool = require("../db");

class RatingService
{
    async addRating(rate,recipeId)
    {
        try{
            const rating = await pool.query('select rating, ratingcount from rating where recipe_id=$1',[recipeId])
            const totalRating = parseFloat(rating.rows[0].rating) * parseInt(rating.rows[0].ratingcount);
            const amountRated = parseInt(rating.rows[0].ratingcount) + 1;
            const newRating = (totalRating + parseFloat(rate)) / amountRated;
            console.log(newRating)
            const updatedRating = await pool.query(
                'UPDATE rating SET rating = $1, ratingCount = $2 WHERE recipe_id = $3 RETURNING *',
                [newRating, amountRated, recipeId]
            );
            return updatedRating.rows[0]
        }
        catch(e)
        {
            console.log(e)
        }
    }
}

module.exports = new RatingService()