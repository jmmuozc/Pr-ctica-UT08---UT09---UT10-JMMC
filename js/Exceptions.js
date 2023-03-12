"use strict";
class BaseException extends Error {
    constructor(message = "", fileName, lineNumber) {
        super(message, fileName, lineNumber);
        this.name = "BaseException";
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BaseException);
        }
    }
}

//Excepción acceso inválido a constructor
class InvalidAccessConstructorException extends BaseException {
    constructor(fileName, lineNumber) {
        super("Constructor can’t be called as a Function.", fileName, lineNumber);
        this.name = "Invalid Access Constructor Exception";
    }
}

//Excepción String no cumple su patrón
class InvalidString extends BaseException {
    constructor(fileName, lineNumber) {
        super("String is not valid according to its pattern.", fileName, lineNumber);
        this.name = "Invalid String Exception";
    }
}

//Excepción fecha es invalida
class InvalidDate extends BaseException {
    constructor(fileName, lineNumber) {
        super("Date is not valid", fileName, lineNumber);
        this.name = "Invalid Date Exception";
    }
}

//Excepción número es invalida
class InvalidNumber extends BaseException {
    constructor(fileName, lineNumber) {
        super("Number is not valid", fileName, lineNumber);
        this.name = "Invalid Number Exception";
    }
}

//Excepción File no es valido
class InvalidFile extends BaseException {
    constructor(fileName, lineNumber) {
        super("File is not valid", fileName, lineNumber);
        this.name = "Invalid File Exception";
    }
}

//Excepción Clase abstracta
class AbstractClass extends BaseException {
    constructor(fileName, lineNumber) {
        super("Class is abstract", fileName, lineNumber);
        this.name = "Abstracts Class Exception";
    }
}

//Excepción Objeto Invalido
class InvalidObject extends BaseException {
    constructor(fileName, lineNumber) {
        super("Invalid Object", fileName, lineNumber);
        this.name = "Invalid Object Exception";
    }
}

//Excepción Categoria existe
class CategoryExists extends BaseException {
    constructor(fileName, lineNumber) {
        super("This category already exists in the System", fileName, lineNumber);
        this.name = "Category Already Exists Exception";
    }
}

//Excepción no Categoria existe
class CategoryNoExists extends BaseException {
    constructor(fileName, lineNumber) {
        super("This category does not exists in the System", fileName, lineNumber);
        this.name = "Category does not Exists Exception";
    }
}

//Excepción Username existe
class UsernameExists extends BaseException {
    constructor(fileName, lineNumber) {
        super("This username already exists in the System", fileName, lineNumber);
        this.name = "Username Already Exists Exception";
    }
}

//Excepción Email existe
class EmailExists extends BaseException {
    constructor(fileName, lineNumber) {
        super("This email already exists in the System", fileName, lineNumber);
        this.name = "Email Already Exists Exception";
    }
}

//Excepción no Usuario existe
class UserNoExists extends BaseException {
    constructor(fileName, lineNumber) {
        super("This user does not exists in the System", fileName, lineNumber);
        this.name = "User does not Exists Exception";
    }
}

//Excepción Usuario existe
class UserExists extends BaseException {
    constructor(fileName, lineNumber) {
        super("This user already exists in the System", fileName, lineNumber);
        this.name = "User already Exists Exception";
    }
}

//Excepción Person existe
class PersonExists extends BaseException {
    constructor(fileName, lineNumber) {
        super("This person already exists in the System", fileName, lineNumber);
        this.name = "Person already Exists Exception";
    }
}

//Excepción Production existe
class ProductionExists extends BaseException {
    constructor(fileName, lineNumber) {
        super("This production already exists in the System", fileName, lineNumber);
        this.name = "Production already Exists Exception";
    }
}

//Excepción not Production existe
class ProductionNoExists extends BaseException {
    constructor(fileName, lineNumber) {
        super("This production do not exists in the System", fileName, lineNumber);
        this.name = "Production do not Exists Exception";
    }
}

//Excepción Actor existe
class ActorExists extends BaseException {
    constructor(fileName, lineNumber) {
        super("This actor already exists in the System", fileName, lineNumber);
        this.name = "Actor already Exists Exception";
    }
}

//Excepción not Actor existe
class ActorNoExists extends BaseException {
    constructor(fileName, lineNumber) {
        super("This actor do not exists in the System", fileName, lineNumber);
        this.name = "Actor do not Exists Exception";
    }
}

//Excepción Director existe
class DirectorExists extends BaseException {
    constructor(fileName, lineNumber) {
        super("This director already exists in the System", fileName, lineNumber);
        this.name = "Director already Exists Exception";
    }
}

//Excepción not Director existe
class DirectorNoExists extends BaseException {
    constructor(fileName, lineNumber) {
        super("This director do not exists in the System", fileName, lineNumber);
        this.name = "Director do not Exists Exception";
    }
}


export {InvalidAccessConstructorException,InvalidString,InvalidDate,InvalidNumber,InvalidFile,
AbstractClass,InvalidObject,CategoryExists,CategoryNoExists,UsernameExists,EmailExists,UserNoExists,
UserExists,PersonExists,ProductionExists,ProductionNoExists,ActorExists,ActorNoExists,DirectorExists,
DirectorNoExists}