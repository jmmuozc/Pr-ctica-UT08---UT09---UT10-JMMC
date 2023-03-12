"use strict"
import videoSystem from './VideoSystem.js';
console.log("------------Intento primer VideoSystem (name=VideoSystemTest)------------");
// Creacion del video system
let videoSystemTest = videoSystem.getInstance("VideoSystemTest");
console.log("--------------Intento Segundo VideoSystem (name=noCreated)---------------");
// Intento de creacion de segundo video System (No es posible, devuelve el anteriormente creado)
let videoSystemTestFail = videoSystem.getInstance("noCreated");
// Comprobamos el nombre para mostrar que solo persiste el primero
console.log(videoSystemTestFail.systemName);
console.log("--------------Crear Person---------------");
try {
    // Creamos un Person usando una funcion factory dentro del videoSystem
    let personTest = videoSystemTest.personFactory("Lucia", "01234567A", "Ruiz", "01/2/2002", "Suarez");
    // Mostramos el toString del person
    console.log(personTest.toString());
    console.log("--------------Prueba con datos invalidos---------------");
    // Comprobamos el error itroduciendo un DNI invalido
    let personError = videoSystemTest.personFactory("Lucia", "0124567A", "Ruiz", "01/2/2002", "Suarez");

} catch (error) {
    console.log(error.message);
}

console.log("--------------Crear Category----------------");
try {
    // Creamos el category
    let categoryTest = videoSystemTest.categoryFactory("Test", "Es una categoria de prueba");
    console.log(categoryTest.toString());
    console.log("--------------Añadir Categorias--------------");
    // Añadimos la categoria
    console.log(videoSystemTest.addCategory(categoryTest));
    // Añadimos la categoria y comprobamos que salta el error de que ya existe
    console.log(videoSystemTest.addCategory(categoryTest));

} catch (error) {
    console.log(error.message);
}

console.log("--------------Crear Category Error----------------");
try {
    // Creamos una categoria con un nombre invalido
    let categoryTest = videoSystemTest.categoryFactory("", "Es una categoria de prueba");

} catch (error) {
    console.log(error.message);
}

console.log("--------------Prueba Eliminar Category----------------");
try {
    // Creamos la categoria a eliminar
    let categoryTestRemove = videoSystemTest.categoryFactory("TestEliminar", "Es una categoria de prueba");
    // Añadimos la categoria
    console.log("--------------Añadir Category--------------");
    console.log(videoSystemTest.addCategory(categoryTestRemove));
    // Eliminamos la categoria
    console.log("--------------Eliminar Category--------------");
    console.log(videoSystemTest.removeCategory(categoryTestRemove));
    // Eliminamos la categoria ya eliminada para comprobar la excepcion
    console.log("--------------Eliminar Category Error--------------");
    console.log(videoSystemTest.removeCategory(categoryTestRemove));
} catch (error) {
    console.log(error.message);
}

console.log("--------------Crear User----------------");
try {
    // Creamos un usuario
    let userTest = videoSystemTest.userFactory("Test", "Test@gmail.com", "TestPasswd123");
    console.log(userTest.toString());
    console.log("--------------Crear User Error--------------");
    // Creamos un usuario con contraseña invalida para comprobar el error
    let userTestError = videoSystemTest.userFactory("Test", "Test@gmail.com", "wd123");
} catch (error) {
    console.log(error.message);
}

console.log("--------------Prueba Añadir User----------------");
try {
    // Creamos un usuario para añadir al System
    let userTest = videoSystemTest.userFactory("Test", "Test@gmail.com", "TestPasswd123");
    // Lo añadimos al system
    console.log("--------------Añadir Users--------------");
    console.log(videoSystemTest.addUser(userTest));
    // Lo añadimos de nuevo al system para comprobar la excepcion
    console.log("--------------Añadir Users Error--------------");
    console.log(videoSystemTest.addUser(userTest));

} catch (error) {
    console.log(error.message);
}

console.log("--------------Prueba Eliminar User----------------");
try {
    // Creamos un usuario para eliminar
    let userTestRemove = videoSystemTest.userFactory("TestEliminar", "TestEliminar@gmail.com", "Passwd123");
    // Añadimos al usuario para eliminar
    console.log("--------------Añadir User--------------");
    console.log(videoSystemTest.addUser(userTestRemove));
    // Eliminamos al usuario para eliminar
    console.log("--------------Eliminar User--------------");
    console.log(videoSystemTest.removeUser(userTestRemove));
    // Eliminamos al usuario para comprobar la excepcion
    console.log("--------------Eliminar User Error--------------");
    console.log(videoSystemTest.removeUser(userTestRemove));
} catch (error) {
    console.log(error.message);
}

