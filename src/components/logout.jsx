import { useNavigate } from "react-router"

export const logOut = () =>{
    const navigator = useNavigate()
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userName")
    navigator("/login")
}