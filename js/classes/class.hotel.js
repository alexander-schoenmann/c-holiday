"use strict";

import KWM_View from "../kwmJS/core/kwm-view.js";

export default class Hotel{
    constructor(id, hotel) { //hotel = acf Objekt
        Object.assign(this, hotel);
        this.id = id;
        console.log(this);
    }



    renderListMarkup(container){
        let self = this;
        let stars = "";
        let noStars = "";
        for(let i = 0; i < this.stars; i++)
            stars += "⭐";
        for(let i = 0; i < (5 - this.stars); i++)
            noStars += "⭐";

        KWM_View.renderTemplate("hotel.list", container, {
            id: this.id,
            name: this.name,
            price: Math.round(this.price),
            stars: stars,
            noStars: noStars,
            image: this.images[0].src
        }).then(function (){
            return new Promise((resolve, reject) => {
                self.addFavHandler(self.id);
                resolve();
            });
        })
    }

    renderSingleMarkup(container){
        let self = this;
        let stars = "";
        let noStars = "";
        for(let i = 0; i < this.stars; i++)
            stars += "⭐";
        for(let i = 0; i < (5 - this.stars); i++)
            noStars += "⭐";

        KWM_View.renderTemplate("hotel.single", container, {
            name: this.name,
            price: Math.round(this.price),
            stars: stars,
            noStars: noStars,
            image: this.images[0].src,
            id: this.id,
        }).then(async function(){
            self.addFavHandler(self.id);
            for(let i = 0; i < self.images.length; i++){
                //img tag
                let img = document.createElement("img");
                img.setAttribute("src", self.images[i].src);
                img.classList.add("d-block", "w-100", "galleryImage");
                //div tag
                let div = document.createElement("div");
                div.classList.add("carousel-item");
                if(i === 0){
                    div.classList.add("active");
                }
                //add img to div
                div.appendChild(img);
                //add div to hotel_gallery
                document.getElementById('hotel_gallery').appendChild(div);
            }
            for(let i = 0; i < self.amenities.length; i++){
                let tr = document.createElement("tr");
                let tdCheck = document.createElement("td");
                let tdName = document.createElement("td");
                tdCheck.textContent = "✔\xa0";
                tdName.textContent = self.capitalizeFirstLetter(self.amenities[i]);
                tr.appendChild(tdCheck);
                tr.appendChild(tdName);
                document.getElementById('equipment').appendChild(tr);
            }
            document.getElementById('websiteLink').setAttribute("href", self.website);
            document.getElementById('phoneNumber').textContent = self.phone;
            document.getElementById('mailAddress').textContent = self.email;
            document.getElementById('hotelDescription').textContent = self.description;

            document.getElementById('streetAddress').textContent = self.address;

            let long = self.longitude;
            let lat = self.latitude;
            let map = L.map('map').setView([0, 0], 1);
            L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=tQg95IYWQwaHA9lsWn9P', {
                attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
            }).addTo(map);
            let marker = L.marker([lat, long]).addTo(map);
        })
    }

    addFavHandler(id){
        let fav_button = document.querySelectorAll(".favourite.hotel[data-id='"+id+"']")[0];
        if(window.Core.model.isFavourite("hotels", id))
            fav_button.classList.add("is_favourite");
        fav_button.addEventListener("click", function(e){
            e.preventDefault();
            window.Core.model.toggleFavourite("hotels", id);
            fav_button.classList.toggle("is_favourite");
        });
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }




}