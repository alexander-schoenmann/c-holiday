"use strict";

import KWM_View from "../kwmJS/core/kwm-view.js";

export default class City{
    constructor(id, city) { //city = acf object
        Object.assign(this, city); //copies all properties of an object to another one; everything from "city" is copied to "this"
        this.id = id; //to also pass the id
    }

    renderListMarkup(container){
        let self = this;
        KWM_View.renderTemplate("city.list", container, { //renderTemplate inserts the subtemplate city.list into the container
            id: this.id,
            name: this.name,
            country: this.country,
            nickname: this.nickname,
            image: this.image,
        }).then(function(){
            return new Promise((resolve, reject)=>{ //returns a promise when everything is done
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
        }).then(async function (){ //use async to enable await
            self.addFavHandler(self.id);
            let hotelsOfCity = await window.Core.model.getHotelsOfCity(self.id); //inside of then the scope of this is wrong
            let hotels_container = document.getElementById("hotels_of_city");
            for(let hotel of hotelsOfCity){
                let div = document.createElement("div");
                div.classList.add("hotel");
                hotels_container.append(div);
                hotel.renderListMarkup(div); //into this div the hotel renders its ListMarkup
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