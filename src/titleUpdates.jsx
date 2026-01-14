import { Footer } from "./layout/footer"
import { Header } from "./layout/header"
import "./css/titleUpdate.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

export const CheckTitleUpdates = () =>{
    
    const userAccess = localStorage.getItem("userAccess")
    const navigator = useNavigate()

    //Validate if user has admin privilege
    useEffect(() =>{
        userAccess == "user"? navigator("/home"):console.log("")
        console.log("")
    },[userAccess])

    const [manghwas,setManghwas] = useState()
    const [newUpdate,setNewUpdate] = useState()
    let updatedTitles = 0


    const getTitles = async () =>{
        const button = document.getElementById("updateButton")
        const statusText= document.getElementById("status")

        button.setAttribute('disabled','')
        button.style.backgroundColor = "gray";
        button.textContent = "Updating..."

        statusText.textContent = "Please wait while we update the titles. Do not close this page."
        try {
            const request = await fetch('https://black-cat-api.vercel.app/allTitles')
            const response = await request.json()
            setManghwas(response)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const compareChapters = async () =>{
        const updatingListText = document.getElementById("list")
        const listLength = manghwas.length + 1
        try {
            const names = await manghwas.map(async(manghwa) =>{
                const request = await fetch('https://black-cat-api-render.onrender.com/MHLastChapter/'+manghwa.code)
                updatingListText.textContent = "⏳ Currently Checking ("+manghwa.id+"/"+ listLength +") - "+manghwa.name
                const response = await request.json() 
                    if(parseFloat(response) > parseFloat(manghwa.chapters)){
                        await updateChapters(manghwa.id,parseFloat(response))
                        return updatedTitles += 1
                    }
            })

            const promises = await Promise.all(names)
            updateText()
        } catch (error) {
            console.log(error)
        }

        
    }

    const updateChapters = async (id,chapter) =>{
        const body = {
            id:id,
            chapter:chapter
        }
        const JSONBody = JSON.stringify(body)
        const header = {
            method:'PUT',
            body:JSONBody,
            headers:{"content-type":"application/json"}
        }

        try {
            const request = await fetch('https://black-cat-api.vercel.app/updateChapters',header)
        } catch (error) {
            console.log(error)
        }
    }

    const updateText = () =>{
        const button = document.getElementById("updateButton")
        const statusText= document.getElementById("status")
        const updatingListText = document.getElementById("list")
        const listLength = manghwas.length + 1
        
        if(updatedTitles > 0){
            const text = "✅️ " + updatedTitles +" title(s) has been updated."
            statusText.textContent = text
        } else {
            statusText.textContent = "👍 All titles are currently up-to-date."
        }
        updatingListText.textContent = "Titles Checked - ("+listLength+"/"+listLength+")"
        button.textContent = "⟳ Update Complete."
    }

    useEffect(() => {
        if(manghwas != undefined){
            compareChapters()
        }
    },[manghwas])

    console.log(updatedTitles)
    return (
        <>
            <Header />
                <div className="titleUpdateContainer">
                    <h2>🔄 Check Updates</h2><br/>
                    <button id="updateButton" className="updateButton" onClick={getTitles}>⟳ Run Update</button>
                    <p className="status" id="status"></p>
                    <p className="list" id="list">
                    </p>
                </div>
            <Footer />
        </>
    )
}