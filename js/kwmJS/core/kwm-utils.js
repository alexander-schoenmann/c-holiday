"use strict";

/********************************************
 * A Collector class for several useful functions
 *
 * Schönmann 2021-04-12
 *********************************************/

export default class KWM_Utils{
    constructor(){}

    isEmpty(variable){
        if(Array.isArray(variable))
            return(variable.length == 0);
        else if(typeof variable === "object")
            return (Object.entries(variable).length === 0 && variable.constructor === Object);
        else
            return (typeof variable === "undefined" || variable == null || variable == "");
    }

    setCookie(name, value, days){
        let expires;
        if(days){
            let date = new Date(); //aktuelles Datum
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toGMTString();
        }
        else
            expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    getCookie(name){
        let nameEQ = name + "=",
            occuranceArray = document.cookie.split(";");
        for(let i = 0; i < occuranceArray.length; i++){
            let occurance = occuranceArray[i];
            while(occurance.charAt(0) === ' ')
                occurance = occurance.substring(1, occurance.length);
            if(occurance.indexOf(nameEQ) === 0)
                return occurance.substring(nameEQ.length, occurance.length);
        }
        return null;
    }

    deleteCookie(name){
        this.setCookie(name, "", -1);
    }
}