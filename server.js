const express = require('express')
const route = require('./routes/index')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors({origin:"http://localhost:5173"}))
app.use('/api',route)



function start()
{
    app.listen(3228,()=>{
        console.log("server started on 3228")
    })
}
start()