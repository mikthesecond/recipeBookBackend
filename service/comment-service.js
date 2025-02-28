const pool = require("../db");

class CommentService{
    async addComment(recipeId,user_id,commentText,username)
    {
        try{
            const comment = await pool.query(
                'INSERT INTO comments (recipe_id, user_id, comment, user_name) VALUES ($1, $2, $3,$4) RETURNING *',
                [recipeId, user_id, commentText, username]
            );
            const comments = await pool.query("select * from comments where recipe_id = $1",[recipeId])
            return comments.rows
        }
        catch(e)
        {
            console.log(e)
        }
    }
    async getComments(recipe_id)
    {
        try{
           const comments = await pool.query("select * from comments where recipe_id = $1",[recipe_id])
           return comments.rows
        }
        catch(e)
        {
            console.log(e)
        }
    }
}

module.exports = new CommentService()