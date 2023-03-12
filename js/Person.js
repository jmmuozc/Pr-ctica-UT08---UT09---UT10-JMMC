"use strict";
import { InvalidString,InvalidDate,InvalidFile} from "./Exceptions.js";
import { stringPattern,imgPattern,datePattern,DNIPattern,stringToDate} from "./Modules.js";
class Person {
    #name;
    #lastname1;
    #lastname2;
    #born;
    #picture;
    #dni;

    constructor(name, dni,lastname1, born, lastname2 = "Example", picture = "Base.jpg") {
        if (!stringPattern.test(name)) throw new InvalidString();
        if (!DNIPattern.test(dni)) throw new InvalidString();
        if (!stringPattern.test(lastname1)) throw new InvalidString();
        if (!stringPattern.test(lastname2)) throw new InvalidString();
        if (!datePattern.test(born)) throw new InvalidDate();
        if (!imgPattern.test(picture)) throw new InvalidFile();
        this.#name = name;
        this.#dni = dni;
        this.#lastname1 = lastname1;
        this.#lastname2 = lastname2;
        this.#born =stringToDate(born);
        this.#picture = picture;
    }

    get Name() {
        return this.#name;
    }

    get dni() {
        return this.#dni;
    }

    get FirstLastName() {
        return this.#lastname1;
    }

    get SecondLastName() {
        return this.#lastname2;
    }

    get Born() {
        return this.#born;
    }

    get Picture() {
        return this.#picture;
    }

    set Picture(newPicture) {
        if (!this.imgPattern.test(newPicture)) throw new InvalidFile();
        this.#picture = newPicture;
    }

    set SecondLastName(lastName) {
        if (!stringPattern.test(lastName)) throw new InvalidString();
        this.#lastname2 = lastName;
    }

    toString() {
        return "PERSON: " + this.#name + "\n" + "last Name: " + this.#lastname1 + "\n"
            + "last Name2: " + this.#lastname2 + "\n" + "Born in: " + this.#born + "\n"
            + "picture: " + this.#picture + "\n"
    }

}

export default Person;