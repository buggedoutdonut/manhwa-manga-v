const express = require("express")
const app = express()
const cors = require("cors")
const { connect } = require("http2")
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
                res.send({
                    "rowCount":result.rowCount,
                    "access":result.rows
                })
            }
        }
    })
})

app.get("/validateUser/:user",(req,res) =>{
    const user = req.params.user
    const query = 'SELECT * FROM logins where username = $1'
    connection.query(query,[user],(err,result) =>{
        if(err){
            res.send(err.message)
        } else {
            res.send(result.rowCount)
        }
    })
})

app.post('/addmember',(req,res)=>{
    const {username,password,access} = req.body
    const query = 'INSERT INTO "logins" (username,password,access) VALUES ($1,$2,$3)'
    connection.query(query,[username,password,access],(err,result) =>{
        if(err){
            res.send(err.message)
        } else {
            res.end("Member added.")
        }
    })
})

app.post('/try', (req,res) =>{
    console.log(req.body)
    const {name,code,category,status} = req.body
    const query = 'INSERT INTO "mDetailsv2" (name,code,category,status) VALUES ($1,$2,$3,$4)'
    connection.query(query,[name,code,category,status],(err,result) =>{
        if(err){
            console.log(err.message)
        } else {
            console.log(result)
        }
    })
})


