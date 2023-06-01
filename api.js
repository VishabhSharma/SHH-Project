async function searchHeros(textSearched,value) {

    await fetch(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${textSearched}&apikey=9ab871748d83ae2eb5527ffd69e034de&hash=d35377547e551cd64a60657d2517bb7f?ts=1`)
         .then(res => res.json())
         .then(data => updateSearchResult(data.data.results))

}

function updateSearchResult(data){

    let finalString = `<div class="cards">`;
    let dumyString = "";

    data.forEach(element => {
        dumyString = `<div class="card">`;

        dumyString += `<div class="cardNumber"><h3 class="cardNum">${data.indexOf(element) + 1}</h3><div class="addToFav" id="AddToFav" dataset="${element.name}"><img src="/static/heart.svg" alt="fav"></div></div>`; 

        dumyString += `<div class="cardImg"><img src="${element.thumbnail.path +"."+element.thumbnail.extension}" alt="${element.name}"></div>`

        dumyString += `<div class="cardName"><h4 id="cardName" dataset="${element.name}">${element.name.substring(0,12)}</h4></div>`;

        dumyString += `<div class="cardDetails"><div class="cardSeries cardDetail">
        <img src="/static/series.svg" alt=""><h5 id="cardSeries">${element.series.available}</h5></div>
        <div class="cardStories cardDetail"><img src="/static/stories.svg" alt=""><h5 id="cardStories">${element.stories.available}</h5></div></div>`;

        dumyString += `</div>`;

        finalString += dumyString;
        dumyString = "";
    });

    finalString += `</div>`

    if(data.length === 0){
        searchResult.innerHTML = "";
        searchResult.innerHTML = `<div><h5 style="color: wheat;">No element found for this search result</h5></div>`;
    }else{
        searchResult.innerHTML = "";
        searchResult.innerHTML = finalString;
    }

    handleMoreInfo(data);

    handleFavorites(data);

    handleFavMoreInfo();
    handleRemoveFav();
    requestAnimationFrame(a);
}


