"use strict";

/****************************************
 * Just add your key: "value" pairs and enjoy
 * Translation-Engine for KWM-App
 *
 * Schönmann 2021-04-12
 */

export default class KWM_Translator{
    constructor(languages) {
        for(const lng of languages){
            this[lng] = KWM_Language[lng];
        }
        //Wenn ein Cookie vorhanden ist, wird dieser verwendet, sonst wird die erste Sprache im Array ausgewählt
        this.currentLanguage = window.Core.utils.getCookie("language") ? window.Core.utils.getCookie("language") : languages[0];
    }
    //Standardwert von language ist this.currentLanguage
    t(key, language = this.currentLanguage){
        return (typeof KWM_Language[language][key] === "undefined") ? "-- Missing translation "+key+" --" : KWM_Language[language][key];
    }
}

let KWM_Language = {};
//KWM_Language["en]; == KWM_Language.en;
KWM_Language.en = {
    welcome_message : "Welcome to C-Holidays",
    logout : "Logout",
    login : "Login",
    username : "Usernmae",
    password : "Password",

    /*Header*/
    startHeader : "Home",
    aboutHeader : "About",
    hotelHeader : "Hotel",
    loginHeader : "Login",
    contactHeader : "Contact",

    /*Languages*/
    english : "English",
    german : "German",
    russian : "Russian",

    name: "Name",
    country: "Country",
    nickname: "Nickname",
    more: "Show more",

    city_description: "City description",
    hotels_of_this_city: "Hotels of this City",

    price: "Price",
    stars: "Rating",
    visit: "Visit Website",
    contact: "Contact",
    phone: "Phone",
    mail: "e-Mail",
    approach: "Approach",

    /*Favourites*/
    favourites: "Favourites",
    cities: "Cities",
    hotels: "Hotels",

};
KWM_Language.de = {
    welcome_message : "Willkommen bei C-Holidays",
    logout : "Abmelden",
    login : "Anmelden",
    username : "Benutzername",
    password : "Passwort",

    /*Header*/
    startHeader : "Start",

    /*Languages*/
    english : "Englisch",
    german : "Deutsch",
    russian : "Russisch",

    name: "Name",
    country: "Land",
    nickname: "Beiname",
    more: "Mehr anzeigen",

    city_description: "Stadt Beschreibung",
    hotels_of_this_city: "Hotels der Stadt",

    price: "Preis",
    stars: "Bewertung",
    visit: "Webseite besuchen",
    contact: "Kontakt",
    phone: "Telefon",
    mail: "E-Mail",
    approach: "Anfahrt",

    /*Favourites*/
    favourites: "Favoriten",
    cities: "Städte",
    hotels: "Hotels",

};
KWM_Language.ru = {
    welcome_message : "Добро пожаловать в C-Holidays",
    logout : "выход",
    login : "Авторизоваться",
    username : "имя пользователя",
    password : "пароль",

    /*Header*/
    startHeader : "начинать",

    /*Languages*/
    english : "Английский",
    german : "Немецкий",
    russian : "русский",

    name: "Имя",
    country: "Страна",
    nickname: "Ник",
    more: "показать больше",

    city_description: "Описание города",
    hotels_of_this_city: "Гостиницы этого города",

    price: "цена",
    stars: "рейтинг",
    visit: "Посетить вебсайт",
    contact: "контакт",
    phone: "Телефон",
    mail: "электронное письмо",
    approach: "Направления",

    /*Favourites*/
    favourites: "Избранное",
    cities: "Города",
    hotels: "Гостиницы",

};