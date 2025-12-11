import { Header } from "./layout/header";
import { Footer } from "./layout/footer";
import "./css/add.css"


export const AddNewTitle = () =>{

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
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = date.getDay()
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
        console.log(bodyObj)
        const requestBody = JSON.stringify(bodyObj)
        const url = "http://localhost:3000/addtitle/"

        const requestHeaders = {
            method:"POST",
            body:requestBody,
            headers:{"content-type":"application/json"}
        }

        try {
            const pushData = await fetch(url,requestHeaders)
            clearForm()
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
                    <input name="title" type="text" placeholder="Title" required/>
                    <input name="code" type="text" placeholder="Code" required/>
                    <input name="category" type="text" placeholder="Categories" required/><br/>
                    <textarea name="description" placeholder="Description" required/><br/><br/>
                    <select name="status" id="access">
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                        <option value="Hiatus">Hiatus</option>
                        <option value="Axed">Axed</option>
                    </select><br/><br/>
                    <label>Release Date: </label><br/>
                    <input name="release" id="releaseDate" type="date" placeholder="Release Date" required/><br/><br/>
                    <button className="addTitleBtn">Add title</button>
                </form>
            </div>
            <Footer />
        </>
    )
}