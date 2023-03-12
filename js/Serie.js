"use strict";
import { InvalidObject, InvalidNumber } from "./Exceptions.js";
import Coordinate from "./Coordinate.js";
import Production from "./Production.js";
import Resource from "./Resource.js";
class Serie extends Production {
    #Resource = [];
    #Locations = [];
    #Seasons;

    constructor(title, publication, nationality = "NaN", synopsis = "", image = "default.jpg",seasons = 1) {
        super(title, publication, nationality, synopsis, image);
        if (isNaN(seasons)) throw new InvalidNumber();
        this.#Seasons = seasons;
    }

    get Seasons() {
        return this.#Seasons;
    }

    set Seasons(seasons) {
        if (isNaN(seasons)) throw new InvalidNumber();
        this.#Seasons = seasons;
    }

    get Resource() {
        return this.#Resource;
    }

    set Resource(resource) {
        if (!(resource instanceof Resource)) throw new InvalidObject();
        this.#Resource.push(resource);
    }

    get Locations() {
        return this.#Locations
    }

    set Locations(location) {
        if (!(location instanceof Coordinate)) throw new InvalidObject();
        this.#Locations.push(location);
    }

    toString(){
        return super.toString() + "SERIE" + "\n" + "Seasons: " + this.#Seasons + "\n" + "Resource: " + this.#Resource + "\n" + "Locations: " + this.#Locations;
    }
}

export default Serie;