const pool = require("../db");

class RatingService
{
    async addRating(rate, recipeId, userId) {
        try {
            const existingRating = await pool.query(
                'SELECT * FROM rating WHERE user_id=$1 AND recipe_id=$2',
                [userId, recipeId]
            );
    
            const recipeData = await pool.query(
                'SELECT rating, rating_count FROM recipes WHERE id=$1',
                [recipeId]
            );
    
            let newRating;
            let amountRated = parseInt(recipeData.rows[0].rating_count);
            let totalRating = parseFloat(recipeData.rows[0].rating) * amountRated;
            let updatedRating;
    
            if (existingRating.rowCount > 0) {
                const oldRate = parseFloat(existingRating.rows[0].rating);
                totalRating = totalRating - oldRate + parseFloat(rate);
                newRating = totalRating / amountRated;
    
                updatedRating = await pool.query(
                    'UPDATE rating SET rating=$1 WHERE user_id=$2 AND recipe_id=$3 RETURNING *',
                    [rate, userId, recipeId]
                );
            } else {
                totalRating += parseFloat(rate);
                amountRated++;
                newRating = totalRating / amountRated;
    
                updatedRating = await pool.query(
                    'INSERT INTO rating (user_id, recipe_id, rating) VALUES ($1, $2, $3) RETURNING *',
                    [userId, recipeId, rate]
                );
            }
    
            await pool.query(
                'UPDATE recipes SET rating=$1, rating_count=$2 WHERE id=$3',
                [newRating, amountRated, recipeId]
            );
    
            return updatedRating.rows[0];
        } catch (e) {
            console.error(e);
            throw new Error('Ошибка при обновлении рейтинга');
        }
    }
    
    async getRating(recipeId,userId)
    {
        try{
            const rating = await pool.query('select * from rating where recipe_id=$1 and user_id=$2',[recipeId,userId])
            return rating.rows[0]
        }
        catch(e)
        {
            console.log(e)
        }
    }
}

module.exports = new RatingService()