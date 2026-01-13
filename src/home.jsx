import { useNavigate } from "react-router"
import { Header } from "./layout/header"
import { CreateCards } from "./components/createCards"
import "./css/home.css"
import { Footer } from "./layout/footer"
import { Link } from "react-router"


export const Home = () =>{
    const userName = localStorage.getItem("userName")
    
    return(
        <>
            <Header />
            <div className="homeContainer">
                <div className="homeTextContainer">
                    <h2 className="homeTextMain">Top Read</h2>
                </div>
                <div className="titlesContainer">
                    <CreateCards key="TR" type="TR"/>
                </div>

                <div className="homeTextContainer">
                    <h2 className="homeTextSub">Latest Updates</h2>
                </div>
                <div className="titlesContainer">
                    <CreateCards key="LU" type="LU"/>
                </div>

                <div className="homeTextContainer">
                    <h2 className="homeTextSub">New Release</h2>
                </div>
                <div className="titlesContainer">
                    <CreateCards key="NR" type="NR"/>
                </div>

                <div className="homeTextContainer">
                    <h2 className="homeTextSub">Completed</h2>
                    <Link to="/all/completed" className="viewMore">View More  </Link>
                </div>
                <div className="titlesContainer">
                    <CreateCards key="CO" type="CO"/>
                </div>
            </div>
            <Footer />
            
       
        </>
    )
    
}