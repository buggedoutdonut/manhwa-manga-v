import { Header } from "./layout/header"
import { Footer } from "./layout/footer"
import "./css/add.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"



export const AddMember = () =>{
    const [textUpdate,setTextUpdate] = useState(false)
    const userAccess = localStorage.getItem("userAccess")
    const navigator = useNavigate()

    //Validate if user has admin privilege
    useEffect(() =>{
        userAccess == "user"? navigator("/home"):console.log("")
        console.log("")
    },[userAccess])

    const addNewMember = async(e) => {
        e.preventDefault()
        const container = document.getElementById("addContainer")
        const username = document.getElementById("username")
        const password = document.getElementById("password")
        const access = document.getElementById("access")

        
    
        // Validate if fields are blank
        if(username.value == "" || password.value == "" || username.value == "" && password.value == ""){
            if(textUpdate){
                        const checkUpdate = document.getElementById("updateText")
                        checkUpdate.remove()
            }
            const update = document.createElement("h5")
            update.textContent = "The username/password cannot be blank."
            update.style.color = "red"
            update.setAttribute("id","updateText")
            container.append(update)
            setTextUpdate(true)

        } else {

            // Validate if there are duplicate users
            const validateUser = await fetch("api/v1/validateUser/"+username.value.toLowerCase())
            const parseResponse = await validateUser.json()
            console.log(parseResponse)

            // Proceed to add member if there is none
            if(parseResponse == 0){
                const url = "api/v1/addmember/"
                const data = {
                        username:username.value.toLowerCase(),
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
                username.value = ""
                password.value = ""
                
            } else {
                // Display an error if there is a duplicate user with the same username
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
       
        
 
    }
    

    return(
        <>
            <Header />
                <div className="addContainer" id="addContainer">
                    <h2 className="addTitle">ADD NEW MEMBER</h2>
                    <form className="form" onSubmit={addNewMember}>
                        <input id="username" name="username" type="text" placeholder="Username" maxLength={10} required/><br/>
                        <input id="password" name="password" type="password" placeholder="Password" maxLength={10} required/>
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
