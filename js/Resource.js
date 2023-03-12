"use strict";
import {InvalidFile,InvalidNumber} from "./Exceptions.js";
import {imgPattern} from "./Modules.js";

class Resource{
    #Duration;
    #link;

    constructor(duration,link){
        if (isNaN(duration)) throw new InvalidNumber();
        if (!imgPattern.test(link)) throw new InvalidFile();
        this.#Duration=duration;
        this.#link=link;
    }

    get Duration(){
        return this.#Duration;
    }

    get link(){
        return this.#link
    }

    toString(){
        return "Rersource" + "\n" + " Duration: "+ this.#Duration + "\n" + "Link: " + this.#link+ "\n" ;
    }
}

export default Resource;