import { useEffect, useReducer, useState } from "react"
import { CreateAllTitlesCards } from "./components/allTitlesCards"
import "./css/allManghwa.css"
import { Footer } from "./layout/footer"
import { Header } from "./layout/header"
import logo from "./assets/logo.png"

export const AllFavorites = () =>{
    const [manghwa,setManghwa] = useState()
    const [manghwaCopy,setManghwaCopy] = useState()
    const [isRefreshed, setIsRefreshed] = useState(false)
    const [favorites,setFavorites] = useState()
    const [favoritesCopy,setFavoritesCopy] = useState()
    const userName = localStorage.getItem('userName')
    let favoritesDetailsArray = []
    let searchArray = []

    const fetchFavorites = async() =>{
        const url = "https://black-cat-api-render.onrender.com/getFavorites/"+userName

        try {
            const request = await fetch(url)
            const response = await request.json()
            const splitFavorites = response[0].favorites.split(",")
            setFavorites(splitFavorites)
            setFavoritesCopy(splitFavorites)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchFavoriteDetails = async() =>{
        if(favorites != undefined || favorites != null){
           const ids = favorites.filter(id => id != "")
           try {
                const favoritesPromise = ids.map(async(id) =>{
                    const request = await fetch('https://black-cat-api-render.onrender.com/v1/getTitleData/'+id)
                    const response = await request.json()
                    return response[0]
                })

                const favoritesDetails = await Promise.all(favoritesPromise)
                setManghwa(favoritesDetails)
                setManghwaCopy(favoritesDetails)
           } catch (error) {
                console.log(error)
           }
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
        fetchFavorites()
    },[])

    useEffect(() =>{
        fetchFavoriteDetails()
    },[favorites])

    useEffect(() =>{
        setManghwa(favoritesDetailsArray)
        setManghwaCopy(favoritesDetailsArray)
        console.log(manghwa)
    },[isRefreshed])

    ////////////////
   return(
    <>
        <Header />
        <div className="allTitlesContainer">
            <div className="selectorContainer">
                <h2 className="allManghwaText">⭐ Favorites</h2>
                <input type="text" placeholder="🔎︎ Search.." className="searchText" onChange={searchFunction}></input>
            </div>
            <div className="border" />
            {
                manghwa == undefined? <div className="loadingContainer"><img src={logo} className="loadingAnim" width="50"/><br/><h3>Loading titles..</h3></div>:
                manghwa.length <= 0 && manghwa != undefined? <h3>No results.</h3>:
                manghwa.map((title) =>{
                    return <CreateAllTitlesCards key={title.id} data={title} />
                })
            }
        </div>
        <Footer />
    </>
   )
}