const userService = require('../service/user-service')

class UserController{
    async login(req,res)
    {
       try{
        const {email,password} = req.body
        const user = await userService.login(email,password)
        if(!user)throw new Error()
        res.json(user)
       }
       catch(e)
       {
        res.status(400).json({message:"неверный логин или пароль!"})
        console.log(e)
       }
    }
    async registration(req,res)
    {
       try{
        const {email,password,user_name} = req.body
        const user = await userService.registration(email,password,user_name)
        res.json(user)
       }
       catch(e)
       {
        res.status(400).json({message:"пользователь с таким email существует!"})
       }
    }
}

module.exports = new UserController()