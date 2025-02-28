const pool = require('../db')

class RecipeService
{
    async getRecipes()
    {
        const recipes = await pool.query(`Select * from recipes
        `);
        return recipes.rows
    }
    async getRecipe(id)
    {
        const recipe = await pool.query(
            `select * from recipes where id =$1`,
            [id]
        );        return recipe.rows
    }
    async addRecipe(data)
    {
        const {title,category,preptime,servings,image,chef,description,ingredients,instructions} = data
        const recipe = await pool.query(`
            INSERT INTO recipes (title, category,prepTime, servings, image, chef, description, ingredients, instructions, rating, rating_count)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11)
            RETURNING *;
        `,[title, category, preptime, servings, image, chef, description, ingredients, instructions,0,0])
        const newRecipes = await pool.query("select * from recipes")
        return newRecipes.rows
    }
    async patchRecipe(data) {
        try {
            const existingRecipe = await pool.query('SELECT * FROM recipes WHERE id = $1', [data.id]);
            if (existingRecipe.rows.length === 0) {
                throw new Error('Recipe not found');
            }
            const fields = Object.keys(data);
            const values = Object.values(data);
            const setQuery = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
            const query = `UPDATE recipes SET ${setQuery} WHERE id = $${fields.length + 1} RETURNING *;`;
            const result = await pool.query(query, [...values, data.id]);
            const recipes = await pool.query("select * from recipes")
            return recipes.rows;
        } catch (e) {
            console.error('Error updating recipe:', e);
            throw e;
        }
    }
    async deleteRecipe(recipe_id) {
        try {
           await pool.query("delete from recipes where id=$1",[recipe_id])
           const recipes = await pool.query("select * from recipes")
           return recipes.rows
        } catch (e) {
            console.error('Error delete recipe:', e);
            throw e;
        }
    }
    
}

module.exports = new RecipeService()