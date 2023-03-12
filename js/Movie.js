"use strict";
import { InvalidObject } from "./Exceptions.js";
import Coordinate from "./Coordinate.js";
import Production from "./Production.js";
import Resource from "./Resource.js";
class Movie extends Production {
    #Resource;
    #Locations = [];

    constructor(title, publication, nationality = "NaN", synopsis = "", image = "default.jpg", resource = new Resource(5, "default.jpg")) {
        super(title, publication, nationality, synopsis, image);
        if (!(resource instanceof Resource)) throw new InvalidObject();
        this.#Resource = resource;
    }

    get Resource() {
        return this.#Resource;
    }

    set Resource(resource) {
        if (!(resource instanceof Resource)) throw new InvalidObject();
        this.#Resource = resource;
    }

    get Locations() {
        return this.#Locations
    }

    set Locations(location) {
        if (!(location instanceof Coordinate)) throw new InvalidObject();
        this.#Locations.push(location);
    }

    toString(){
        return super.toString()+ "Movie" + " Resource: "+ this.#Resource + "\n" + "Locations: " + this.#Locations+ "\n" ;
    }
}

export default Movie;