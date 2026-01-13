import { useEffect, useState } from "react"
import "../css/titleInfo.css"

export const CreateTitleInfoCard = (data) =>{
    const [updatedText,setUpdatedText] = useState()
    const [favorite,setFavorite] = useState([])
    let favoriteTextPlaceHolder = ""
    const manghwa = data.data
    const id = manghwa.id.toString()
    const userName = localStorage.getItem('userName')
    const category = manghwa.category.split(',')
    const rUpdate = manghwa.recentUpdate.indexOf('T')
    const cleanDate = manghwa.recentUpdate.slice(0,rUpdate)
    const lastUpdate = new Date(cleanDate)
    const dateToday = new Date()

    const msLastUpdate = dateToday - lastUpdate
    const daysLastUpdate = parseInt(msLastUpdate / (1000 * 60 * 60 * 24))
    
    useEffect(() =>{
        if(daysLastUpdate <= 0){
            setUpdatedText("Today")
        }

        if(daysLastUpdate > 0){
            setUpdatedText(daysLastUpdate + " day(s) ago")
        }

        getFavorites()
    },[])



    const getFavorites = async () =>{
        const url = "https://black-cat-api-render.onrender.com/getFavorites/"+userName
        try {
            const request = await fetch(url)
            const response = await request.json()
            if(response[0].favorites == null || response[0].favorites == undefined){
                setFavorite([])
            } else {
                const allFavorites = response[0].favorites.split(",")
                setFavorite(allFavorites)
            }
        } catch (error) {
           console.log(error) 
        }
    }

    const addFavorite = async () =>{
        const favoriteText = document.getElementById("favoriteText")
        let text = ""
        if(favorite.includes(id)){
            const index = favorite.indexOf(id)
            favorite.splice(index,1)
            text = "☆ Add to favorites"
        } else {
            favorite.push(id)
            text = "★ Favorited"
        }
        
        const body = {
                'user':userName,
                'favorites': favorite.join(",")
                 }

        const jsonFavorites = JSON.stringify(body)

        const url = "https://black-cat-api-render.onrender.com/updateFavorites"
        const header = {
            method:"PUT",
            body: jsonFavorites,
            headers:{'content-type':'application/json'}
        }

        try {
            const request = await fetch(url,header)
            favoriteText.textContent = text
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const favoriteText = document.getElementById("favoriteText")
        if(favorite.includes(id) == true){
            favoriteText.textContent = "★ Favorited"
        } else {
            favoriteText.textContent= "☆ Add to favorites"
        }
    },[favorite])
  

    
    return(
        <div className="titleInfoSubContainer">
            <img src={manghwa.imageLink} height="400" width="300" />
            <div className="titleDetailsContainer">
                <div className="titleText"> 
                    <span className="titleBar"></span>
                    <a>{manghwa.name}</a>
                </div><br/>
                <div className="categoryContainer">
                    {
                        category.map((category)=>{
                            return <span className="categoryText">{category}</span>
                        })
                    }
                </div>

                <div className="descriptionText">
                    {manghwa.description}
                </div>
                
                <div className="miniDetailsContainer">

                    <div className="statusText">
                        {manghwa.status}
                    </div>

                    <div className="statusText">
                        Chapters - {manghwa.chapters}
                    </div>

                    <div className="statusText">
                        Last Update - {updatedText}
                    </div>

                    <div className="statusText">
                        Visits - {manghwa.visits}
                    </div>

                    <div className="statusText">
                        Likes - {manghwa.likes}
                    </div>

                    <div className="statusText" onClick={addFavorite}>
                        <span className="favorite"  id="favoriteText"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}