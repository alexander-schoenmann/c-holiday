"use strict";

import KWM_View from './../core/kwm-view.js';

export let view = new KWM_View("/", async function (){
    await this.rendering(); //Markup is rendered -> ab jetzt können darauf Eventlistender gesetzt werden
    console.log("Rednering is done"); //Diese nachricht kommt nur, wenn rendering() fertig ist
})

view.rendering = async function(){ //rendering heißt, ich möchte das gesamte Markup erstellen
    //home template kommt in element kwm-body
    await KWM_View.renderTemplate("home", document.getElementById("kwm-body")); //await geht nur wenn function async ist -> wartet auf ergebnis (promise) hinter await
    let cities_container = document.getElementById("cities"); //Übersichtscontainer
    let cities = await window.Core.model.getCities();
    //console.table(cities);

    for(let city of cities){
        //innerhalb von dem div bekommt jede Stadt eine eigene Box
        let div = document.createElement("div");
        div.classList.add("city");
        cities_container.append(div);
        city.renderListMarkup(div); //in das div wird die Listenansicht gerendert
    }



    //FOLLOWING 4 LINES ADDED BY ME
    let button = document.getElementById("logout").addEventListener("click", function (e){
        e.preventDefault();
        window.location.hash = window.Core.router.loginRoute.slug; //startseite wird aufgerufen
    });
}