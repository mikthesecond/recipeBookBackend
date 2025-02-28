const commentService = require("../service/comment-service")

class CommentController{
    async addComment(req,res)
    {
        try{
            const {recipe_id,user_id,comment,username} = req.body
        const comm = await commentService.addComment(recipe_id,user_id,comment,username)
        res.json(comm)
        }
        catch(e)
        {
            console.log(e)
        }
    }
    async getComments(req,res)
    {
        try{
            const {id} = req.params
        const comments = await commentService.getComments(id)
        res.json(comments)
        }
        catch(e)
        {
            console.log(e)
        }
    }
}

module.exports = new CommentController()