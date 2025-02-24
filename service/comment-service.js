const pool = require("../db");

class CommentService{
    async addComment(recipeId,userName,commentText)
    {
        const comment = await pool.query(
            'INSERT INTO comments (recipe_id, user_name, comment) VALUES ($1, $2, $3) RETURNING *',
            [recipeId, userName, commentText]
        );
        return comment
    }
}

module.exports = new CommentService()