import "../css/footer.css"
import discordLogo from "../assets/discord-logo.jpg"
import facebookLogo from "../assets/facebook-logo.png"
import linkedInLogo from "../assets/linkedin-logo.jpg"
import reactLogo from "../assets/react-logo.png"
import cssLogo from "../assets/css-logo.png"
import jsLogo from "../assets/js-logo.png"
import nodeLogo from "../assets/node-logo.png"
import pgreLogo from "../assets/pgre-logo.png"
import { Link } from "react-router"




export const Footer = () => {
    return(
        <>
            <div className = "footerMain">
                <div className ="footerSubContainerDisc">
                    <h4>🚨 DISCLAIMER</h4>
                    <p className="disclaimer">This website operates strictly as a non-commercial, personal-use platform. 
                        No revenue is generated from the display or distribution of any content. 
                        All copyrighted materials remain the property of their respective copyright holders and are presented here under the assumption of fair personal use. 
                        Upon request from any rights holder, any material will be removed or updated without delay.</p>
                </div>

                <div className ="footerSubContainerAbout">
                    <h4>ℹ️ ABOUT US</h4>
                    <p className="disclaimer"><b>Black Cat Café </b>is a warm, stylish, and community-driven manhwa haven crafted for readers who crave immersive stories, stunning artwork, and a relaxing place to unwind. Whether you're into heart-pounding action, slow-burn romance, supernatural mysteries, or slice-of-life charm,
                     our platform serves up a curated selection of manhwa that satisfies every mood.</p>
                </div>

                <div className ="footerSubContainerSocials">
                    <h4>🌐 MY SOCIALS</h4>
                    <div className="socialsImageContainer">
                        <Link to="#"><button><img src={discordLogo} height="100" width="100"/></button></Link>
                        <Link to="#"><button><img src={facebookLogo} height="100" width="100"/></button></Link>
                        <Link to="#"><button><img src={linkedInLogo} height="100" width="100"/></button></Link>
                    </div>

                    <div className="socialsImageContainer">
                        <button><img src={reactLogo} height="100" width="100"/></button>
                        <button><img src={cssLogo} height="100" width="100"/></button>
                        <button><img src={jsLogo} height="100" width="100"/></button>
                        <button><img src={nodeLogo} height="100" width="100"/></button>
                        <button><img src={pgreLogo} height="100" width="100"/></button>
                    </div>
                </div>

            </div>
        </>
    )
}