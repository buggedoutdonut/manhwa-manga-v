import { Header } from "./layout/header"
import { Footer } from "./layout/footer"
import "./css/add.css"
import { useState } from "react"



export const AddMember = () =>{
    const [textUpdate,setTextUpdate] = useState(false)

    const addNewMember = async(e) => {
        const container = document.getElementById("addContainer")
        const username = document.getElementById("username")
        const password = document.getElementById("password")
        const access = document.getElementById("access")
        
        e.preventDefault()
        const validateUser = await fetch("http://localhost:3000/validateUser/"+username.value)
        const parseResponse = await validateUser.json()
        console.log(parseResponse)

        if(parseResponse == 0){
            console.log("HAHAHAHA")
            const url = "http://localhost:3000/addmember/"
            const data = {
                    username:username.value,
                    password:password.value,
                    access:access.value
                }
            const headers = {
                method:"POST",
                body:JSON.stringify(data),
                headers:{"content-type":"application/json"}
            }
            try {
                const pushData = await fetch(url,headers)
                const response = await pushData.json()
            } catch (error) {
                console.log(error)
            }

            if(textUpdate){
                    const checkUpdate = document.getElementById("updateText")
                    checkUpdate.remove()
            }
                
            const update = document.createElement("h5")
            update.textContent = "Member have been added."
            update.style.color = "green"
            update.setAttribute("id","updateText")
            container.append(update)
            setTextUpdate(true)
            
        } else {
            if(textUpdate){
                const checkUpdate = document.getElementById("updateText")
                checkUpdate.remove()
            }
            const update = document.createElement("h5")
            update.textContent = "Username is not available."
            update.style.color = "red"
            update.setAttribute("id","updateText")
            container.appendChild(update)
            setTextUpdate(true)
            console.log(textUpdate)
        }
        
 
    }
    

    return(
        <>
            <Header />
                <div className="addContainer" id="addContainer">
                    <h2 className="addTitle">Add new member</h2>
                    <form className="form" onSubmit={addNewMember}>
                        <input id="username" name="username" type="text" placeholder="Username" maxLength={10}/>
                        <input id="password" name="password" type="password" placeholder="Password" maxLength={10}/>
                        <br/><select name="access" id="access">
                            <option value="admin">ADMIN</option>
                            <option value="user">USER</option>
                        </select>
                        <button className="addButton">Add member</button>
                    </form>
                </div>
            <Footer />
        </>
    )
 
}
