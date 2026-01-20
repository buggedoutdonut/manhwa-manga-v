import {Header} from "./layout/header.jsx"
import {Footer} from "./layout/footer.jsx"
import { useParams } from "react-router"
import { useEffect, useState } from "react"
import { LoadImages } from "./components/loadImages.jsx"
import { Link } from "react-router"
import logo from "./assets/logo.png"
import "./css/readNow.css"

export const ReadNow = () =>{
    const {name,chapter} = useParams()
    const [images,setImages] = useState()
    const [prev,setPrev] = useState()
    const [next,setNext] = useState()
    const [isLoaded,setIsLoaded] = useState(false)
    let recent
    const userName = localStorage.getItem('userName')
    let getChapters
    let current
    let previousChapter
    let nextChapter
    let prevA
    let nextA
    let loadedImgs = 0


    let mImg = document.querySelector('img[id="manhwaimg"]')

    const getAllImages = async() => {
        const url = 'https://black-cat-api-render.onrender.com/getImages/'+name+'/'+chapter
        // const url = 'http://localhost:5040/getImages/'+name+'/'+chapter
        try {
            const request = await fetch(url)
            const response = await request.json()
            setImages(response)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchRecentlyViewed = async () =>{
        const url = "https://black-cat-api.vercel.app/getRecentlyViewed/"+userName
        try {
            const request = await fetch(url)
            const response = await request.json()

            if(response[0].recent == null){
                recent = []
                updateRecentlyViewed(null)
            } else {
                const recentlyViewedData = response[0].recent.split(";") 
                recent = recentlyViewedData
                const checkArray = recent.filter(manghwa => manghwa.includes(name))
            
                if(checkArray.length > 0){
                    const index = recent.indexOf(checkArray[0])
                    updateRecentlyViewed(index)
                } else {
                    updateRecentlyViewed(null)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateRecentlyViewed = async (index) =>{
        const url = "https://black-cat-api.vercel.app/updateRecentlyViewed"

        if(index == null){
            recent.push(name+":"+chapter)
        } else {
            recent[index] = name+":"+chapter
        }

        console.log(recent)
        const convRecent = {
            "userName": userName,
            "recent": recent.join(";")
        }

        const body = JSON.stringify(convRecent)

        const headers = {
            method:"PUT",
            body: body,
            headers:{"content-type":"application/json"}
        }

        try {
            const request = await fetch(url,headers)
            console.log("Done.")
        } catch (error) {
            console.log(error)
        }

    }
    
    const getAllChapters = async() =>{
        let chaptersLocalStorage = JSON.parse(localStorage.getItem(name))
        if(chaptersLocalStorage != null || chaptersLocalStorage != undefined){
            getChapters = JSON.parse(localStorage.getItem(name))
        } else {
            const url = 'https://black-cat-api-render.onrender.com/getRecentlyViewedManghwaDetails/'+name
            try {
                const request = await fetch(url)
                const response = await request.json()
                getChapters = response.allChapters.reverse()
                localStorage.setItem(name,JSON.stringify(getChapters))
            } catch (error) {
                console.log(error)
            }
        }

        current = getChapters.indexOf(parseFloat(chapter))
        setPrev(getChapters[current-1])
        setNext(getChapters[current+1])

        if(prev != chapter){
            setPrev(getChapters[current-1])
        }

        previousChapter = "/readnow/"+name+"/"+prev
        nextChapter = "/readnow/"+name+"/"+next
        prevA = document.querySelectorAll(".prev")
        nextA = document.querySelectorAll(".next")

        if(getChapters.length - 1 != current){
            nextA.forEach((a) =>{
                const nextButton = document.createElement("button")
                nextButton.textContent = "Next"
                a.append(nextButton)
            })
        }

        if(getChapters[0] != getChapters[current]){
            prevA.forEach((a) =>{
                const prevButton = document.createElement("button")
                prevButton.textContent = "Previous"
                a.append(prevButton)
            })
        }

    }
    


    useEffect(() =>{
        getAllChapters()
        getAllImages()
        fetchRecentlyViewed()
    },[])

    let checkIfLoaded = setInterval(() =>{
        const mImg = document.querySelector('img[id="manhwaimg"]')
            if(mImg != null){
                const loadingContainer = document.querySelector(".loadingContainer")
                const placeholder = document.querySelector(".imagePlaceholder")
                loadingContainer.remove()
                placeholder.remove()
            }
    },1000)
    
    return(
        <>
            <Header />
                <div className="imagesContainer">
                    <div className="buttonsContainer">
                        <a href={"/readnow/"+name+"/"+prev} className="prev"></a>
                        <a href={"/readnow/"+name+"/"+next} className="next"></a>
                    </div>                   
                    {
                        images == null ? null:
                        images.map((src) =>{
                            loadedImgs+= 1
                            return <LoadImages key={src} img={src} />
                        })
                    }
                    
                    <div className="loadingContainer"><img src={logo} width="100" height="100" className="loadingAnim" /><p>Please wait while we load the images...</p></div>
                    <div className="imagePlaceholder"></div>
                    <div className="buttonsContainer">
                        <a href={"/readnow/"+name+"/"+prev} className="prev"></a>
                        <a href={"/readnow/"+name+"/"+next} className="next"></a>
                    </div>  
                </div>
            <Footer />
        </>
    )
}