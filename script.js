
let FavArray = [];
let searchResult = document.getElementById("searchResult");
let searchInput = document.querySelector(".search input");

searchInput.addEventListener("input",(e)=>{

    if(searchInput.value.length != 0){
        searchResult.setAttribute("class","searchResult visible");
        searchHeros(searchInput.value);
    }else{
         searchResult.setAttribute("class","searchResult hide");
    }
    cardInfo.setAttribute("class","cardInfo hide")

 })


function handleMoreInfo(data){
    let cardName = document.querySelectorAll(".cardName h3")
    let cardInfo = document.getElementById("cardInfo");

    cardName.forEach(element => {
        element.addEventListener("click",()=>{

            cardInfo.setAttribute("class","cardInfo visible");
            data.forEach(e => {
                if(e.name === element.getAttribute("dataset")){
                    
                    cardInfo.innerHTML = `
                        <div class="infoCard">
                        <div class="cardInfoImg">
                            <img src="${e.thumbnail.path +"."+e.thumbnail.extension}" alt="">
                        </div>
                        <div class="information">
                        <div class="headInfo">
                            <h1>${e.name}</h1>
                            <h6>(${e.id})</h6>
                        </div>
                        <div class="description">
                            <h5>${e.description}</h5>
                        </div>
                        <div class="specialItem">
                            <img src="/static/series.svg" alt="">
                            <h3 id="cardSeries">${e.series.available}</h3>
                        </div>
                        <div class="specialItem">
                            <img src="/static/stories.svg" alt="">
                            <h3 id="cardSeries">${e.stories.available}</h3>
                        </div>
                        <div class="specialItem">
                            <img src="/static/hero.svg" alt="">
                            <h3 id="cardSeries">${e.comics.available}</h3>
                        </div>
                        <div class="specialItem">
                            <img src="/static/event.svg" alt="">
                            <h3 id="cardSeries">${e.events.available}</h3>
                        </div>
                        <div class="lastUpdate">
                            <h6>Information Last Update on : ${e.modified.substring(0,10)}</h6> 
                        </div>
                        </div>
                    </div>
                    `
                }
            });
        })
    });
}




let Favorite = document.getElementById("Favorite");
let FavoriteBtn = document.getElementById("FavoriteBtn");
let crossBtn = document.getElementById("crossBtn");

FavoriteBtn.addEventListener("click",()=>{
    if(Favorite.getAttribute("style") === "right: -175%;"){
        Favorite.setAttribute("style","right: -1%;");
        crossBtn.setAttribute("class","crossBtn visible");
        
    }else if(Favorite.getAttribute("style") === "right: -1%;"){
        Favorite.setAttribute("style","right: -175%;");
        crossBtn.setAttribute("class","crossBtn hide");
    }
})

crossBtn.addEventListener("click",()=>{
    if(Favorite.getAttribute("style") === "right: -175%;"){
        Favorite.setAttribute("style","right: -1%;");
        crossBtn.setAttribute("class","crossBtn visible");
        
    }else if(Favorite.getAttribute("style") === "right: -1%;"){
        Favorite.setAttribute("style","right: -175%;");
        crossBtn.setAttribute("class","crossBtn hide");
    }
})








function handleFavorites(data){

    let AddToFav = document.querySelectorAll(".addToFav");

    AddToFav.forEach(element => {
        element.addEventListener("click",()=>{
            
            data.forEach(e => {

                if(e.name === element.getAttribute("dataset")){

                    FavArray.forEach(ele => {
                        if(ele.name === e.name){
                            FavArray.splice(FavArray.indexOf(ele),1);
                        }
                    });

                    FavArray.push({
                        name: e.name,
                        description : e.description,
                        src : e.thumbnail.path +"."+e.thumbnail.extension,
                        id : e.id,
                        series : e.series.available,
                        stories : e.stories.available,
                        comics : e.comics.available,
                        events : e.events.available,
                        date : e.modified.substring(0,10)
                    })

                    updateFav();
                }
            });

        });
    });

}

function updateFav(){

    let string = ``;
    let s = "";
    FavArray.forEach(element => {
        s = "";
        s= `<div class="horiCard"><img src="${element.src}" alt="Hero" class="horCardImage"><h5 class="heroName" dataset="${FavArray.indexOf(element)}">${element.name}</h5><img src="/static/cross.svg"   alt="delete" id="horCardDelete" class="horCardDelete" dataset="${FavArray.indexOf(element)}"></div>`
        string += s;
    });
    string += ``;
    document.getElementById("horiCardList").innerHTML = string;

}




function handleRemoveFav(data){
    let horCardDelete = document.querySelectorAll(".horCardDelete");

    horCardDelete.forEach(element => {
        element.setAttribute("style","cursor:pointer")
        element.addEventListener("click",()=>{
            
            FavArray.splice(element.getAttribute("dataset"),1);
            updateFav();
            
        })

    })


}


function handleFavMoreInfo(data){
    let heroName = document.querySelectorAll(".heroName");
    heroName.forEach(element => {
        element.setAttribute("style","cursor:pointer;")
        element.addEventListener("click",()=>{
            let e = FavArray[element.getAttribute("dataset")];
            let cardInfo = document.getElementById("cardInfo");
            cardInfo.setAttribute("class","cardInfo visible");

            cardInfo.innerHTML = `
                        <div class="infoCard">
                        <div class="cardInfoImg">
                            <img src="${e.src}" alt="">
                        </div>
                        <div class="information">
                        <div class="headInfo">
                            <h1>${e.name}</h1>
                            <h6>(${e.id})</h6>
                        </div>
                        <div class="description">
                            <h5>${e.description}</h5>
                        </div>
                        <div class="specialItem">
                            <img src="/static/series.svg" alt="">
                            <h3 id="cardSeries">${e.series}</h3>
                        </div>
                        <div class="specialItem">
                            <img src="/static/stories.svg" alt="">
                            <h3 id="cardSeries">${e.stories}</h3>
                        </div>
                        <div class="specialItem">
                            <img src="/static/hero.svg" alt="">
                            <h3 id="cardSeries">${e.comics}</h3>
                        </div>
                        <div class="specialItem">
                            <img src="/static/event.svg" alt="">
                            <h3 id="cardSeries">${e.events}</h3>
                        </div>
                        <div class="lastUpdate">
                            <h6>Information Last Update on : ${e.date}</h6> 
                        </div>
                        </div>
                    </div>
                    `

        })
    });

}

function a(){
    handleFavMoreInfo();
    handleRemoveFav();

    requestAnimationFrame(a);
}