const Pool = require('pg').Pool

const pool = new Pool(
    {
      user: "postgres",
      password:"ahurus99",
      port:5432,
      host:"localhost",
      database:"bd"
    }
)

module.exports =pool