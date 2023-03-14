"use strict";
import { AbstractClass, InvalidString, InvalidDate, InvalidFile } from "./Exceptions.js";
import { stringPattern, imgPattern, datePattern, stringToDate, nationalityPattern } from "./Modules.js";
class Production {
    #Title;
    #Nationality;
    #Publication;
    #Synopsis;
    #Image;
    constructor(title, publication, nationality = "NaN", synopsis = "", image = "default.png") {
        if (new.target === Production) throw new AbstractClass();
        if (!stringPattern.test(title)) throw new InvalidString();
        if (!datePattern.test(publication)) throw new InvalidDate();
        if (!nationalityPattern.test(nationality)) throw new InvalidString();
        if (!imgPattern.test(image)) throw new InvalidFile();
        this.#Title = title;
        this.#Publication = publication;
        this.#Nationality = nationality;
        this.#Synopsis = synopsis;
        this.#Image = image;
    }

    // Devuelve el nombre de la Production
    get Title() {
        return this.#Title;
    }

    // Devuelve la fecha de la Production
    get Publication() {
        return this.#Publication;
    }

    // Devuelve la Nacionalidad de la Production
    get Nationality() {
        return this.#Nationality;
    }

    // Le da valor a la Nacionalidad de la Production
    set Nationality(nationality) {
        if (!nationalityPattern.test(nationality)) throw new InvalidString();
        this.#Nationality = nationality;
    }

    // Devuelve la Synopsis de la Production
    get Synopsis() {
        return this.#Synopsis;
    }

    // Le da valor a la synopsis de la Production
    set Synopsis(synopsis) {
        this.#Synopsis = synopsis;
    }

    // Devuelve la imagen de la Production
    get Image() {
        return this.#Image;
    }

    // Le da valor a la imagen de la Production
    set Image(image) {
        this.#Image = image;
    }

    //Devuelve la lista en formato cadena
    toString() {

        return "Production " + this.#Title + "\n" + "Nationality: " + this.#Nationality + "\n" + "Publication Date: " + this.#Publication + "\n"
            + "Synopsis: " + this.#Synopsis + "Image: " + this.#Image + "\n";
    }

}

export default Production; 