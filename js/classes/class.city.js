"use strict";

import KWM_View from "../kwmJS/core/kwm-view.js";

export default class City{
    constructor(id, city) { //city = acf Objekt
        Object.assign(this, city); //alles aus "city" wird auf das this kopiert - wichtig - kopiert alle Eigenschaften eines Obejekts auf ein anderes
        this.id = id; //damit auch die id übergeben wird
    }

    renderListMarkup(container){
        let self = this;
        KWM_View.renderTemplate("city.list", container, { //renderTemplate spielt uns ein Teil Template in den Container
            id: this.id,
            name: this.name,
            country: this.country,
            nickname: this.nickname,
            image: this.image,
        }).then(function(){
            return new Promise((resolve, reject)=>{ //liefert ein Promise wenn das erledigt ist
                self.addFavHandler(self.id);
                resolve();
            });
        });
    }

    renderSingleMarkup(container){
        let self = this;
        KWM_View.renderTemplate("city.single", container, {
            name: this.name,
            country: this.country,
            nickname: this.nickname,
            image: this.image,
            id: this.id
        }).then(async function (){ //async damit await möglich ist
            self.addFavHandler(self.id);
            let hotelsOfCity = await window.Core.model.getHotelsOfCity(self.id); //innerhalb von then ist Scope von this falsch
            let hotels_container = document.getElementById("hotels_of_city");
            for(let hotel of hotelsOfCity){
                let div = document.createElement("div");
                div.classList.add("hotel");
                hotels_container.append(div);
                hotel.renderListMarkup(div); //in dieses Div rendert das Hotel sein ListMarkup
            }
            return new Promise((resolve, reject)=>{
                resolve();
            });
        })
    }

    addFavHandler(id){
        let fav_button = document.querySelectorAll(".favourite.city[data-id='"+id+"']")[0];
        if(window.Core.model.isFavourite("cities", id))
            fav_button.classList.add("is_favourite");
        fav_button.addEventListener("click", function(e){
            e.preventDefault();
            window.Core.model.toggleFavourite("cities", id);
            fav_button.classList.toggle("is_favourite");
        });
    }
}