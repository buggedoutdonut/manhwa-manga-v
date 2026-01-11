import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './css/login.css'
import { Navigate, redirect, useNavigate, useNavigation } from 'react-router'



export const Login = () =>{
    const [name,setName] = useState("");
    const [pass,setPass] = useState("");
    const [access,setAccess] = useState("");
    let navigator = useNavigate()
    
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    const userName = localStorage.getItem("userName")
    const password = localStorage.getItem("password")
    
    const checkAuthentication = async () =>{
        if(userName != null && password != null){
            const url = "http://localhost:3000/login/"+userName+"/"+password
            try {
                const request = await fetch(url)    
                const response = await request.json()

                if(response == 0){
                    localStorage.setItem("isLoggedIn",null)
                    localStorage.setItem("userName",null)
                    localStorage.setItem("password",null)
                    setTimeout(() => navigator("/login"),1500)
                } else {
                    localStorage.setItem("isLoggedIn",true)
                    setTimeout(() => navigator("/home"))
                }
            } catch (error) {
                    console.log(error)
            }
            console.log(isLoggedIn)
        } 
    }

    useEffect(()=>{
        checkAuthentication()
    },[])


    const handleForm = async (e) =>{
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const username = formData.get('username')
        const password = formData.get('password')
        const encodedUsername = encodeURIComponent(username.toLowerCase())
        const encodedPassword = encodeURIComponent(password)
        const url = "http://localhost:3000/login/"+encodedUsername+"/"+encodedPassword
        const response = await fetch(url)
        const parseResponse = await response.json()
        
        
        
        const loginUpdate = document.createElement("h3")
        if(parseResponse == 0){
            loginUpdate.textContent = "Incorrect username/password."
            loginUpdate.setAttribute("style","color:red")
            loginUpdate.setAttribute("id","update")
        } else {
            const checkAccess = parseResponse['access'][0]
            loginUpdate.textContent = "Login sucessful. Redirecting..."
            loginUpdate.setAttribute("style","color:green")
            loginUpdate.setAttribute("id","update")
            setTimeout(() => navigator("/home"), 1500)
            localStorage.setItem("userAccess",checkAccess["access"])
            localStorage.setItem("isLoggedIn",true)
            localStorage.setItem("userName",encodedUsername)
            localStorage.setItem("password",encodedPassword)
        }
    
        const form = document.getElementById("form")
        const update = document.getElementById("update")
        if(update != null){
            update.remove()
        }
        form.append(loginUpdate)
        

    }

    return(
      
            <div className="mainContainer">
                <div className="loginFormContainer" id="form">
                <h2>SIGN IN</h2>
                    <form onSubmit={handleForm}>
                        <input name="username" type="text" placeholder="Username" maxLength={10}/><br/>
                        <input name="password" type="password" placeholder="Password" maxLength={10}/> <br/>
                        <button>Login</button>
                    </form>
                </div>
            </div>
            
        
    )
}
