import "../css/layout.css"
import logo from "../assets/header-logo.png"
import { useEffect, useState } from "react"
import menu from "../assets/menu.png"
import { useNavigate, Link } from "react-router"

export const Header = () => {
    const userName = localStorage.getItem("userName")
    const password = localStorage.getItem("password")
    const BCdarkMode = localStorage.getItem("BCdarkMode")
    const [darkMode,setDarkMode] = useState();
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    const checkAccess = localStorage.getItem("userAccess")
    const body = document.querySelector("body")
    const navigator = useNavigate()
    body.className = "body"
    useEffect(() =>{
        if(BCdarkMode != null || BCdarkMode != undefined){
            setDarkMode(BCdarkMode)
            DarkMode()
        }
    },[])
   
    const checkAuthentication = async () =>{
        const url = "/api/v1/login/"+userName+"/"+password
        try {
            const request = await fetch(url)    
            const response = await request.json()

            if(response == 0){
                localStorage.setItem("isLoggedIn",null)
                localStorage.setItem("userName",null)
                localStorage.setItem("password",null)
                window.alert("Please login.")
                setTimeout(() => navigator("/"))
            } else {
                localStorage.setItem("isLoggedIn",true)
            }
        } catch (error) {
                console.log(error)
        }
        console.log(isLoggedIn)
    }

    useEffect(()=>{
        checkAuthentication()
    },[])

    useEffect(() =>{
        const addNewTitle = document.getElementById("addNewTitle")
        const addNewUser = document.getElementById("addNewUsers")
        const updateTitles = document.getElementById("updateTitles")
        if(checkAccess == "user"){
            addNewUser.style.display = "none"
            addNewTitle.style.display = "none"
            updateTitles.style.display = "none"
            
        }
    })

    const DarkMode = () =>{
        
        const darkModeLabel = document.getElementById("darkModeLabel")
        const darkModeEmoji = document.getElementById("darkModeEmoji")
        const darkModeButton = document.getElementById("darkModeButton")
        const menu = document.getElementById("menu")
        const closeMenu = document.getElementById("closeMenu")
        const body = document.querySelector('.body')
        
        if(darkMode == 'false'){
            darkModeLabel.textContent = "On"
            darkModeLabel.setAttribute("style","color:green;")
            darkModeEmoji.textContent = "🌚"
            darkModeButton.setAttribute("style","color:white;")
            menu.style.backgroundColor = "rgb(24, 24, 24)"
            closeMenu.style.color ="white"
            body.style.animation = "darkModeOn .5s forwards"
            setDarkMode('true')
            localStorage.setItem('BCdarkMode','true')
        }
        
        if(darkMode == 'true'){
            darkModeLabel.textContent = "Off"
            darkModeLabel.setAttribute("style","color:red;")
            darkModeEmoji.textContent = "🌝"
            darkModeButton.setAttribute("style","color:black;")
            menu.style.backgroundColor = "white"
            closeMenu.style.color ="black"
            body.style.animation = "darkModeOff .5s forwards"
            setDarkMode('false')
            localStorage.setItem('BCdarkMode','false')
            console.log(darkMode)
        } 
        
        if(BCdarkMode == 'true' && darkMode == undefined || BCdarkMode == null && darkMode == undefined){
            darkModeLabel.textContent = "On"
            darkModeLabel.setAttribute("style","color:green;")
            darkModeEmoji.textContent = "🌚"
            darkModeButton.setAttribute("style","color:white;")
            menu.style.backgroundColor = "rgb(24, 24, 24)"
            closeMenu.style.color ="white"
            body.style.animation = "darkModeOn .5s forwards"
            setDarkMode('true')
        }
        
        if(BCdarkMode == 'false' && darkMode == undefined){
            darkModeLabel.textContent = "Off"
            darkModeLabel.setAttribute("style","color:red;")
            darkModeEmoji.textContent = "🌝"
            darkModeButton.setAttribute("style","color:black;")
            menu.style.backgroundColor = "white"
            closeMenu.style.color ="black"
            body.style.animation = "darkModeOff .5s forwards"
            setDarkMode('false')
        }
    
    }

    const showMenu = () =>{
        const menu = document.getElementById("menu")
        menu.style.padding = "15px"
        menu.style.animation = "openMenu .3s forwards"
    }

    const closeMenu = () =>{
        const menu = document.getElementById("menu")
        menu.style.animation = "closeMenu .3s forwards"
        menu.style.padding = "0"
    }

    const logOut = () =>{
        const logOutButton = document.getElementById("logOut")
        logOutButton.textContent = "⏻ Logging out..."
        logOutButton.style.color = "red"
        localStorage.removeItem("isLoggedIn")
        localStorage.removeItem("userName")
        setTimeout(() => navigator("/"),1500)
    }

    return(
        <div className="topHeader">
            <Link to="/home" className="link"><div className="logoContainer">
                <img src={logo} className="logo"/>
            </div></Link>
            <div className="navContainer">
                <button className="darkMode" id="darkModeButton" onClick={DarkMode}><a id="darkModeEmoji">🌝</a>Dark Mode: <a className="darkModeStatus" id="darkModeLabel">Off</a></button>
                <button className="menuButton" onClick={showMenu}><img src={menu} /></button>
            </div>
            <div className="menu" id="menu">
                <button className="closeMenu" id="closeMenu" onClick={closeMenu}>X</button>
                <div className="subMenu">
                    <h2>👋 Welcome, {userName}</h2>
                    <Link to="/all/favorites"><button className="subMenuButtons">⛉ Favorites</button></Link>
                    <Link to="/all/recentlyviewed"><button className="subMenuButtons">👁 Recently Viewed</button></Link>
                    <Link to="/all"><button className="subMenuButtons" id="addNewUser">🕮 View all Manghwa</button></Link>
                    <Link to="/addtitle"><button className="subMenuButtons" id="addNewTitle">✚ Add new title</button></Link>
                    <Link to="/updatetitles"><button className="subMenuButtons" id="updateTitles">🗘 Check title updates</button></Link>
                    <Link to="/addmember"><button className="subMenuButtons" id="addNewUsers">☻ Add new user</button></Link>
                    <button className="subMenuButtons" onClick={logOut} id="logOut">⏻ Logout</button>
                    <p className="accessText">★ {checkAccess.toUpperCase()}</p>
                </div>
                
                
            </div>
            
        </div>
        
    )
}