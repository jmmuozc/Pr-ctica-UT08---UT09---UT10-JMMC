"use strict"
const stringPattern= /^[A-Z]{1}[a-z ñ]{2,}/;
const imgPattern= /.*(png|jpg|jpeg|webp|jfif)$/;
const datePattern= /^(0[1-9]|[1-2]\d|3[01])(\/||\-)([1-9]|0[1-9]|1[012])(\/||\-)(\d{4})$||^(\d{4})(\/||\-)([1-9]|0[1-9]|1[012])(\/||\-)(0[1-9]|[1-2]\d|3[01])$/;
const nationalityPattern= /(ES|FR|GB|RU|US|NaN)$/;
const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwdPattern=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{4,})$/;
const DNIPattern = /^\d{8}[a-zA-Z]$/;


function stringToDate(StringDate){
    //Transforma en array el String de la fecha dividiendolo por /
    let fechaArray=StringDate.split("/");
    // Transforma en un objeto fecha un conjunto de números
    let fecha= new Date(Date.UTC(fechaArray[2],(fechaArray[1]-1),fechaArray[0],0,0,0));
    return fecha;
}

export {stringPattern,imgPattern,datePattern,nationalityPattern,emailPattern,passwdPattern,DNIPattern,stringToDate};