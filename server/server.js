const express = require("express")
const app = express()
const cors = require("cors")
const Pool = require('pg').Pool

app.use(cors())
app.use(express.json())

app.listen(3000, () =>{
    console.log("connected.")
})

const connection = new Pool(({
    host:"localhost",
    port:5432,
    user:"postgres",
    password:"password",
    database:"blackcat"
}))

connection.connect(() =>{
    console.log('connected successfully')
})

app.get('/login/:user/:pass',(req,res) =>{
    const username = req.params.user
    const pass = req.params.pass
    const query = 'SELECT * from logins where username=$1 AND password=$2'

    connection.query(query,[username,pass],(err,result)=>{
        if(err){
            res.send(err.message)
        } else {
            if(result.rowCount == 0){
                res.send(result.rowCount)
            } else {
                res.send(result.rowCount)
            }
        }
    })
})


