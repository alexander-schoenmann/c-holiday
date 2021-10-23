"use strict";

import KWM_View from './../core/kwm-view.js';

export let view = new KWM_View("/favourites", async function (){
    await this.rendering(); //Markup is rendered -> ab jetzt können darauf Eventlistender gesetzt werden
    console.log("Rednering is done"); //Diese nachricht kommt nur, wenn rendering() fertig ist
})

view.rendering = async function(){ //rendering heißt, ich möchte das gesamte Markup erstellen
    //home template kommt in element kwm-body
    await KWM_View.renderTemplate("favourites", document.getElementById("kwm-body")); //await geht nur wenn function async ist -> wartet auf ergebnis (promise) hinter await

    let cities_container = document.getElementById("cities"); //Übersichtscontainer
    let cities = await window.Core.model.getFavouriteCities();
    //console.table(cities);

    for(let city of cities){
        let div = document.createElement("div");
        div.classList.add("city");
        cities_container.append(div);
        city.renderListMarkup(div); //in das div wird die Listenansicht gerendert
    }

    let hotels_container = document.getElementById("hotels"); //Übersichtscontainer
    let hotels = await window.Core.model.getFavouriteHotels();
    //console.table(cities);

    for(let hotel of hotels){
        let div = document.createElement("div");
        div.classList.add("hotel");
        hotels_container.append(div);
        hotel.renderListMarkup(div); //in das div wird die Listenansicht gerendert
    }

}