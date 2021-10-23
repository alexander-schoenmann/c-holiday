"use strict";

/*
Warum habe ich mich für dieses Storage-System entschieden?
COOKIES:
    Sind gut geeignet als kleiner Textspeicher, werden bei jedem Request übermittelt.
    Wird hier verwendet, um die ausgewählte Sprache zu speichern.
    Haben allerdings ein Ablaufdatum, erlauben nur das Speichern von Text und können keine große Datenmenge speichern (4kB)
LOCAL STORAGE:
    Daten werden als Key-Value Paare gespeichert, haben kein Ablaufdatum und können Daten bis zu 5MB speichern
    Werden hier verwendet, um Favoriten zu speichern.
    Ist allerdings auf den Broswer begrenzt (nicht auf Tabs)
*/

import City from "../../classes/class.city.js";
import Hotel from "../../classes/class.hotel.js";

const api_root = "https://api.neuwersch.kwmhgb.at/wp-json/wp/v2/" //Quelle der API
const filter = "?per_page=100"; //um mehr elemente per api abrufen zu können

export default class KWM_Model{
    constructor() {
        if(window.localStorage.getItem("favourite_cities") == null)
            window.localStorage.setItem("favourite_cities", "[]");
        if(window.localStorage.getItem("favourite_hotels") == null)
            window.localStorage.setItem("favourite_hotels", "[]");
    }

    async getCities(){
        return new Promise(resolve => {
           fetch(api_root+"cities"+filter).then(response => response.json())
               .then(data=>{
                   let cities = [];
                   for(let city of data){
                       cities.push(new City(city.id, city.acf)); //füge dem Array immer neue Daten als Objekt aus der API hinzu
                   }
                   resolve(cities); //Array wird mit resolve im Promise zurückgeliefert
               });
        });
    }

    async getCity(id){
        return new Promise(resolve => {
            fetch(api_root+"cities/"+id).then(response=>response.json())
                .then(city => {
                    resolve(new City(city.id, city.acf));
                })
        })
    }

    async getFavouriteCities(){
        let cities = await this.getCities();
        return new Promise(resolve => {
            let favourite_cities = [];
            for(let city of cities){
                if(window.Core.model.isFavourite("cities", city.id))
                    favourite_cities.push(city);
            }
            resolve(favourite_cities);
        })
    }

    async getHotels(){
        return new Promise(resolve => {
            fetch(api_root+"hotels"+filter).then(response => response.json())
                .then(data=>{
                    let hotels = [];
                    for(let hotel of data){
                        hotels.push(new Hotel(hotel.id, hotel.acf)); //füge dem Array immer neue Daten als Objekt aus der API hinzu
                    }
                    resolve(hotels); //Array wird mit resolve im Promise zurückgeliefert
                });
        });
    }

    async getFavouriteHotels(){
        let hotels = await this.getHotels();
        return new Promise(resolve => {
            let favourite_hotels = [];
            for(let hotel of hotels){
                if(window.Core.model.isFavourite("hotels", hotel.id))
                    favourite_hotels.push(hotel);
            }
            resolve(favourite_hotels);
        })
    }

    async getHotelsOfCity(cityID) {
        //alle Hotels der Stadt holen und prüfen, ob city mit id zusammenpasst
        return new Promise(resolve => {
            fetch(api_root+"hotels"+filter).then(response => response.json())
                .then(data=>{
                    let hotelsOfCity = [];
                    for(let hotel of data){
                        if(hotel.acf.city == cityID)
                            hotelsOfCity.push(new Hotel(hotel.id, hotel.acf)); //füge dem Array immer neue Daten als Objekt aus der API hinzu
                    }
                    resolve(hotelsOfCity); //Array wird mit resolve im Promise zurückgeliefert
                });
        });
    }

    async getHotel(id){
        return new Promise(resolve => {
            fetch(api_root+"hotels/"+id).then(response=>response.json())
                .then(hotel => {
                    resolve(new Hotel(hotel.id, hotel.acf));
                })
        })
    }

    isFavourite(type, id){
        //die favouriten werden aus dem local Storage geholt
        let favourites = JSON.parse(window.localStorage.getItem("favourite_"+type));
        //wenn die übergebene id vorhanden ist, wird true zurückgegeben
        return (favourites.includes(id));
    }

    toggleFavourite(type, id){
        let favourites = JSON.parse(window.localStorage.getItem("favourite_"+type));
        let index = favourites.indexOf(id);
        if(index == -1)
            favourites.push(id);
        else
            favourites.splice(index, 1);
        window.localStorage.setItem("favourite_"+type, JSON.stringify(favourites));
    }

}