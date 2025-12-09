import { useNavigate } from "react-router"
import { Header } from "./layout/header"
import { CreateCards } from "./components/createCards"
import "./css/home.css"
import { Footer } from "./layout/footer"


export const Home = () =>{
    const userName = localStorage.getItem("userName")
    
    return(
        <>
            <Header />
            <div className="homeContainer">
                <div className="homeTextContainer">
                    <h2 className="homeTextMain">Top Read</h2>
                    <a>View More ➤ </a>
                </div>
                <div className="titlesContainer">
                    <CreateCards />
                    <CreateCards />
                    <CreateCards />
                    <CreateCards />
                    <CreateCards />
                    <CreateCards />
                </div>

                <div className="homeTextContainer">
                    <h2 className="homeTextSub">Latest Updates</h2>
                    <a>View More ➤ </a>
                </div>
                <div className="titlesContainer">
                    <CreateCards />
                    <CreateCards />
                    <CreateCards />
                    <CreateCards />
                    <CreateCards />
                    <CreateCards />
                </div>

                <div className="homeTextContainer">
                    <h2 className="homeTextSub">New Release</h2>
                    <a>View More ➤ </a>
                </div>
                <div className="titlesContainer">
                    <CreateCards />
                    <CreateCards />
                    <CreateCards />
                    <CreateCards />
                    <CreateCards />
                    <CreateCards />
                </div>

                <div className="homeTextContainer">
                    <h2 className="homeTextSub">Completed</h2>
                    <a>View More ➤ </a>
                </div>
                <div className="titlesContainer">
                    <CreateCards />
                    <CreateCards />
                    <CreateCards />
                    <CreateCards />
                    <CreateCards />
                    <CreateCards />
                </div>
            </div>
            <Footer />
            
       
        </>
    )
    
}