const pool = require("../db");
const bcrypt = require('bcrypt')

class UserService{
    async login(email,password)
    {
        try{
            const currentUser = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
            const isPassEquals = await bcrypt.compare(password,currentUser.rows[0].password)
            if(!isPassEquals)
            {
                throw new Error('Неверный пароль')
            }
            return {...currentUser.rows[0],password:undefined}
        }
        catch(e)
        {
            console.log(e)
        }
        
    }
    async registration(email, password, user_name) {
        try {
          const existingUser = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
          if (existingUser.rows.length > 0) {
            throw new Error("Пользователь с таким email уже существует");
          }
          const passwordHash = await bcrypt.hash(password, 5);
          const newUser = await pool.query(
            `INSERT INTO users (user_name, email, password, role)
            VALUES ($1, $2, $3, 'user')
            RETURNING id, user_name, email, role`,
            [user_name, email, passwordHash]
          );
      
          return newUser.rows[0];
        } catch (e) {
            res.status(400)
          throw new Error('Ошибка при регистрации пользователя');
        }
      }
}

module.exports = new UserService()