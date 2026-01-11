const express = require("express");
const app = express()
const cors = require("cors")
const fs = require("fs");
const dotenv = require("dotenv").config();
const chrome = require('@sparticuz/chromium');
const puppeteer  = require("puppeteer-core");
const {PGHOST,PGDATABASE,PGUSER,PGPASSWORD} = process.env
const Pool = require('pg').Pool

app.use(cors())
app.use(express.json())

app.listen(3000, () =>{
    console.log("connected.")
})

const connection = new Pool(({
    host:PGHOST,
    port:5432,
    user:PGUSER,
    password:PGPASSWORD,
    database:PGDATABASE,
    ssl:{
        require:true
    }
}))

connection.connect(() =>{
    console.log('connected successfully')
})

app.get('api/v1/login/:user/:pass',(req,res) =>{
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

app.get("api/v1/validateUser/:user",(req,res) =>{
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

app.post('api/v1/addmember',(req,res)=>{
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

app.post('api/v1/addtitle', (req,res) =>{
    const {title,code,category,description,status,release,recent,imageLink,chapters} = req.body
    parseFloat(chapters)
    console.log(typeof(chapters))
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

app.post('api/v1/try', (req,res) =>{
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

app.get('api/v1/getChapters/:title', async (req,res) =>{
    const {title} = req.params
    const executablePath = await chrome.executablePath()
    const ua = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.3"
  
    const browser = await puppeteer.launch({
        args:[...chrome.args, "--no-sandbox", "--disable-setuid-sandbox"],
        executablePath: await executablePath,
        headless:true,
        ignoreHTTPSErrors:true
    })
        
    const page = await browser.newPage()
    await page.setUserAgent(ua)
    await page.goto('https://mangahub.io/manga/'+title, {waitUntil:"domcontentloaded",timeout:50000})
    const getChapters = await page.evaluate(() =>{
        // select all span that has this specific class
        const chapters = document.querySelectorAll('span[class="text-secondary _3D1SJ"]')
        const title = document.querySelector('._3xnDj')
        const img = document.querySelector('img[class="img-responsive manga-thumb"]')
        const genre = document.querySelectorAll('a[class="label genre-label"]')

        const index = title.textContent.indexOf('Hot')
        let details = {
            allchapters:[],
            imgLink:'',
            title:'',
            genre:[]
        }
        // loop through each item and take out their text-content then insert it into the array
        chapters.forEach((chapter) =>{
            const chapterSpan = chapter.textContent.slice(1)

            if(details['allchapters'].includes(chapterSpan)){
               
            } else {
                details['allchapters'].push(chapterSpan)
            }

        genre.forEach((category) =>{
            const categoryText = category.textContent

            if(details['genre'].includes(categoryText)){

            } else {
                details['genre'].push(categoryText)
            }
        })

            details['title'] = title.innerText.slice(0,index)
            details['imgLink'] = img.getAttribute("src")
            
        })

        return details

    })

    await browser.close()

    res.send(getChapters)
})

app.get('api/v1/getTopSix/:type',(req,res) =>{
    const checkType = req.params.type
    let query


    if(checkType == "TR"){
        query = 'SELECT * from "mDetailsv2" ORDER BY visits DESC LIMIT 7'
    }

    if(checkType == "LU"){
        query = 'SELECT * from "mDetailsv2" ORDER BY "recentUpdate" DESC LIMIT 7'
    }

    if(checkType == "NR"){
        query = 'SELECT * from "mDetailsv2" ORDER BY "releaseDate" DESC LIMIT 7'
    }   

    if(checkType == "CO"){
        query = `SELECT * from "mDetailsv2" where status = 'Completed' LIMIT 7`
    }
    
    connection.query(query,(err,result) =>{
        if(err){
            res.send(err)
        } else {
            res.send(result.rows)
        }
    })
})


app.get("api/v1/getTitleData/:id",(req,res) =>{
    const id = req.params.id
    const query = 'Select * from "mDetailsv2" where id = $1'
    connection.query(query,[id],(err,result) =>{
        if(err){
            res.send(err.message)
        } else {
            res.send(result.rows)
        }
    })
})

app.put("api/v1/addVisit/",(req,res) =>{
    const {id,visits} = req.body
    const visit = parseInt(visits) + 1

    const query = 'Update "mDetailsv2" set visits=$1 where id=$2'
    connection.query(query,[visit,id],(err,result) =>{
        if(err){
            res.end(err.message)
        } else {
            res.end()
        }
    })
})

app.get('api/v1/getImages/:name/:chapter',async (req,res) =>{
    const name = req.params.name
    const chapter = req.params.chapter
    
    const ua = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.3"
    const browser = await puppeteer.launch({headless:true,timeout:60000})
    const page = await browser.newPage()
    await page.setUserAgent(ua)
    await page.goto('https://mangahub.io/chapter/'+name+'/chapter-'+chapter+'')

    const scrollDown = await page.evaluate(()=>{
        window.scrollTo(0, document.body.scrollHeight)
    })

    
    const checkImages = async () =>{
        const results = await page.evaluate(() =>{
            const imageLinks = []
            const images = document.querySelectorAll('img[class="PB0mN"]')    
            images.forEach((img) =>{
                imageLinks.push(img.getAttribute("src"))
            })
            
            return imageLinks
        })
        res.send(results)
        await browser.close()
    }
    
    const timeout = setTimeout(checkImages,10000)
    console.log(timeout)
    
})

app.get('api/v1/allTitles',(req,res) =>{
    const query = 'Select * from "mDetailsv2" ORDER BY "id" ASC'  
    connection.query(query,(err,result) => {
        if(err){
            res.send(err)
        } else {
            res.send(result.rows)
        }
    })
})

app.get('api/v1/getCompleted',(req,res) =>{
    const query = 'Select * from "mDetailsv2" where status = $1'
    const status = 'Completed'
    connection.query(query,[status],(err,result) =>{
        if(err){
            res.end(err)
        } else {
            res.send(result.rows)
        }
    })
})

app.get('api/v1/getFavorites/:user',(req,res) =>{
    const user = req.params.user
    const query = "SELECT favorites from logins where LOWER(username) = LOWER($1)"

    connection.query(query,[user],(err,result) =>{
        if(err){
            res.end(err)
        } else {
            res.send(result.rows)
        }
    })

})

app.put('api/v1/updateFavorites/',(req,res) =>{
    const {user,favorites} = req.body
    const query = 'UPDATE logins set favorites=$1 where LOWER(username)=LOWER($2)'  
    connection.query(query,[favorites,user],(err,result) => {
        if(err){
            res.end(err.message)
        } else {
            res.end()
        }
    })
})

app.get('api/v1/getRecentlyViewed/:userName',(req,res) =>{
    const userName = req.params.userName
    const query = 'SELECT recent from logins where username = $1'
    connection.query(query,[userName],(err,result) =>{
        if(err){
            console.log(err)
        } else {
            res.send(result.rows)
        }
    })
})

app.put('api/v1/updateRecentlyViewed',(req,res) =>{
    const {userName,recent} = req.body
    const query = 'UPDATE logins set recent = $1 where LOWER(username) = LOWER($2)'
    connection.query(query,[recent,userName],(err,result) =>{
        if(err){
            console.log(err)
        } else {
            res.end("Completed!")
        }
    })
})

app.get('api/v1/getRecentlyViewedManghwaDetails/:code',(req,res) =>{
    const code = req.params.code
    const query = 'SELECT * from "mDetailsv2" where code = $1'
    connection.query(query,[code],(err,result) => {
        if(err){
            console.log(err)
        } else {
            res.send(result.rows)
        }
    })
})

app.get('api/v1/MHLastChapter/:code',async (req,res) =>{
    const code = req.params.code
    const ua = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.3"
    const browser = await puppeteer.launch({headless:true})
    const page = await browser.newPage()
    await page.setUserAgent(ua)
    await page.goto('https://mangahub.io/manga/'+code,{waitUntil:"domcontentloaded",timeout:60000})
    
    const getLastChapter = await page.evaluate(() => {
        let chapterArray = []
        const chapters = document.querySelectorAll('span[class="text-secondary _3D1SJ"]')

        chapters.forEach((chapter) =>{
            const chapterText = chapter.textContent.slice(1)
            if(chapterArray.includes(chapterText)){
                 
            } else {
                chapterArray.push(chapterText)
            } 
        })

        return chapterArray[0]
    })

    await browser.close()
    res.send(getLastChapter)
})

app.put('api/v1/updateChapters/',(req,res) =>{
    const {id,chapter} = req.body
    const date = new Date()
    const year = date.getFullYear()
    let month = date.getMonth()
        if(month == 0){
            month=1
        } else {
            month += 1
        }
    
    const day = date.getDate()
    const hour = date.getHours()
    const mins = date.getMinutes()
    const seconds = date.getSeconds()

    const currentDate = `${year}-${month}-${day} ${hour}:${mins}:${seconds}`

    const query = 'UPDATE "mDetailsv2" set chapters = $1 , "recentUpdate" = $2 where id = $3'
    connection.query(query,[chapter,currentDate,id],(err,result) =>{
        if(err){
            res.end(err)
        } else {
            res.end("Success!")
        }
    })


})