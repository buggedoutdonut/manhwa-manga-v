import { useEffect, useReducer, useState } from "react"
import { CreateAllTitlesCards } from "./components/allTitlesCards"
import "./css/allManghwa.css"
import { Footer } from "./layout/footer"
import { Header } from "./layout/header"

export const AllRecentlyViewed = () =>{
    const [manghwa,setManghwa] = useState()
    const [manghwaCopy,setManghwaCopy] = useState()
    const [isRefreshed, setIsRefreshed] = useState(false)
    const [recentChapters, setRecentChapters] = useState()
    const [recentChaptersCopy,setRecentChaptersCopy] = useState()
    const [recentlyViewed,setRecentlyViewed] = useState()
    const [favoritesCopy,setRecentlyViewedCopy] = useState()
    const userName = localStorage.getItem('userName')
    let searchArray = []
    let recentChSearch = []
   

    const fetchRecentlyViewed = async() =>{
        const url = "api/v1/getRecentlyViewed/"+userName

        try {
            const request = await fetch(url)
            const response = await request.json()
            const splitRecentlyViewed = response[0].recent.split(";")
            setRecentlyViewed(splitRecentlyViewed)
            setRecentlyViewedCopy(splitRecentlyViewed)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchRecentlyViewedDetails  = async() =>{
        if(recentlyViewed != undefined || recentlyViewed != null){

           const codes = recentlyViewed.map((name) => {
                const codeArray = name.split(":")
                const code = codeArray[0]
                return code
           })

           const chapters = recentlyViewed.map((name) =>{
                const nameArray = name.split(":")
                const chapter = nameArray[1]
                return chapter
           })


           try {
                const recentlyViewedPromise = codes.map(async(code) =>{
                    const request = await fetch('api/v1/getRecentlyViewedManghwaDetails/'+code)
                    const response = await request.json()
                    return response[0]
                })

                const recentlyViewedDetails = await Promise.all(recentlyViewedPromise)
                setRecentChapters(chapters)
                setRecentChaptersCopy(chapters)
                setManghwa(recentlyViewedDetails)
                setManghwaCopy(recentlyViewedDetails)
           } catch (error) {
                console.log(error)
           }
        }
    }

    const searchFunction = () =>{
        searchArray = [] 
        recentChSearch = []
        const titles = document.querySelectorAll(".titleContainer")
        const searchText = document.querySelector(".searchText")
        const searchValue = searchText.value.toLowerCase()
       
        if(titles == undefined){
            titles.forEach((title) =>{
            title.remove()
            })
        }
       
        manghwaCopy.map((title,index) => {
            const name = title.name.toLowerCase()
            if(name.includes(searchValue)){
                searchArray.push(title)
                recentChSearch.push(recentChaptersCopy[index])
            }
        })
        setManghwa(searchArray)
        setRecentChapters(recentChSearch)
    }

    useEffect(() =>{
        fetchRecentlyViewed()
    },[])

    useEffect(() =>{
        fetchRecentlyViewedDetails()
    },[recentlyViewed])


    ////////////////
   return(
    <>
        <Header />
        <div className="allTitlesContainer">
            <div className="selectorContainer">
                <h2 className="homeTextSub">📌 Recently Viewed</h2>
                <input type="text" placeholder="🔎︎ Search.." className="searchText" onChange={searchFunction}></input>
            </div>
            <div className="border" />
            {
                    manghwa == undefined || manghwa.length <= 0? <h3>No results.</h3>:
                    manghwa.map((title,index) =>{
                        const recentChapter = recentChapters[index]
                        console.log(recentChapters[index])
                
                        return <CreateAllTitlesCards key={title.id} data={title} recentChapter={recentChapter}/>             
                    })
            }
        </div>
        <Footer />
    </>
   )
}