import "../css/allTitlesCards.css"
import { Link } from "react-router"

export const CreateAllTitlesCards = ({data,recentChapter}) =>{

    const title = data
    let link = "/titleInfo/"+title.id+"/"+title.code
    let chText = "Chapters - "+title.chapters
    console.log(chText)
    let name = title.name
    if(title.name.length > 16){
        name = title.name.slice(0,17) + ".."
    }


    if(recentChapter != undefined){
        chText = "Last Read - "+recentChapter
        link = "/readnow/"+title.code+"/"+recentChapter
    } 

    return(
        <Link to={link}>
            <div className="titleContainer">
                <img src={title.imageLink} /> <br/>
                <span className="text">{name}</span><br/>
                <span className="subText">{chText}</span>
            </div>
        </Link>
    )
}