import { useEffect, useState } from "react"
import "../css/createCards.css"
import { Link } from "react-router"


export const CreateCards = (type) =>{
    const [list,setList] = useState(null)
    const divId = []

    const changeFlavorText = () =>{
        divId.map((id) =>{
            const flavorText = document.createElement("span")
            const mCards = document.getElementById(id)
            const title = document.querySelector('span[title='+id+'')
        
            if(type.type == "TR"){
                flavorText.setAttribute("class","flavorText")
                flavorText.style.color = "white"
                flavorText.style.backgroundColor = "red"
                flavorText.textContent = "HOT"
                mCards.insertBefore(flavorText, title)
            } else {
                flavorText.setAttribute("class","flavorText")
                flavorText.style.color = "white"
                flavorText.style.backgroundColor = "green"
                type.type == "CO"? flavorText.textContent = "BINGE NOW":
                type.type == "LU"? flavorText.textContent = "NEW UPDATE": flavorText.textContent = "NEW"
                mCards.insertBefore(flavorText, title)
            }
        })
        
    }

    //Fetch all data from DB based on category
    const getList = async () =>{
        const url = 'https://black-cat-api-render.onrender.com/getTopSix/'+type.type

        try {
            const request = await fetch(url)
            const response = await request.json()
            setList(response)
        } catch (error) {
            console.log(error)
        }
        
    }
    
    //Start functions on page load
    useEffect(()=>{
        getList()
    },[type])

    useEffect(() =>{
        changeFlavorText()
    })

    return(
        list != null? 
            list.map(element => {
                let title = type.type+element.id
                let linkTo = "/titleInfo/"+element.id+"/"+element.code
                let name = element.name
                name.length < 18 ? console.log():name = name.slice(0,18) + ".."
                let subTitle = "Chapters - " + element.chapters;
                divId.push(title)
                if(type.type == "LU"){
                    subTitle = "Chapter #" + element.chapters;
                }
                    return <Link to = {linkTo}>
                        <div className="mCards" id={title}>
                        <img src={element.imageLink} height="200" width="165"/><br/>
                        <span class="title" title={title}>{name}</span>
                        <span class="chapters">{subTitle}</span></div>
                        </Link>
        }):console.log("")      
    )
}