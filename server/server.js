const express = require("express")
const app = express()
const cors = require("cors")
const pupeteer = require("puppeteer");
const fs = require("fs");

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

app.post('/addtitle', (req,res) =>{
    const {title,code,category,description,status,release,recent,imageLink,chapters} = req.body
    const lv = 0
    const query = 'INSERT INTO "mDetailsv2" (name,code,category,description,status,"releaseDate","recentUpdate",likes,visits,"imageLink",chapters) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)'
    connection.query(query,[title,code,category,description,status,release,recent,lv,lv,imageLink,chapters],(err,result) =>{
        if(err){
            console.log(err.message)
        } else {
            res.end("Loe")
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

app.get('/getChapters/:title', async (req,res) =>{
    const {title} = req.params
    const ua = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.3"
    const browser = await pupeteer.launch({headless:true})
    const page = await browser.newPage()
    await page.setUserAgent(ua)
    await page.goto('https://mangahub.io/manga/'+title, {waitUntil:"domcontentloaded"})
    const getChapters = await page.evaluate(() =>{
        // select all span that has this specific class
        const chapters = document.querySelectorAll('span[class="text-secondary _3D1SJ"]')
        let ch = []

        // loop through each item and take out their text-content then insert it into the array
        chapters.forEach((chapter) =>{
            const anotherSpan = chapter.textContent.slice(1)
            if(ch.includes(anotherSpan)){
               
            } else {
                ch.push(anotherSpan)
            }
            
        })

        return ch

    })

    // let data = new Array
    // data = getChapters
    // fs.writeFileSync('file.json', JSON.stringify(data))
    await browser.close()

    res.send(getChapters)
})


