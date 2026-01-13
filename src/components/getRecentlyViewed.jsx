export const GetRecentlyViewed = (data) =>{
    const userName = data.data

    const fetchRecentlyViewed = async () =>{
        const url = "https://black-cat-api-render.onrender.com/getRecentlyViewed/"+userName
        try {
            const request = await fetch(url)
            const response = await request.json()
            
        } catch (error) {
            console.log(error)
        }
    }
}