console.log("--------------Crear Serie----------------");
try {
    // Creamos una serie con el factory de VideoSystem
    let serieTest = videoSystemTest.serieFactory("Prueba", "15/9/2002", "ES", "Es una prueba", "default.jpg", 1);
    console.log(serieTest.toString());
    console.log("--------------Crear Serie Error--------------");
    // Creamos una serie con el factory de VideoSystem pero con una temporada invalida para comprobar el error
    let serieTestError = videoSystemTest.serieFactory("Prueba", "15/9/2002", "ES", "Es una prueba", "default.jpg", "a");
} catch (error) {
    console.log(error.message);
}

console.log("--------------Prueba Añadir Serie----------------");
try {
    // Creamos una serie con el factory de VideoSystem
    let serieTest = videoSystemTest.serieFactory("Prueba", "15/9/2002", "ES", "Es una prueba", "default.jpg", 1);
    // Añadimos a la serie
    console.log("--------------Añadir Serie--------------");
    console.log(videoSystemTest.addProductions(serieTest));
    // Añadimos la serie de nuevo para que salte el error
    console.log("--------------Añadir Serie Error--------------");
    console.log(videoSystemTest.addProductions(serieTest));

} catch (error) {
    console.log(error.message);
}

console.log("--------------Prueba Eliminar Serie----------------");
try {
    // Creamos una serie con el factory de VideoSystem
    let serieTestRemove = videoSystemTest.serieFactory("PruebaBorrar", "15/9/2002", "ES", "Es una prueba", "default.jpg", 1);
    // Añadimos la serie
    console.log("--------------Añadir Serie--------------");
    console.log(videoSystemTest.addProductions(serieTestRemove));
    // Eliminamos la serie
    console.log("--------------Eliminar Serie--------------");
    console.log(videoSystemTest.removeProductions(serieTestRemove));
    // Eliminamos la serie de nuevo para comprobar el error
    console.log("--------------Eliminar Serie Error--------------");
    console.log(videoSystemTest.removeProductions(serieTestRemove));
} catch (error) {
    console.log(error.message);
}

console.log("--------------Prueba Añadir Actor----------------");
try {
    // Creamos un actor con el factory del VideoSystem
    let ActorTest = videoSystemTest.personFactory("Romeo", "01234567C", "Ruiz", "01/2/2002", "Suarez");
    // Añadimos el Actor al sistema
    console.log("--------------Añadir Actor--------------");
    console.log(videoSystemTest.addActor(ActorTest));
    // Añadimos el Actor al sistema de nuevo para comprobar el error
    console.log("--------------Añadir Actor Error--------------");
    console.log(videoSystemTest.addActor(ActorTest));

} catch (error) {
    console.log(error.message);
}

console.log("--------------Prueba Eliminar Actor----------------");
try {
    // Creamos un Actor para comprobar que se elimina correctamente
    let ActorTestRemove = videoSystemTest.personFactory("Luis", "01234567P", "Ruiz", "01/2/2002", "Suarez");
    // Añadimos el actor al sistema
    console.log("--------------Añadir Actor--------------");
    console.log(videoSystemTest.addActor(ActorTestRemove));
    // Eliminamos el actor del sistema
    console.log("--------------Eliminar Actor--------------");
    console.log(videoSystemTest.removeActor(ActorTestRemove));
    // Eliminamos el actor del sistema de nuevo para comprobar la excepcion
    console.log("--------------Eliminar Actor Error--------------");
    console.log(videoSystemTest.removeActor(ActorTestRemove));
} catch (error) {
    console.log(error.message);
}

console.log("--------------Prueba Añadir Director----------------");
try {
    // Creamos un director con el factory del VideoSystem
    let DirectorTest = videoSystemTest.personFactory("Maria", "91234567K", "Ruiz", "01/2/2002", "Suarez");
    // Añadimos al director
    console.log("--------------Añadir Director--------------");
    console.log(videoSystemTest.addDirector(DirectorTest));
    // Volvemos a añadir al director para comprobar la excepcion
    console.log("--------------Añadir Director Error--------------");
    console.log(videoSystemTest.addDirector(DirectorTest));

} catch (error) {
    console.log(error.message);
}

