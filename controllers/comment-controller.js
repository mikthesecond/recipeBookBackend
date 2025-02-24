const commentService = require("../service/comment-service")

class CommentController{
    async addComment(req,res)
    {
        const {recipeId,userName,commentText} = req.body
        const comment = await commentService.addComment(recipeId,userName,commentText)
        res.json(comment)
    }
}

module.exports = new CommentController()