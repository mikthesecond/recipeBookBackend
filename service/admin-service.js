const pool = require("../db");

class AdminService{
    async login(login,password)
    {
        try{
            const currentAdmin = await pool.query("SELECT * FROM admins WHERE login=$1 AND password=$2", [login, password]);
            return currentAdmin.rows[0]
        }
        catch(e)
        {
            console.log(e)
        }
        
    }
}

module.exports = new AdminService()