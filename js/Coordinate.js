"use strict";
import { InvalidNumber } from "./Exceptions.js";
class Coordinate {
    #Latitude;
    #Longitude;

    constructor(latitude, longitude) {
        if (isNaN(latitude)) throw new InvalidNumber();
        if (isNaN(longitude)) throw new InvalidNumber();
        this.#Latitude = latitude;
        this.#Longitude = longitude;
    }

    get Longitude() {
        return this.#Longitude;
    }

    set Longitude(longitude) {
        if (isNaN(longitude)) throw new InvalidNumber();
        this.#Longitude = longitude;
    }

    get Latitude() {
        return this.#Latitude
    }

    set Latitude(latitude) {
        if (isNaN(latitude)) throw new InvalidNumber();
        this.#Latitude.push(latitude);
    }

    toString(){
        return "Coordinates" + "\n" + " Latitude: "+ this.#Latitude + "\n" + "Longitude: " + this.#Longitude+ "\n" ;
    }
}

export default Coordinate;