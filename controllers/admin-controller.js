const adminService = require("../service/admin-service")

class AdminController{
    async login(req,res)
    {
       try{
        const {login,password} = req.body
        const admin = await adminService.login(login,password)
        res.json(admin)
       }
       catch(e)
       {
        console.log(e)
       }
    }
}

module.exports = new AdminController()