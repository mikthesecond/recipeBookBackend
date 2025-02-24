const pool = require('../db')

class RecipeService
{
    async getRecipes()
    {
        const recipes = await pool.query(`
            SELECT recipes.*, 
                   COALESCE(rating.rating, 0) AS rating, 
                   COALESCE(rating.ratingCount, 0) AS ratingCount
            FROM recipes
            LEFT JOIN rating ON recipes.id = rating.recipe_id
        `);
        return recipes.rows
    }
    async getRecipe(id)
    {
        const recipe = await pool.query(
            `SELECT recipes.*, 
                    COALESCE(rating.rating, 0) AS rating, 
                    COALESCE(rating.ratingCount, 0) AS ratingCount
             FROM recipes
             LEFT JOIN rating ON recipes.id = rating.recipe_id
             WHERE recipes.id = $1`,
            [id]
        );        return recipe.rows
    }
    async addRecipe(data)
    {
        const {title,category,prepTime,servings,image,chef,description,ingredients,instructions} = data
        const recipe = await pool.query(`
            INSERT INTO recipes (title, category,prepTime, servings, image, chef, description, ingredients, instructions)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
        `,[title, category, prepTime, servings, image, chef, description, ingredients, instructions])
        const recipeId = recipe.rows[0].id;
        await pool.query(
            `INSERT INTO rating (recipe_id, rating, ratingCount) VALUES ($1, 0, 0)`,
            [recipeId]
        );
        return recipe.rows
    }
    async patchRecipe(id, data) {
        try {
            const existingRecipe = await pool.query('SELECT * FROM recipes WHERE id = $1', [id]);
            if (existingRecipe.rows.length === 0) {
                throw new Error('Recipe not found');
            }
            const fields = Object.keys(data);
            const values = Object.values(data);
            const setQuery = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
            const query = `UPDATE recipes SET ${setQuery} WHERE id = $${fields.length + 1} RETURNING *;`;
    
            const result = await pool.query(query, [...values, id]);
    
            return result.rows[0];
        } catch (e) {
            console.error('Error updating recipe:', e);
            throw e;
        }
    }
    
}

module.exports = new RecipeService()