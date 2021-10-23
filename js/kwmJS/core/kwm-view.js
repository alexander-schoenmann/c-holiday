"use strict";

/*************************
 * Hash-based Routes for Single-Page-Applications.
 * Routes can be treated like Views. Each Route is
 * therefore bound to one single (unique) view.
 *
 * Schönmann - 2021-03-15
 *************************/

export default class KWM_View{
    constructor(slug, init) { //slug ist der teil in der URL, dadurch weiß View wie sie heißt und kann aufgerufen werden -> macht Router
        this.slug = slug;
        this.init = init; //The init function, which is called, once the View is loaded.
    }

    isActive(){
        if(!window.Core.utils.isEmpty(KWM_View.getGetParameters())){
            let index = window.location.hash.substr(1).indexOf("?");
            return (window.location.hash.substr(1, index).replace("#", "") === this.slug);
        }
        else {
            //funktion sagt, ob das der slug ist oder nicht
            return (window.location.hash.substr(1).replace('#', '') === this.slug); //gibt bei #/login nur /login aus -> # werden durch '' replaced
        }
    }

    static renderTemplate(templateName, container, content = {}){ //static = hat nichts mit dem Objekt zu tun, nur mit Klasse, Funktion soll template in Container verschieben
        return new Promise((resolve, reject) => {
            fetch(window.Core.system.webRoot+"/js/kwmJS/templates/"+templateName+".tpl")
                .then(response => response.text())
                .then(tpl => { //tpl is content of .tpl file.
                    if(window.Core.system.debugMode) {
                        console.log(tpl);
                    }

                    //Kopie von Template
                    let markup = tpl,
                        open = /<%>/gi,
                        variables = /<&>/gi,
                        result,
                        indices_open = [],
                        indices_close = [],
                        variables_open = [],
                        variables_close = [],
                        even = true;

                    while(result = variables.exec(tpl)){
                        even ? variables_open.push(result.index) : variables_close.push(result.index);
                        even = !even;
                    }
                    for(let i = 0; i < variables_open.length; i++){
                        let value = content[tpl.substring(variables_open[i]+3, variables_close[i])]; //mit "" Zugriff an die Stelle
                        markup = markup.replace(tpl.substring(variables_open[i], variables_close[i]+3), value) //Markup wird ausgetauscht
                    }
                    even = true;

                    //Tags werden in Arrays gespeichert
                    while ((result = open.exec(tpl))){
                        even ? indices_open.push(result.index) : indices_close.push(result.index);
                        even = !even;
                    }
                    //der Text zwischen den Tags wird ausgewählt und getauscht
                    for(let i = 0; i < indices_close.length; i++){
                        let word = window.Core.t(tpl.substring(indices_open[i]+3, indices_close[i]));
                        markup = markup.replace(tpl.substring(indices_open[i], indices_close[i]+3), word);
                    }

                    container.innerHTML = markup;
                    resolve();
                })
        })
    }

    static getGetParameters(){
        let index = window.location.hash.substr(1).indexOf("?"); //alles hinter dem Hash, wo ? vorkommt
        if(index != -1){
            let parameters = window.location.hash.substr(index+2);
            let result = parameters.split("&").reduce(function(result, item){ //teilt in Key Value Pairs auf und liefert Objekt zurück
                let parts = item.split("=");
                result[parts[0]] = parts [1];
                return result;
            }, {}); //sonst wird leeres Objekt zurückgeliefert
            return result;
        }
        else{
            return {};
        }
    }

}