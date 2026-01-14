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
    const [updatedManghwas,setUpdatedManghwas] = useState()
    const [newUpdate,setNewUpdate] = useState()
    let manghwaArray = []
    let updateStatus = ""

    const getTitles = async () =>{
        const button = document.getElementById("updateButton")
        const statusText= document.getElementById("status")
        const updatingListText = document.getElementById("list")

        button.setAttribute('disabled','')
        button.style.animation = "buttonAnim .5s ease-in-out infinite alternate"
        
        let count = 1
        const textInterval = setInterval(() => {
            if(updateStatus == "completed"){
                clearInterval(textInterval)
            }

            if(count == 1){
                button.textContent = "Updating."
            }

            if(count == 2){
                button.textContent = "Updating.."
            }

            if(count == 3){
                button.textContent = "Updating..."
                count = 0
            }
            count++
        },1000)
        

        statusText.textContent = "Please wait while we update the titles. Do not close this page."
        updatingListText.textcontent = "0% -- Currently fetching titles..."
        try {
            const request = await fetch('https://black-cat-api.vercel.app/allTitles')
            // const request = await fetch('http://localhost:3000/allTitles')
            const response = await request.json()
            updatingListText.textcontent = "25% -- Titles fetched - "+ response.length
            setManghwas(response)
        } catch (error) {
            console.log(error)
        }
    }

    const compareChapters = async () =>{
        const updatingListText = document.getElementById("list")
        const listLength = manghwas.length + 1
        try {
            await manghwas.map((manghwa) =>{
                let arr = []
                const data = manghwa.code + ":" + manghwa.chapters
                arr.push(data)
                manghwaArray.push(arr)
            })
            const body = encodeURIComponent(manghwaArray.join("|"))
            updatingListText.textcontent = "50% -- Checking title updates..."
            // const request = await fetch("http://localhost:5040/MHLastChapter/"+body)
            const request = await fetch("https://black-cat-api-render.onrender.com/MHLastChapter/"+body)
            const response = await request.json()
            updatingListText.textcontent = "75% -- Checking updates complete..."
            if(response.length > 0){
                updateChapters(response)
            } else {
                updateText(0)
            }
            
        } catch (error) {
            console.log(error)
        } 
    }

    const updateChapters = async (data) =>{
        const body = {
            data:data
        }
        const JSONBody = JSON.stringify(body)
        console.log(JSONBody)
        const header = {
            method:'PUT',
            body:JSONBody,
            headers:{"content-type":"application/json"}
        }
        updatingListText.textcontent = "85% -- Updating - " + data.length + " title(s)"
        try {
            const request = await fetch('https://black-cat-api.vercel.app/updateChapters/',header)
            // const request = await fetch('http://localhost:3000/updateChapters/',header)
            const response = await request.json()
            updateText(parseInt(response))
        } catch (error) {
            console.log(error)
        }
    }

    const updateText = (numOfUpd) =>{
        const button = document.getElementById("updateButton")
        const statusText= document.getElementById("status")
        const updatingListText = document.getElementById("list")
        const listLength = manghwas.length + 1
        
        if(numOfUpd > 0){
            const text = "✅️ " + numOfUpd +" title(s) has been updated."
            statusText.textContent = text
        } else {
            statusText.textContent = "👍 All titles are currently up-to-date."
        }
        updatingListText.textContent = "Titles Checked - ("+listLength+"/"+listLength+")"
        updateStatus = "completed"
        button.textContent = "⟳ Update Complete."
    }

    useEffect(() => {
        if(manghwas != undefined){
            compareChapters()
        }
    },[manghwas])

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