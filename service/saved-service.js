const pool = require("../db");

class Saved {
  async getSaved(user_id) {
    try {
      const savedIds = await pool.query(
        "SELECT recipe_id FROM saved WHERE user_id = $1",
        [user_id]
      );
  
      if (savedIds.rows.length === 0) {
        return [];
      }
  
      const recipeIds = savedIds.rows.map(row => row.recipe_id);
      const savedRecipes = await pool.query(
        `SELECT * FROM recipes WHERE id = ANY($1)`,
        [recipeIds]
      );
  
      return savedRecipes.rows;
    } catch (e) {
      console.error(e);
      return [];
    }
  }
  
  async addSaved(recipe_id, user_id) {
    try {
      const isExists = await pool.query(
        "SELECT * FROM saved WHERE recipe_id=$1 AND user_id=$2",
        [recipe_id, user_id]
      );
  
      if (isExists.rows.length > 0) {
        await pool.query(
          "DELETE FROM saved WHERE recipe_id=$1 AND user_id=$2",
          [recipe_id, user_id]
        );
      } else {
        await pool.query(
          "INSERT INTO saved (user_id, recipe_id) VALUES ($1, $2)",
          [user_id, recipe_id]
        );
      }
  
      const savedRecipes = await pool.query(
        "SELECT recipe_id FROM saved WHERE user_id=$1",
        [user_id]
      );
  
      if (savedRecipes.rows.length === 0) {
        return [];
      }
  
      const recipeIds = savedRecipes.rows.map((row) => row.recipe_id);
      const recipes = await pool.query(
        "SELECT * FROM recipes WHERE id = ANY($1::int[])",
        [recipeIds]
      );
  
      return recipes.rows;
    } catch (e) {
      console.error(e);
      throw new Error("Ошибка при добавлении или удалении сохранений");
    }
  }
  
}

module.exports = new Saved();
