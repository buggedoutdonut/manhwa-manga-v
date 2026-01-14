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
    const body = document.querySelector("body")
    body.id = "body"

    const checkAuthentication = async () =>{
        if(userName != null && password != null){
            const url = "https://black-cat-api.vercel.app/login/"+userName+"/"+password
            try {
                const request = await fetch(url)    
                const response = await request.json()

                if(response == 0){
                    localStorage.setItem("isLoggedIn",null)
                    localStorage.setItem("userName",null)
                    localStorage.setItem("password",null)
                    setTimeout(() => navigator("/login"),0)
                } else {
                    localStorage.setItem("isLoggedIn",true)
                    setTimeout(() => navigator("/home"),0)
                    body.id = "#"
                    body.className = "body"
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
        const update = document.getElementById("update1")
        const form = document.getElementById("form")
        let loginUpdate1
        if(update == null){
            loginUpdate1 = document.createElement("h3")
            loginUpdate1.textContent = "Please wait..."
            loginUpdate1.style.color = "Green"
            loginUpdate1.setAttribute("id","update1")
            form.append(loginUpdate1)
        } else {
            update.textContent = "Please wait..."
            update.style.color = "Green"
        }
        
        
        

        const formData = new FormData(e.currentTarget)
        const username = formData.get('username')
        const password = formData.get('password')
        const encodedUsername = encodeURIComponent(username.toLowerCase())
        const encodedPassword = encodeURIComponent(password)
        const url = "https://black-cat-api.vercel.app/login/"+encodedUsername+"/"+encodedPassword
        const response = await fetch(url)
        const parseResponse = await response.json()
        
        const update1 = document.getElementById("update1")
        if(parseResponse == 0){
            update1.textContent = "Incorrect username/password."
            update1.setAttribute("style","color:red")
        } else {
            const checkAccess = await parseResponse['access'][0]
            update1.textContent = "Login sucessful. Redirecting..."
            update1.setAttribute("style","color:green")
            setTimeout(() => navigator("/home"), 100)
            localStorage.setItem("userAccess",checkAccess["access"])
            localStorage.setItem("isLoggedIn",true)
            localStorage.setItem("userName",encodedUsername)
            localStorage.setItem("password",encodedPassword)
            body.id = "#"
            body.className = "body"
        }        

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
