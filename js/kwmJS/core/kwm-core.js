"use strict";

import KwmRouter from "./kwm-router.js";
import KWM_Translator from "./kwm-translator.js";
import KWM_Utils from "./kwm-utils.js";
import KWM_View from "./kwm-view.js";
import KWM_Model from "./kwm-model.js";

/*****************************
 *
 *  Class Bundle for Web-Apps.
 *
 *  @param:
 *  config: contains webroot, appContainer, ...
 *
 *  Schönmann - 21-03-15
 *
 *****************************/


export default class KWM_App {
    constructor(config) {
        window.Core = this; //Attach Core ot window-Object.
        this.system = {
            appContainer: config.appContainer, //HTML-Element, where App will be rendered into
            webRoot: config.webRoot, //Root-URL of the App
            debugMode: config.debugMode //If activated, show debug log messages etc.
        }
        this.utils = new KWM_Utils(); //Exclusive library for helper functions
        //Translater vor dem Router, damit auch die erste Seite gleich übersetzt wird
        this.translator = new KWM_Translator(config.languages);
        this.model = new KWM_Model(); //In den Views soll das Model schon da sein, damit aus der View heraus die Models geladen werden können
        this.router = new KwmRouter(config.views);

        this.initHeaderAndFooter();
    }
    t(key){
        return this.translator.t(key);
    }

    //Wie in den Views
    async initHeaderAndFooter(){
        await KWM_View.renderTemplate("header", document.getElementById("kwm-header"));
        await KWM_View.renderTemplate("footer", document.getElementById("kwm-footer"));
        this.initLanguageMenu();
    }

    initLanguageMenu(){
        let self = this;
        let listelements = document.querySelectorAll("#languages li");
        for (let i = 0; i < listelements.length; i++){
            listelements[i].addEventListener("click", function (){
                self.translator.currentLanguage = this.dataset.language;
                console.log(this.dataset.language);
                self.utils.setCookie("language", this.dataset.language, 360);
                //damit Einstellungen sofort angezeigt werden, muss View aktualisiert werden
                self.initHeaderAndFooter();
                window.dispatchEvent(new HashChangeEvent("hashchange")); //der Router denkt, er muss etwas tun, weil sich die Hash geändert hat - hat sich in Wahrheit aber nicht geändert
            })
        }
    }
}