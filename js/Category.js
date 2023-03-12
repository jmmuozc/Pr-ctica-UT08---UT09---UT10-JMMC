"use strict";
import {InvalidString} from "./Exceptions.js";
import {stringPattern} from "./Modules.js";

class Category{
    #Name;
    #Description;

    constructor(name,description=""){
        if (!stringPattern.test(name)) throw new InvalidString();
        this.#Name=name;
        this.#Description=description;
    }

    get Name(){
        return this.#Name;
    }

    get Description(){
        return this.#Description
    }

    set Description(description){
        this.#Description=description;
    }

    toString(){
        return "CATEGORY" + "\n" + " Name: "+ this.#Name + "\n" + "Description: " + this.#Description+ "\n" ;
    }
}

export default Category;