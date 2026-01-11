import { useEffect, useState } from "react"
import { CreateAllTitlesCards } from "./components/allTitlesCards"
import "./css/allManghwa.css"
import { Footer } from "./layout/footer"
import { Header } from "./layout/header"

export const AllManghwa = () =>{
    const [manghwa,setManghwa] = useState()
    const [manghwaCopy,setManghwaCopy] = useState()
    let searchArray = []

    const fetchTitles = async() =>{
        const url = "/api/v1/allTitles"

        try {
            const request = await fetch(url)
            const response = await request.json()
            setManghwa(response)
            setManghwaCopy(response)
        } catch (error) {
            console.log(error)
        }
    }

    const searchFunction = () =>{
        searchArray = []
        const titles = document.querySelectorAll(".titleContainer")
        const searchText = document.querySelector(".searchText")
        const searchValue = searchText.value.toLowerCase()
       
        if(titles == undefined){
            titles.forEach((title) =>{
            title.remove()
            })
        }
       
        manghwaCopy.map((title) => {
            const name = title.name.toLowerCase()
            if(name.includes(searchValue)){
                searchArray.push(title)
            }
        })
        setManghwa(searchArray)
    }

    useEffect(() =>{
        fetchTitles()
    },[])
    

    ////////////////
   return(
    <>
        <Header />
        <div className="allTitlesContainer">
            <div className="selectorContainer">
                <h2 className="homeTextSub">🐾 All Titles</h2>
                <div className="searchContainer">
                <input type="text" placeholder="🔎︎ Search.." className="searchText" onChange={searchFunction}></input>
                </div>
            </div>
            <div className="border" />
            {
                manghwa == undefined || manghwa.length <= 0? <h3>No results.</h3>:
                manghwa.map((title) =>{
                    return <CreateAllTitlesCards key={title.id} data={title} />
                })
            }
        </div>
        <Footer />
    </>
   )
}