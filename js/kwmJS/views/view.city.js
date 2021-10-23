"use strict";

import KWM_View from "../core/kwm-view.js";

export let view = new KWM_View("/city", async function(){
    if(window.Core.utils.isEmpty(KWM_View.getGetParameters().id))
        window.location.hash = "/"; //wenn nichts drin ist -> zurück zur Startseite
    else{
        this.city = await window.Core.model.getCity(KWM_View.getGetParameters().id);
        if(this.city == false)
            window.location.hash = "/"; //wenn es nicht funktioniert -> zurück zur Startseite
        else{
            await this.rendering();
            console.log("Rendering is done.");
        }
    }
})

view.rendering = async function(){
    await this.city.renderSingleMarkup(document.getElementById("kwm-body"));
}