import "../css/layout.css"
import logo from "../assets/logo.png"
import { useEffect, useState } from "react"
import menu from "../assets/menu.png"
import { useNavigate, Link } from "react-router"

export const Header = () => {
    const userName = localStorage.getItem("userName")
    const [darkMode,setDarkMode] = useState(false);
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    const checkAccess = localStorage.getItem("userAccess")
    const navigator = useNavigate()

    useEffect(()=>{
        isLoggedIn == null? setTimeout(() => navigator("/"),500):console.log("")
    },[isLoggedIn])

    useEffect(() =>{
        const addNewTitle = document.getElementById("addNewTitle")
        const addNewUser = document.getElementById("addNewUser")
        if(checkAccess == "user"){
            addNewTitle.style.display = "none"
            addNewUser.style.display = "none"
        }
    })

    const DarkMode = () =>{
        const darkModeLabel = document.getElementById("darkModeLabel")
        const darkModeEmoji = document.getElementById("darkModeEmoji")
        const darkModeButton = document.getElementById("darkModeButton")
        const menu = document.getElementById("menu")
        const closeMenu = document.getElementById("closeMenu")
        const body = document.body

        if(darkMode){
            darkModeLabel.textContent = "Off"
            darkModeLabel.setAttribute("style","color:red;")
            darkModeEmoji.textContent = "🌝"
            darkModeButton.setAttribute("style","color:black;")
            menu.style.backgroundColor = "white"
            closeMenu.style.color ="black"
            body.style.animation = "darkModeOff 2s forwards"
            setDarkMode(false)
        } else {
            darkModeLabel.textContent = "On"
            darkModeLabel.setAttribute("style","color:green;")
            darkModeEmoji.textContent = "🌚"
            darkModeButton.setAttribute("style","color:white;")
            menu.style.backgroundColor = "rgb(24, 24, 24)"
            closeMenu.style.color ="white"
            body.style.animation = "darkModeOn 2s forwards"
            setDarkMode(true)
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
            <div className="logoContainer">
                <img src={logo} className="logo"/>
                <a>Black Cat's Cafe</a>
            </div>
            <div className="navContainer">
                <button className="darkMode" id="darkModeButton" onClick={DarkMode}><a id="darkModeEmoji">🌝</a> Dark Mode: <a className="darkModeStatus" id="darkModeLabel">Off</a></button>
                <button className="menuButton" onClick={showMenu}><img src={menu} /></button>
            </div>
            <div className="menu" id="menu">
                <button className="closeMenu" id="closeMenu" onClick={closeMenu}>X</button>
                <div className="subMenu">
                    <h2>👋 Welcome, {userName}</h2>
                    <button className="subMenuButtons">⛉ Bookmarks</button>
                    <button className="subMenuButtons">👁 Recently Viewed</button>
                    <button className="subMenuButtons">𝄜 Request</button>
                    <Link to="/addtitle"><button className="subMenuButtons" id="addNewTitle">✚ Add new title</button></Link>
                    <Link to="/addmember"><button className="subMenuButtons" id="addNewUser">👥 Add new user</button></Link>
                    <button className="subMenuButtons" onClick={logOut} id="logOut">⏻ Logout</button>
                    <p className="accessText">★ {checkAccess.toUpperCase()}</p>
                </div>
                
                
            </div>
            
        </div>
        
    )
}