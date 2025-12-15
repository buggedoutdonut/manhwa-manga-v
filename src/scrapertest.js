const pupeteer = require("puppeteer");
const fs = require("fs");


(async () => {
    const ua = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.3"
    const browser = await pupeteer.launch({headless:true})
    const page = await browser.newPage()
    await page.setUserAgent(ua)
    await page.goto('https://mangahub.io/manga/solo-max-level-newbie', {waitUntil:"domcontentloaded"})
    const getChapters = await page.evaluate(() =>{
        // select all span that has this specific class
        const chapters = document.querySelectorAll('span[class="text-secondary _3D1SJ"]')
        let ch = []

        // loop through each item and take out their text-content then insert it into the array
        chapters.forEach((chapter) =>{
            const anotherSpan = chapter.textContent
            if(ch.includes(anotherSpan)){
               
            } else {
                ch.push(anotherSpan)
            }
            
        })

        return ch

    })

    // let data = new Array
    // data = getChapters
    console.log(data)
    // fs.writeFileSync('file.json', JSON.stringify(data))
    await browser.close()
})();
   

