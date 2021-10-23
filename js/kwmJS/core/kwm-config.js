"use strict"; //sorgt dafür, dass wir nur Code einbauen können, der funktioniert (z.B. Variable muss mit let definiert werden)

import KWM_App from "./kwm-core.js";

//Import and rename your views here:
import {view as home} from '../views/view.home.js'; //erste ist automatisch die Startseite
import {view as login} from '../views/view.login.js';
import {view as city} from '../views/view.city.js';
import {view as hotel} from '../views/view.hotel.js';
import {view as favourites} from '../views/view.favourites.js';

let config = {
    appContainer: "kwmJS",
    debugMode: true,
    languages: ["de", "en", "ru"],
    webRoot: "http://localhost:81/ClientseitigeWebProgrammierung/Uebung_1",
    views: [home, login, city, hotel, favourites]
}

new KWM_App(config); //Actually initialize the Application, deshalb muss die config Datei in der index verlinkt werden