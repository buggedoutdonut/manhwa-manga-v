import { useParams } from "react-router"
import { Header } from "./layout/header"
import { Footer } from "./layout/footer"
import "./css/titleInfo.css"
import { useEffect, useState } from "react"
import { CreateTitleInfoCard } from "./components/titleInfoCard"
import { CreateTitleInfoChapters } from "./components/titleInfoChapters"
import loadingImg from "./assets/book-flip.gif"

export const TitleInfo = () => {
    const [data,setData] = useState()
    const {id,code} = useParams()
    
    const getTitleData = async () =>{
        const url = "https://black-cat-api.vercel.app/getTitleData/"+id
        
        try {
            const request = await fetch(url)
            const response = await request.json()
            setData(response[0])
        } catch (error) {
            console.log(error)
        }
    }

    const addVisit = async () =>{
        const url = "https://black-cat-api.vercel.app/addVisit/"
        const body = {}
        body['id'] = data.id
        body['visits'] = data.visits
        const requestBody = JSON.stringify(body)
        const header = {
            method:"PUT",
            body:requestBody,
            headers:{"content-type":"application/json"}
        }

        try {
            const request = await fetch(url,header)
        } catch (error) {
            console.log(error)
        }   
    }

    useEffect(()=>{
        getTitleData()
    },[])

    if(data != undefined){
        addVisit()
    }

    return (
        <>
            <Header />
                <div className="titleInfoMainContainer">              
                        {data == undefined? <div className="loadingContainer"><img src={loadingImg} className="titleLoading"></img><h3 className="titleLoadingText">Please wait while we load the details.</h3></div>:
                        <CreateTitleInfoCard key={data.id} data={data} />}

                        {data == undefined? <></>:
                        <CreateTitleInfoChapters key="Chapters" data={data.allChapters} code={code}/>}
                </div>
            <Footer />
        </>
    )
}