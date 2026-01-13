import { Header } from "./layout/header";
import { Footer } from "./layout/footer";
import "./css/add.css"
import { useEffect } from "react";
import { useNavigate } from "react-router";



export const AddNewTitle = () =>{

    const userAccess = localStorage.getItem("userAccess")
    const navigator = useNavigate()

    //Validate if user has admin privilege
    useEffect(() =>{
        userAccess == "user"? navigator("/home"):console.log("")
        console.log("")
    },[userAccess])

    const clearForm = () =>{
        
        const getInputFields = document.querySelectorAll("input")
        const getTextArea = document.querySelectorAll("textarea")

        getInputFields.forEach((name,index) =>{
            name.value = ""
        })

        getTextArea.forEach((name,index) =>{
            name.value = ""
        })
    
    }

    const addNewTitle = async (e) =>{
        e.preventDefault()
        const updateText = document.getElementById("updateText")
        const date = new Date()
        const year = date.getFullYear()

        let month = date.getMonth()
            if(month == 0){
                month=1
            } else {
                month += 1
            }
        
        const day = date.getDate()
        const hour = date.getHours()
        const mins = date.getMinutes()
        const seconds = date.getSeconds()

        const currentDate = `${year}-${month}-${day} ${hour}:${mins}:${seconds}`
        
        const formData = new FormData(e.currentTarget)
        const bodyObj = {}

        //Loop through each input field and insert them into bodyObj with input name as key and the input itself as value
        formData.forEach((value,key) =>{
            bodyObj[key] = value
        })

        bodyObj["recent"] = currentDate
   
        const requestBody = JSON.stringify(bodyObj)
        const url = "https://black-cat-api-render.onrender.com/addtitle/"

        const requestHeaders = {
            method:"POST",
            body:requestBody,
            headers:{"content-type":"application/json"}
        }

        try {
            const pushData = await fetch(url,requestHeaders)
            updateText.textContent = "Title has been added."
            updateText.style.color = "green"
            clearForm()
        } catch (error) {
            console.log(error)
            updateText.textContent = error
            updateText.style.color = "red"
        }
    }

    const populateFields = async () =>{
        const title = document.querySelector('input[name="title"]')
        const code = document.querySelector('input[name="code"]')
        const category = document.querySelector('input[name="category"]')
        const chapters = document.querySelector('input[name="chapters"]')
        const imgLink = document.querySelector('input[name="imageLink"]')
        
        console.log(category)
        const url = "https://black-cat-api-render.onrender.com/getChapters/"+code.value

        try {
            const request = await fetch(url)
            const response = await request.json()
            console.log(response)
            title.value = response.title
            chapters.value = response.allchapters.slice(0)[0]
            category.value = response.genre
            imgLink.value = response.imgLink
        } catch (error) {
            console.log(error)
        }

        
    }

    return(
        <>
            <Header />
            <div className="addNewTitleContainer">
                <h2 className="addTitle2">ADD NEW TITLE</h2>
                <form onSubmit={addNewTitle}>
                    <input name="title" type="text" placeholder="Title" required/><br/>
                    <input name="code" type="text" placeholder="Code" className="itemCode" required/>
                    <button className="autoPopulateBtn" type="button" onClick={populateFields}>Populate</button>
                    <br/>
                    <input name="category" type="text" placeholder="Categories" required/><br/>
                    <input type="text" name="chapters" placeholder="Chapters" required/><br/>
                    <input type="text" name="imageLink" placeholder="Image Link" required/><br/><br/>
                    <textarea name="description" placeholder="Description" required/><br/><br/>
                    
                    <select name="status" id="access">
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                        <option value="Hiatus">Hiatus</option>
                        <option value="Axed">Axed</option>
                    </select><br/><br/>
                    <label>Release Date: </label><br/>
                    <input name="release" id="releaseDate" type="date" placeholder="Release Date" required/><br/><br/>
                    <button className="addTitleBtn" type="submit">Add title</button>
                </form>
                <h3 id="updateText"></h3>
            </div>
            <Footer />
        </>
    )
}