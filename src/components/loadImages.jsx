export const LoadImages = ({img}) =>{


    const loadImg = async(link) => {
                console.log(link)
                const miniCont = document.getElementById(link)
                const testim = document.createElement("IMG")
                testim.src = link + ".jpg";
                testim.setAttribute("id","manhwaimg")
                testim.setAttribute("style","width:100%;")
                testim.onerror = function(){
                    testim.src = link + ".webp";
                        testim.onerror = function(){
                            testim.src = link + ".jpeg";
                            testim.onerror = function(){
                                testim.src = link + ".png";
                                testim.onerror = function(){
                                    testim.src = link +"a.jpg"
                                        testim.onerror = function(){
                                        testim.src = link + "b.jpg";
                                            testim.onerror = function(){
                                                testim.src = link + "d.jpg";
                                                testim.onerror = function(){
                                                    testim.remove()
                                                    miniCont.remove()
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    if(testim != null || testim != undefined){
                        miniCont.append(testim)
                    }
            }

        
        setTimeout(() => {
            loadImg(img)
        },5000)
        

    return(
        <div id={img} className="mImg">
            
        </div>
    )
}