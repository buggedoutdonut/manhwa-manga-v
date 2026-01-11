import { useParams } from "react-router"
import { Header } from "./layout/header"
import { Footer } from "./layout/footer"
import "./css/titleInfo.css"
import { useEffect, useState } from "react"
import { CreateTitleInfoCard } from "./components/titleInfoCard"
import { CreateTitleInfoChapters } from "./components/titleInfoChapters"

export const TitleInfo = () => {
    const [data,setData] = useState()
    const {id,code} = useParams()
    
    const getTitleData = async () =>{
        const url = "/api/v1/getTitleData/"+id
        
        try {
            const request = await fetch(url)
            const response = await request.json()
            setData(response[0])
        } catch (error) {
            console.log(error)
        }
    }

    const addVisit = async () =>{
        const url = "/api/v1/addVisit/"
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
                        {data == undefined? console.log():
                        <CreateTitleInfoCard key={data.id} data={data} />}

                        {data == undefined? console.log():
                        <CreateTitleInfoChapters key="Chapters" data={data.code} />}
                </div>
            <Footer />
        </>
    )
}