console.log("--------------Prueba Eliminar Director----------------");
try {
    // Creamos un director para eliminar
    let DirectorTestRemove = videoSystemTest.personFactory("Luis", "01234567P", "Ruiz", "01/2/2002", "Suarez");
    // Añadimos el director al sistema
    console.log("--------------Añadir Director--------------");
    console.log(videoSystemTest.addDirector(DirectorTestRemove));
    // Comprobamos el Iterador del director 
    console.log("--------------Iterador Director--------------");
    for (let directors of videoSystemTest.Directors) {
        console.log(directors);

    }
    // Eliminamos el Director
    console.log("--------------Eliminar Director--------------");
    console.log(videoSystemTest.removeDirector(DirectorTestRemove));
    // Eliminamos el Director de nuevo para comprobar la excepcion
    console.log("--------------Eliminar Director Error--------------");
    console.log(videoSystemTest.removeDirector(DirectorTestRemove));
} catch (error) {
    console.log(error.message);
}

console.log("--------------Prueba Assign Category----------------");
try {
    // Creamos 2 producciones nuevas, una serie y una pelicula
    let newSerie = videoSystemTest.serieFactory("Dark", "15/9/2002", "ES", "Es una prueba", "default.jpg", 1);
    let newMovie = videoSystemTest.movieFactory("Dark the movie", "15/9/2002");

    // Creamos el iterable de las categorias
    let iterable = videoSystemTest.CategoriesList;
    // Creamos una variable que nos guardara la categoria
    let found;
    // Creamos el iterador usando el iterable anterior
    let iterator = iterable[Symbol.iterator]();
    // Creamos la variable que nos permitira recorrerla
    let category = iterator.next();
    // Mientras siga habiendo datos o no se haya encontrado continuara el iterador
    while (!category.done && !found) {
        // Si el objeto tiene una categoria con ese nombre entonces se guardara en found
        if (category.value.category.Name === "Test") {
            found = category.value;
        }
        // Se pasa al siguiente objeto del iterable
        category = iterator.next();
    }
    // Asignamos las producciones a la categoria que hemos encontrado con el iterable
    videoSystemTest.assignCategory(found.category, newSerie, newMovie);
    console.log("--------------Antes de desasignar las producciones----------------");
    // Mostramos el array de objetos con las nuevas producciones
    console.log(found);
    // Desasignamos las categorias para comprobar su correcto funcionamiento
    videoSystemTest.deassignCategory(found.category, newSerie, newMovie);
    console.log("--------------Despues de desasignar las producciones----------------");
    console.log(found);
    // Volvemos a asignar ambas producciones
    console.log("---Despues de asignar las producciones y eliminar una produccion---");
    videoSystemTest.assignCategory(found.category, newSerie, newMovie);
    // Eliminamos la produccion NewSerie, por tanto se eliminara de la categoria
    videoSystemTest.removeProductions(newSerie);
    // Mostramos que se ha borrado correctamente
    console.log(found);
    // Eliminamos la categoria para que la pelicula se transfiere a la categoria por defecto
    console.log("--------------Eliminamos la categoria----------------");
    console.log(videoSystemTest.removeCategory(found.category));

} catch (error) {
    console.log(error.message);
}

console.log("--------------Prueba get Productions Category----------------");
try {
    // Realizamos el mismo proceso con el iterador, pero esta vez a la categoria por defecto
    let iterable = videoSystemTest.CategoriesList;

    let found;

    let iterator = iterable[Symbol.iterator]();

    let category = iterator.next();
    while (!category.done || !found) {
        if (category.value.category.Name === "Anonymous category") {
            found = category.value;
        }
        category = iterator.next();
    }
    // Mostramos la categoria por defecto
    console.log("--------------Categoria por defecto----------------");
    console.log(found);
    // Mostramos las producciones asociadas a la categoria
    console.log("Se le ha asignado la produccion restante de la categoria eliminada automaticamente");
    for (let productions of videoSystemTest.getProductionsCategory(found.category)) {
        console.log(productions);
    }
} catch (error) {
    console.log(error.message);
}
/* Solo muestro como funcionan los objetos/metodos principales ya que entre ellos no hay muchas diferencias ademas de
añadir objetos simples como Coordinate y Resources
*/
console.log("NO SE COMPRUEBA EL RESTO DE FUNCIONES YA QUE SON EXACTAMENTE IGUALES");
