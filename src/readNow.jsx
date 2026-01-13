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
    let recent
    const userName = localStorage.getItem('userName')
    const getChapters = JSON.parse(localStorage.getItem(name))
    const current = getChapters.indexOf(parseFloat(chapter))
    const prev = getChapters[current-1]
    const next = getChapters[current+1]
    const previousChapter = "/readnow/"+name+"/"+prev
    const nextChapter = "/readnow/"+name+"/"+next
    const prevA = document.querySelectorAll(".prev")
    const nextA = document.querySelectorAll(".next")

    const getAllImages = async() => {
        const url = 'https://black-cat-api-render.onrender.com/getImages/'+name+'/'+chapter
        try {
            const request = await fetch(url)
            const response = await request.json()
            setImages(response)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchRecentlyViewed = async () =>{
        const url = "https://black-cat-api-render.onrender.com/getRecentlyViewed/"+userName
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
        const url = "https://black-cat-api-render.onrender.com/updateRecentlyViewed"

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
    


    useEffect(() =>{
        getAllImages()
        fetchRecentlyViewed()
    },[])


     useEffect(() =>{

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
        console.log(current)
    },[getChapters])

    console.log(images)
    return(
        <>
            <Header />
                <div className="imagesContainer">
                    <div className="buttonsContainer">
                        <a href={previousChapter} className="prev"></a>
                        <a href={nextChapter} className="next"></a>
                    </div>                   
                    {
                        images == null ? <div className="loadingContainer"><img src={logo} width="100" height="100" className="loadingAnim" /><p>Please wait while we load the images...</p></div>:
                        images.map((src) =>{
                            return <LoadImages key={src} img={src} />
                        })
                    }
                    <div className="buttonsContainer">
                        <Link to={previousChapter} className="prev"></Link>
                        <Link to={nextChapter} className="next"></Link>
                    </div>  
                </div>
            <Footer />
        </>
    )
}