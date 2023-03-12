"use strict"
import {InvalidString} from "./Exceptions.js";
import {stringPattern,emailPattern,passwdPattern} from "./Modules.js";

class User{
    #Username;
    #Email;
    #Password;

    constructor(username,email,password){
        if (!stringPattern.test(username)) throw new InvalidString();
        if (!emailPattern.test(email)) throw new InvalidString();
        if (!passwdPattern.test(password)) throw new InvalidString();
        this.#Username=username;
        this.#Email=email;
        this.#Password=password;
    }
    
    get Username(){
        return this.#Username
    }
    
    set Username(username){
        if (!stringPattern.test(username)) throw new InvalidString();
        this.#Username=username;
    }
    
    get Email(){
        return this.#Email
    }
    
    set Email(email){
        if (!emailPattern.test(email)) throw new InvalidString();
        this.#Email=email;
    }
    
    get Password(){
        return this.#Password
    }
    
    set Password(password){
        if (!passwdPattern.test(password)) throw new InvalidString();
        this.#Password=password;
    }

    toString(){
        return "USER" + "\n" + "username: " + this.#Username + "\n" + "email: " + this.#Email + "\n" + "password: " + this.#Password;
    }
}

export default User;