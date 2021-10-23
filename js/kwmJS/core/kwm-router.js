"use strict";

/*************************
 * Hash-based router for Single-Page-Applications.
 * Handles Routes behind a '/#/' to your convenience.
 * First given Route will be handled as Home-Route.
 *
 * Schönmann - 2021-03-15
 *************************/

export default class KwmRouter{
    constructor(views){
        if(window.Core.system.debugMode)
            //console.log(views);
        this.routes = views;
        this.homeRoute = views[0];
        this.loginRoute = views[1]; //ADDED BY ME
        this.init();
    }

    init(){
        window.removeEventListener("hashchange", this.changeView);
        window.addEventListener("hashchange", this.changeView.bind(this)); //bind -> sagt, dass in der aufgerufenen Funktion changeView das this jenes sein soll, das mitübergeben wird
        this.changeView(); //damit am Anfang auch bereits etwas angezeigt wird -> sonst immer nur wenn sich URL ändert
    }

    changeView(){
        if(window.location.hash.length >= 2){ //z.B. "#/login"
            for(const view of this.routes){ //geht alle views durch
                if(view.isActive()){ //die view die mit dem hash gemeint ist, wird initialisiert
                    view.init();
                    //console.log("Ja");
                    return;
                }
            }
            //wenn für die hash keine view vorhanden ist, wird auf die Startseite verlinkt
            if(window.Core.system.debugMode)
                console.warn("Did not find "+window.location.hash+", but taste some startpage");
            window.location.hash = this.homeRoute.slug;

        }else{ //wenn in der URL (window.location.hash) nichts vorkommt, soll auf home Seite verlinkt werden
            window.location.hash = this.homeRoute.slug; //dadurch ändert sich die URL -> somit wird die init aufgerufen und wieder die changeView -> dort wird startseite mit # angezeigt
        }
    }
}