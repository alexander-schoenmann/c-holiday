"use strict";

import KWM_View from "../core/kwm-view.js";

export let view = new KWM_View("/hotel", async function(){
    if(window.Core.utils.isEmpty(KWM_View.getGetParameters().id))
        window.location.hash = "/"; //wenn nichts drin ist -> zurück zur Startseite
    else{
        this.hotel = await window.Core.model.getHotel(KWM_View.getGetParameters().id);
        if(this.hotel == false)
            window.location.hash = "/"; //wenn es nicht funktioniert -> zurück zur Startseite
        else{
            await this.rendering();
            console.log("Rendering is done.");
        }
    }
})

view.rendering = async function(){
    await this.hotel.renderSingleMarkup(document.getElementById("kwm-body"));
}

