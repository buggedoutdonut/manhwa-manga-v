import { useEffect, useState } from "react"
import "../css/titleInfo.css"
import logo from "../assets/logo.png"

export const CreateTitleInfoChapters = (data) =>{
    const [chapterList,setChapterList] = useState([])
    const [chapters,setChapters] = useState()
    const [isReady,setIsReady] = useState(false)
    let isClicked = ""
    
    let sortedCh = []
    let lastChapter

    const getChapters = async() =>{
        const url = "https://black-cat-api.vercel.app/getChapters/"+data.data

        try {
            const request = await fetch(url)
            const response = await request.json()
            setChapterList(response.allchapters)
        } catch (error) {
            console.log(error)
        }
    }

    const createChapterButtons = () =>{
        let min = 1
        let currentMax = 1

        if(isReady == true){
            if(sortedCh.length > 0 && sortedCh.length <= 100){
                    const container = document.getElementById('chBtnContainer') 
                    const chBtn = document.createElement('button')
                    chBtn.id = "chBtn18"
                    chBtn.className = "chapterNumberButtons"
                    chBtn.textContent = "" + currentMax +" - " + chapterList[0] + ""
                    chBtn.onclick = createChapterNumberButtons
                    container.append(chBtn)
            } else {
                for(min;min < lastChapter;min++){
                    const container = document.getElementById('chBtnContainer') 
                    const chBtn = document.createElement('button')
                    chBtn.id = "chBtn"+min
                    chBtn.className = "chapterNumberButtons"
                    chBtn.textContent = "" + min +" - " + min*100 + ""

                    if(min > 1){
                        chBtn.textContent = "" + currentMax*100 +" - " + min*100 + ""
                        currentMax++
                    }

                    chBtn.onclick = createChapterNumberButtons
                    container.append(chBtn)
                }

                //Create another button if chapter is not divisible by 100
                if(lastChapter % 1 > 0){
                    const container = document.getElementById('chBtnContainer') 
                    const chBtn = document.createElement('button')
                    chBtn.id = "chBtn18"
                    chBtn.className = "chapterNumberButtons"
                    chBtn.textContent = "" + currentMax*100 +" - " + chapterList[0] + ""
                    chBtn.onclick = createChapterNumberButtons
                    container.append(chBtn)
                    }
                }
            }   
        }

    const createChapterNumberButtons = (e) =>{

        if(isClicked != ""){
            const lastClicked = document.getElementById(isClicked)
            lastClicked.style.backgroundColor = "rgb(53, 31, 95)"
        }

        //Take the textcontent of the button and split it then assign its first and last value as min and max
        const text = e.target.textContent
        e.target.style.backgroundColor = "rgb(185, 45, 69)"

        const split = text.split('-')
        let min = parseFloat(split[0])
        let max = parseFloat(split[1])
        let i = 0

        let sortedChapterList = sortedCh

        let maxChapters = sortedChapterList.length
        
        const chNumContainer = document.getElementById('chNumContainer')
        const chNumButtons = document.querySelectorAll('.chapterButtons')

        //Remove all existing chapter buttons 
        if(chNumButtons.length != 0){
            chNumButtons.forEach((btn) =>{
                btn.remove()
            })
        }
        
        //Create chapter buttons based on textcontent of the clicked button 
        for(i; i <= maxChapters - 1; i++){
            if(min - 1 < sortedChapterList[i] && max >= sortedChapterList[i]){ 
                const linkTo = document.createElement('a')
                linkTo.href = '/readnow/'+data.data+'/'+sortedCh[i]

                const chNumBtn = document.createElement('button')
                chNumBtn.id = min
                chNumBtn.className = "chapterButtons"
                chNumBtn.textContent = "#" + sortedCh[i]
                linkTo.append(chNumBtn)
                chNumContainer.append(linkTo)
            }
        }
    
        isClicked = e.target.id
    }

    useEffect(() =>{
        getChapters()
    },[])


    //Reverse the order of the array and insert it into a new State and let variable then run the createChapter function
    useEffect(() =>{
            let convertedCh = []
            chapterList.map((chapter) =>{
                convertedCh.push(parseFloat(chapter))
            })

            lastChapter = convertedCh[0] / 100 
            sortedCh = convertedCh.toReversed()
            setChapters(sortedCh)

            if(isReady == true){
                createChapterButtons()
            }

            setIsReady(true)
    },[chapterList])

    useEffect(() =>{
        if(sortedCh.length > 0){
            localStorage.setItem(data.data,JSON.stringify(sortedCh))
        }
    },[sortedCh])
    
    
    return(
        <div className="chaptersMainContainer">
            <div className="chapterText">
                <span className="titleBar"></span>
                <a>Chapters</a>
            </div>
            <div className="chapterButtonsContainer" id="chBtnContainer">
                {
                    // Initiate loading if the chapterlist's value is still not initialized
                    chapterList.length!=0?console.log():<div className="loadingContainer"><img src={logo} className="loadingAnim" width="50"/><br/><h3>Loading chapters..</h3></div>
                }
            </div>
            <div className="chapterNumberContainer" id="chNumContainer">
            </div>
        </div>
    )
}