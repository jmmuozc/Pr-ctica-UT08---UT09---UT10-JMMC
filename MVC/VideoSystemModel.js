import Person from "../js/Person.js";
import Category from "../js/Category.js";
import User from "../js/User.js";
import Resource from "../js/Resource.js";
import Movie from "../js/Movie.js";
import Serie from "../js/Serie.js";
import { stringPattern } from "../js/Modules.js";
import {
    InvalidObject, InvalidString, CategoryExists, CategoryNoExists, UsernameExists, EmailExists, UserNoExists, UserExists, PersonExists,
    ProductionExists, ProductionNoExists, ActorExists, ActorNoExists, DirectorExists, DirectorNoExists
} from "../js/Exceptions.js";
import Production from "../js/Production.js";
let videoSystem = (function () {

    let instantiated;
    function init(systemName) {
        class VideoSystem {

            #SystemName;
            #Users = [];
            #CategoriesList = [];
            #ProductionsList = [];
            #ActorList = [];
            #DirectorList = [];

            /* Estructura para almacenar los objetos
            #SystemName //Nombre del sistema
            #Users: [] //Array con los usuarios
            #CategoriesList: [ // Array que contiene un objeto literal con la categoria y un array
            {
                Category: Category,
                Productions [Serie,Movie] //Array con las referencias a los objetos Production
            }
            ]
            #ProductionsList: [] //Array con las producciones
            #ActorList{
                Actor: Person,
                Productions [Serie,Movie] //Array con las referencias a los objetos Production
            }
            #DirectorList{
                Director: Person,
                Productions [Serie,Movie] //Array con las referencias a los objetos Production
            }
            */
            #defaultCategory = new Category("Anonymous category"); //Categoría por defecto	


            /**
             * Dado una categoría, devuelve la posición de esa categoría en el array de categorías o -1 si no lo encontramos
             * @param {Category} category 
             * @returns Devolvemos la posicion en caso de que se encuentre
             */
            #getCategoryPosition(category) {
                if (!(category instanceof Category)) {
                    throw new InvalidObject();
                }
                // Creamos un patron para la busqueda de findIndex
                function compareElements(element) {
                    // Comprobamos que la categoria del array y del objeto introducido tenga el nombre igual
                    return (element.category.Name === category.Name)
                }

                return this.#CategoriesList.findIndex(compareElements);
            }

            /**
             * Dado una produccion, devuelve su posición o -1 si no lo encontramos
             *  Ya que muchos atributos tienen un array de producciones le permitimos introducir
             * La array que quiera para realizar la comparación, siendo la principal por defecto
             * @param {Production} production 
             * @param {Production} productions 
             * @returns Devolvemos la posicion en caso de que se encuentre
             */
            #getProductionPosition(production, productions = this.#ProductionsList) {
                if (!(production instanceof Production)) {
                    throw new InvalidObject();
                }
                // Creamos un patron para la busqueda de findIndex
                function compareElements(element) {
                    // Comprobamos que la categoria del array y del objeto introducido tenga el titulo igual

                    return (element.Title === production.Title)
                }

                return productions.findIndex(compareElements);
            }

            /**
             * Devuelve la posicion del Usuario dentro de la array de Usuarios según su username o -1 si no lo encontramos
             * @param {User} user 
             * @returns Devolvemos la posicion en caso de que se encuentre
             */
            #getUserPositionUsername(user) {
                if (!(user instanceof User)) {
                    throw new InvalidObject();
                }
                // Creamos un patron para la busqueda de findIndex
                function compareElements(element) {
                    // Comprobamos que la categoria del array y del objeto introducido tenga el nombre de usuario igual
                    return (element.Username === user.Username)
                }

                return this.#Users.findIndex(compareElements);
            }

            /**
             * Devuelve la posicion del Usuario dentro de la array de Usuarios según su email o -1 si no lo encontramos
             * @param {User} user 
             * @returns Devolvemos la posicion en caso de que se encuentre
             */
            #getUserPositionEmail(user) {
                if (!(user instanceof User)) {
                    throw new InvalidObject();
                }
                // Creamos un patron para la busqueda de findIndex
                function compareElements(element) {
                    // Comprobamos que la categoria del array y del objeto introducido tenga el nombre de usuario igual
                    return (element.Email === user.Email)
                }

                return this.#Users.findIndex(compareElements);
            }

            /**
             * Devuelve la posicion del Actor dentro de la array de Actores o -1 si no lo encontramos
             * @param {Person} actor 
             * @returns Devolvemos la posicion en caso de que se encuentre
             */
            #getActorPosition(actor) {
                if (!(actor instanceof Person)) {
                    throw new InvalidObject();
                }
                // Creamos un patron para la busqueda de findIndex
                function compareElements(element) {
                    // Comprobamos que la categoria del array y del objeto introducido tenga el nombre de usuario igual                    
                    return (element.actor.dni === actor.dni)
                }

                return this.#ActorList.findIndex(compareElements);
            }
            /**
             * Devuelve la posicion del Director dentro de la array de directores o -1 si no lo encontramos
             * @param {Person} director 
             * @returns Devolvemos la posicion en caso de que se encuentre
             */
            #getDirectorPosition(director) {
                if (!(director instanceof Person)) {
                    throw new InvalidObject();
                }
                // Creamos un patron para la busqueda de findIndex
                function compareElements(element) {
                    // Comprobamos que la categoria del array y del objeto introducido tenga el nombre de usuario igual
                    return (element.director.dni === director.dni)
                }

                return this.#DirectorList.findIndex(compareElements);
            }


            constructor(systemName) {
                // No puede tener menos de 3 letras, para formar un Acronimo o una palabra con sentido
                if (!stringPattern.test(systemName)) throw new InvalidString();
                this.#SystemName = systemName;
                // Introducimos directamente la categoria por defecto
                this.addCategory(this.#defaultCategory);
            }

            //Devuelve el nombre del sistema
            get systemName() {
                // Devuelve el nombre del sistema
                return this.#SystemName;
            }

            //Permite añadir un nombre del sistema
            set systemName(systemName) {
                // No puede tener menos de 3 letras, para formar un Acronimo o una palabra con sentido
                if (!stringPattern.test(systemName)) throw new InvalidString();
                this.#SystemName = systemName
            }

            // Devuelve un iterador de CategoriesList
            get CategoriesList() {
                let array = this.#CategoriesList;

                return {
                    *[Symbol.iterator]() {
                        for (let i = 1; i < array.length; i++) {
                            yield array[i].category;

                        }
                    }
                }
            }

            /**
             * Añade una cateogira al sistema
             * @param {Category} category 
             * @returns  Devuelve el tamaño de la array de Categorias
             */
            addCategory(category) {
                if (!(category instanceof Category)) throw new InvalidObject();
                // Comprueba la posicion de la categoria introducida
                let position = this.#getCategoryPosition(category);
                // En caso de que no exista la introduce en su array
                if (position === -1) {
                    // Añade objeto literal con una propiedad para la categoría y un array para las producciones dentro de la categoría
                    this.#CategoriesList.push(
                        {
                            category: category,
                            productions: []
                        }
                    );
                } else {
                    throw new CategoryExists();
                }

                return this.#CategoriesList.length;
            }

            /**
             * Elimina una categoria del sistema
             * @param {Category} category 
             * @returns Devuelve la cantidad de categorias dentro del sistema
             */
            removeCategory(category) {
                if (!(category instanceof Category)) throw new InvalidObject();
                // Comprueba la posicion de la cateogira introducida dentro de su array
                let position = this.#getCategoryPosition(category);
                // Comprueba que existe 
                if (position != -1) {
                    // En caso de que sea la categoria por defecto no permitira que se elimine
                    if (category.Name !== this.#defaultCategory.Name) {
                        // Recogemos todas los índices de las categorías menos las de por defecto y la que estamos borrando
                        let restPositions = Array.from(Array(this.#CategoriesList.length), (el, i) => i);
                        // Las borramos del array auxiliar
                        restPositions.splice(position, 1);
                        restPositions.splice(0, 1);
                        // Recorremos todas las producciones de la categoría que estamos borrando 
                        for (let production of this.#CategoriesList[position].productions) {
                            // Declaramos una variable bandera que nos indicara si se debe introducir en la categoria por defecto
                            let insertInDefault = true;
                            for (let index of restPositions) {
                                // Comprobamos si la produccion existe dentro del resto de categorias
                                if (this.#getProductionPosition(production, this.#CategoriesList[index].productions) > -1) {
                                    // En caso de que exista en otra categoria no sera necesario añadirlo a la array por defecto
                                    insertInDefault = false;
                                    break;
                                }
                            }
                            // En caso de que la variable bandera sea true se añadira a la categoria por defecto
                            if (insertInDefault) this.#CategoriesList[0].productions.push(production);
                        }
                        // Finalmente elimina la categoria de la array principal
                        this.#CategoriesList.splice(position, 1);
                    }
                } else throw new CategoryNoExists();

                return this.#CategoriesList.length;
            }


            //Devuelve todos los usuarios
            get Users() {
                let usersArray = this.#Users;
                // Devuelve un iterable de los usuarios
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < usersArray.length; i++) {
                            yield usersArray[i];

                        }
                    }
                }
            }

            /**
             * Añade al sistema un usuario
             * @param {User} user 
             * @returns Devuelve el numero de usuarios
             */
            addUser(user) {
                if (!(user instanceof User)) throw new InvalidObject();
                // Comprueba la posicion segun el nombre de usuario
                let positionUsername = this.#getUserPositionUsername(user);
                // Comprueba la posicion segun el email
                let positionEmail = this.#getUserPositionEmail(user);
                // En caso de que no exista el nombre de usuario
                if (positionUsername === -1) {
                    // En caso de que no exista el email
                    if (positionEmail === -1) {
                        this.#Users.push(user)
                        // En caso de que exista el email lo muestra en forma de error
                    } else {
                        throw new EmailExists();
                    }
                    // En caso de que exista el Username lo muestra en forma de error
                } else {
                    throw new UsernameExists();
                }

                return this.#Users.length;
            }

            /**
             * Elimina el usuario del sistema
             * @param {Person} user 
             * @returns Devuelve el tamaño de los usuarios
             */
            removeUser(user) {
                if (!(user instanceof User)) throw new InvalidObject();
                // Consigue la posicion en el array segun username
                let positionUsername = this.#getUserPositionUsername(user);
                // Consigue la posicion en el array segun email
                let positionEmail = this.#getUserPositionEmail(user);
                // En caso de que exista segun username y tenga la misma posicion segun email lo borra
                if (positionUsername != -1 && positionUsername == positionEmail) {
                    // Se elimina el usuario segun la posicion de cualquiera de los anteriores
                    this.#Users.splice(positionUsername, 1);
                } else throw new UserNoExists();

                return this.#Users.length;
            }

            //Devuelve todas las producciones
            get Productions() {
                let productionsArray = this.#ProductionsList;
                // Devuelve un iterable de las producciones
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < productionsArray.length; i++) {
                            yield productionsArray[i];

                        }
                    }
                }
            }

            //Devuelve todas las peliculas
            get Movies() {
                let productionsArray = this.#ProductionsList;
                // Devuelve un iterable de las peliculas
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < productionsArray.length; i++) {
                            if (productionsArray[i] instanceof Movie) {
                                yield productionsArray[i];

                            }
                        }
                    }
                }
            }

            //Devuelve todas las Series
            get Series() {
                let productionsArray = this.#ProductionsList;
                // Devuelve un iterable de las Series
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < productionsArray.length; i++) {
                            if (productionsArray[i] instanceof Serie) {
                                yield productionsArray[i];

                            }

                        }
                    }
                }
            }

            /**
             * Añade una produccion al sistema
             * @param {Production} production 
             * @returns Devuelve el tamaño de la array principal de producciones
             */
            addProductions(production) {
                if (!(production instanceof Production)) throw new InvalidObject();
                // Consigue la posicion de la produccion en el array principal de producciones
                let position = this.#getProductionPosition(production);
                if (position === -1) {
                    // En caso de que no exista lo introduce en el array
                    this.#ProductionsList.push(production);
                } else throw new ProductionExists();

                return this.#ProductionsList.length;
            }

            /**
             * Elimina una produccion completamente
             * @param {Production} production 
             * @returns Se devuelve la longitud de la array de producciones
             */
            removeProductions(production) {
                if (!(production instanceof Production)) throw new InvalidObject();
                // Comprueba que la produccion existe
                if (this.#getProductionPosition(production) === -1) throw new ProductionNoExists();
                let productionPosition;
                // Recorre el array de categorias
                for (let index of this.#CategoriesList) {
                    // Comprueba que la produccion exista dentro de cada array dentro de Categorias
                    productionPosition = this.#getProductionPosition(production, index.productions);
                    // En caso de que exista la produccion dentro de cualquier categoria
                    if (productionPosition > -1) {
                        // La elimina de la categoria donde se ha encontrado
                        index.productions.splice(productionPosition, 1);
                    }
                }
                // Recorre el array de actores
                for (let index of this.#ActorList) {
                    // Comprueba que la produccion exista dentro de cada array dentro de Actores
                    productionPosition = this.#getProductionPosition(production, index.productions);
                    // En caso de que exista la produccion dentro de cualquier actor
                    if (productionPosition > -1) {
                        // La elimina del actor donde se ha encontrado
                        index.productions.splice(productionPosition, 1);
                    }
                }
                // Recorre el array de Directores
                for (let index of this.#DirectorList) {
                    // Comprueba que la produccion exista dentro de cada array dentro de Directores
                    productionPosition = this.#getProductionPosition(production, index.productions);
                    // En caso de que exista la produccion dentro de cualquier Director
                    if (productionPosition > -1) {
                        // La elimina del Director donde se ha encontrado
                        index.productions.splice(productionPosition, 1);
                    }
                }
                // Se elimina de la lista principal de producciones
                this.#ProductionsList.splice(productionPosition, 1);
                return this.#ProductionsList.length;
            }

            //Devuelve todos los actores
            get Actors() {
                let actorsArray = this.#ActorList;
                // Devuelve
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < actorsArray.length; i++) {
                            yield actorsArray[i].actor;

                        }
                    }
                }
            }

            /**
             * Añade un actor al sistema
             * @param {Person} actor 
             * @returns Devuelve el tamaño de la array de actores
             */
            addActor(actor) {
                if (!(actor instanceof Person)) throw new InvalidObject();
                // Consigue la posicion del actor dentro de la array de actores
                let position = this.#getActorPosition(actor);
                if (position === -1) {
                    // En caso de que no exista lo introduce
                    this.#ActorList.push(
                        {
                            actor: actor,
                            productions: []
                        }
                    );
                } else throw new ActorExists();

                return this.#ActorList.length;
            }

            /**
             * Elimina un actor del sistema
             * @param {Person} actor 
             * @returns Devuelve el tamaño de la array de actores
             */
            removeActor(actor) {
                if (!(actor instanceof Person)) throw new InvalidObject();
                // Consigue la posicion del actor dentro de la array de actores
                let position = this.#getActorPosition(actor);
                if (position != -1) {
                    // En caso de que exista lo elimina
                    this.#ActorList.splice(position, 1);
                } else throw new ActorNoExists();
                return this.#ActorList.length;
            }

            //Devuelve todos los directores
            get Directors() {
                let directorsArray = this.#DirectorList;
                // Devuelve un iterable de los directores
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < directorsArray.length; i++) {
                            yield directorsArray[i].director;

                        }
                    }
                }
            }
            /**
             * Añade un Director al sistema
             * @param {Person} director 
             * @returns Devuelve la longitud del array de directores
             */
            addDirector(director) {
                if (!(director instanceof Person)) throw new InvalidObject();
                // Consigue la posicion del director dentro de la array de directores
                let position = this.#getDirectorPosition(director);
                if (position === -1) {
                    // Si no existe lo introduce en el array
                    this.#DirectorList.push(
                        {
                            director: director,
                            productions: []
                        }
                    );
                } else throw new DirectorExists();

                return this.#DirectorList.length;
            }

            /**
             * Elimina un director del sistema
             * @param {Person} director 
             * @returns Devuelve el tamaño de la array de los directores
             */
            removeDirector(director) {
                if (!(director instanceof Person)) throw new InvalidObject();
                // Consigue la posicion del director dentro de la array de directores
                let position = this.#getDirectorPosition(director);
                if (position != -1) {
                    // Si existe lo elimina
                    this.#DirectorList.splice(position, 1);
                } else throw new DirectorNoExists();
                return this.#DirectorList.length;
            }

            /**
             *  Añade a la categoria indicada X numero de producciones
             * @param {Category} category 
             * @param  {...Production} production 
             * @returns La longitud del array de producciones de la categoria facilitada
             */
            assignCategory(category, ...production) {
                if (!(category instanceof Category)) throw new InvalidObject();
                // Consigue la posicion de la categoria dentro de la array de categorias
                let catPosition = this.#getCategoryPosition(category);
                // En caso de que no exista lo crea
                if (catPosition === -1) this.addCategory(category);
                // Por cada produccion facilitada
                if (production[0] instanceof Array) {
                    production = production[0];
                }
                production.forEach(element => {
                    try {
                        if (!(element instanceof Production)) element = this.getProductionByTitle(element);
                    } catch (error) {
                        throw new InvalidObject();
                    }

                    // En caso de que no exista la produccion la agrega al array principal de producciones
                    if (this.#getProductionPosition(element) === -1) this.addProductions(element);
                    // En caso de que no exista la produccion dentro de las producciones de la categoria introducida
                    if (this.#getProductionPosition(element, this.#CategoriesList[catPosition].productions) === -1) {
                        // Añade la referencia de la produccion a la array de producciones de la categoria
                        this.#CategoriesList[catPosition].productions.push(this.#ProductionsList[this.#getProductionPosition(element)]);
                    }
                });
                return this.#CategoriesList[catPosition].length;
            }
            /**
             * Desasigna las producciones indicadas del category introducido
             * @param {Category} category 
             * @param  {...Production} production 
             * @returns Tamaño de la array de producciones de la categoria introducida
             */
            deassignCategory(category, ...production) {
                if (!(category instanceof Category)) throw new InvalidObject();
                // Consigue la posicion de la categoria dentro de la array de categorias
                let catPosition = this.#getCategoryPosition(category);
                if (catPosition === -1) throw new CategoryNoExists;
                let prodPosition;
                // Por cada produccion facilitada
                if (production[0] instanceof Array) {
                    production = production[0];
                }
                production.forEach(element => {
                    try {
                        if (!(element instanceof Production)) element = this.getProductionByTitle(element);
                    } catch (error) {
                        throw new InvalidObject();
                    }
                    // En caso de que exista la produccion indicada
                    if (this.#getProductionPosition(element) > -1) {
                        // Recoge la posicion de la produccion dentro de la categoria indicada
                        prodPosition = this.#getProductionPosition(element, this.#CategoriesList[catPosition].productions);
                        if (prodPosition > -1) {
                            // Elimina la produccion
                            this.#CategoriesList[catPosition].productions.splice(prodPosition, 1);
                        }
                        // En caso de que no exista la produccion se manda un mensaje y se continua con el resto de producciones
                    } else throw new ProductionNoExists;
                });
                return this.#CategoriesList[catPosition].length;
            }

            /**
             * Añade al director indicado X numero de producciones
             * @param {Person} director 
             * @param  {...Production} production 
             * @returns La longitud del array de producciones del director facilitada
             */
            assignDirector(director, ...production) {
                if (!(director instanceof Person)) throw new InvalidObject();
                // Consigue la posicion del Director dentro de la array de directores
                let directorPosition = this.#getDirectorPosition(director);
                if (directorPosition === -1) this.#DirectorList.push(director);
                // Por cada produccion facilitada
                if (production[0] instanceof Array) {
                    production = production[0];
                }
                production.forEach(element => {
                    try {
                        if (!(element instanceof Production)) element = this.getProductionByTitle(element);
                    } catch (error) {
                        throw new InvalidObject();
                    }
                    // En caso de que no exista la produccion la agrega al array principal de producciones
                    if (this.#getProductionPosition(element) === -1) this.addProductions(element);
                    // En caso de que no exista la produccion dentro de las producciones del director introducida
                    if (this.#getProductionPosition(element, this.#DirectorList[directorPosition].productions) === -1) {
                        // Añade la referencia de la produccion a la array de producciones del director
                        this.#DirectorList[directorPosition].productions.push(this.#ProductionsList[this.#getProductionPosition(element)]);
                    } else throw new ProductionExists();
                });
                return this.#DirectorList[directorPosition].length;
            }

            /**
             * Desasigna las producciones indicadas del director introducido
             * @param {Person} director 
             * @param  {...Production} production 
             * @returns La longitud del array de producciones del director facilitada
             */
            deassignDirector(director, ...production) {
                if (!(director instanceof Person)) throw new InvalidObject();
                // Consigue la posicion del Director dentro de la array de directores
                let directorPosition = this.#getDirectorPosition(director);
                if (directorPosition === -1) throw new DirectorNoExists;
                let prodPosition;
                // Por cada produccion facilitada
                if (production[0] instanceof Array) {
                    production = production[0];
                }
                production.forEach(element => {
                    try {
                        if (!(element instanceof Production)) element = this.getProductionByTitle(element);
                    } catch (error) {
                        throw new InvalidObject();
                    }
                    // Comprueba si existe la produccion dentro del array de producciones principal
                    if (this.#getProductionPosition(element) > -1) {
                        // Recoge la posicion de la produccion dentro del director indicada
                        prodPosition = this.#getProductionPosition(element, this.#DirectorList[directorPosition].productions);
                        if (prodPosition > -1) {
                            // En caso de que exista lo elimina de la array de producciones del director
                            this.#DirectorList[directorPosition].productions.splice(prodPosition, 1);
                        } else throw new ProductionNoExists;
                        // En caso de que no exista la produccion se manda un mensaje y se continua con el resto de producciones
                    } else throw new ProductionNoExists;
                });
                return this.#DirectorList[directorPosition].length;
            }

            /**
             * Añade al actor indicado X numero de producciones
             * @param {Person} actor 
             * @param  {...Production} production 
             * @returns La longitud del array de producciones del actor facilitado
             */
            assignActor(actor, ...production) {
                if (!(actor instanceof Person)) throw new InvalidObject();
                // Consigue la posicion del Actor dentro de la array de actores
                let actorPosition = this.#getActorPosition(actor);
                if (actorPosition === -1) this.#ActorList.push(actor);
                // Por cada produccion facilitada
                if (production[0] instanceof Array) {
                    production = production[0];
                }
                production.forEach(element => {
                    try {
                        if (!(element instanceof Production)) element = this.getProductionByTitle(element);
                    } catch (error) {
                        throw new InvalidObject();
                    }
                    // En caso de que no exista la produccion la agrega al array principal de producciones
                    if (this.#getProductionPosition(element) === -1) this.addProductions(element);
                    // En caso de que no exista la produccion dentro de las producciones del actor introducido
                    if (this.#getProductionPosition(element, this.#ActorList[actorPosition].productions) === -1) {
                        // Añade la referencia de la produccion a la array de producciones del actores
                        this.#ActorList[actorPosition].productions.push(this.#ProductionsList[this.#getProductionPosition(element)]);
                    } else throw new ProductionExists();
                });
                return this.#ActorList[actorPosition].productions.length;
            }

            /**
             * Desasigna las producciones indicadas del actor introducido
             * @param {Person} actor 
             * @param  {...Production} production 
             * @returns La longitud del array de producciones del actor facilitado
             */
            deassignActor(actor, ...production) {
                if (!(actor instanceof Person)) throw new InvalidObject();
                // Consigue la posicion del Director dentro de la array de directores
                let actorPosition = this.#getActorPosition(actor);
                if (actorPosition === -1) throw new ActorNoExists();
                let prodPosition;
                // Por cada produccion facilitada
                if (production[0] instanceof Array) {
                    production = production[0];
                }
                production.forEach(element => {
                    try {
                        if (!(element instanceof Production)) element = this.getProductionByTitle(element);
                    } catch (error) {
                        throw new InvalidObject();
                    }
                    // Comprueba si existe la produccion dentro del array de producciones principal
                    if (this.#getProductionPosition(element) > -1) {
                        // Recoge la posicion de la produccion dentro del actor indicada
                        prodPosition = this.#getProductionPosition(element, this.#ActorList[actorPosition].productions);
                        if (prodPosition > -1) {
                            // En caso de que exista lo elimina de la array de producciones del actor
                            this.#ActorList[actorPosition].productions.splice(prodPosition, 1);
                        } else throw new ProductionNoExists;
                        // En caso de que no exista la produccion se manda un mensaje y se continua con el resto de producciones
                    } else throw new ProductionNoExists;
                });
                return this.#ActorList[actorPosition].length;
            }

            /**
             * Iterador de actores dentro de una producciones
             * @param {production} production 
             */
            getCast(production) {
                if (!(production instanceof Production)) throw new InvalidObject();
                // array auxiliar para contener los actores
                let CastArray = [];
                let prodPosition;
                // Por cada Actor del sistema
                this.#ActorList.forEach(element => {
                    // Se consigue la posicion de la produccion indicada dentro de las producciones del actor
                    prodPosition = this.#getProductionPosition(production, element.productions);
                    if (prodPosition > -1) {
                        // En caso de que exista la produccion se mete el actor en el iterador
                        CastArray.push(element);
                    }
                });
                //Se hace el iterador
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < CastArray.length; i++) {
                            yield CastArray[i];

                        }
                    }
                }
            }

            /**
             * Iterador de actores dentro de una producciones
             * @param {production} production 
             */
            getDirector(production) {
                if (!(production instanceof Production)) throw new InvalidObject();
                // array auxiliar para contener los actores
                let CastArray = [];
                let prodPosition;
                // Por cada Director del sistema
                this.#DirectorList.forEach(element => {
                    // Se consigue la posicion de la produccion indicada dentro de las producciones del actor
                    prodPosition = this.#getProductionPosition(production, element.productions);
                    if (prodPosition > -1) {
                        // En caso de que exista la produccion se mete el actor en el iterador
                        CastArray.push(element);
                    }
                });
                //Se hace el iterador
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < CastArray.length; i++) {
                            yield CastArray[i];
                        }
                    }
                }
            }

            /**
             * Iterador de producciones de un director
             * @param {Person} director 
             */
            getProductionsDirector(director) {
                if (!(director instanceof Person)) throw new InvalidObject();
                //Guardamos la array de producciones del director facilitado

                let arrayProductionsDirector = this.#DirectorList[this.#getDirectorPosition(director)].productions;
                // Se crea el iterador
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < arrayProductionsDirector.length; i++) {
                            yield arrayProductionsDirector[i];

                        }
                    }
                }
            }

            /**
             * Iterador de producciones de un actor
             * @param {Person} actor 
             */
            getProductionsActor(actor) {
                if (!(actor instanceof Person)) throw new InvalidObject();
                let arrayProductionsActor = this.#ActorList[this.#getActorPosition(actor)].productions;

                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < arrayProductionsActor.length; i++) {
                            yield arrayProductionsActor[i];

                        }
                    }
                }
            }

            getProductionsCategory(category) {
                if (!(category instanceof Category)) throw new InvalidObject();
                //Guardamos la array de producciones del actor facilitado
                let arrayProductionsCategory = this.#CategoriesList[this.#getCategoryPosition(category)].productions;
                // Se crea el iterador
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < arrayProductionsCategory.length; i++) {
                            yield arrayProductionsCategory[i];

                        }
                    }
                }
            }

            getPersonByDNI(DNI) {
                // Creamos un patron para la busqueda de findIndex
                function compareActorElements(element) {
                    // Comprobamos que la categoria del array y del objeto introducido tenga el nombre igual
                    return (element.actor.dni === DNI)
                }
                function compareDirectorElements(element) {
                    // Comprobamos que la categoria del array y del objeto introducido tenga el nombre igual
                    return (element.director.dni === DNI)
                }

                let position = this.#ActorList.findIndex(compareActorElements);

                if (position >= 0) {
                    return this.#ActorList[position].actor;
                }
                position = this.#DirectorList.findIndex(compareDirectorElements);

                if (position >= 0) {
                    return this.#DirectorList[position].director;
                }

            }

            getCategoryByName(name) {

                // Creamos un patron para la busqueda de findIndex
                function compareElements(element) {
                    // Comprobamos que la categoria del array y del objeto introducido tenga el nombre igual
                    return (element.category.Name === name)
                }

                let position = this.#CategoriesList.findIndex(compareElements);

                if (position >= 0) {
                    return this.#CategoriesList[position].category;
                }

            }

            getProductionByTitle(title) {
                // Creamos un patron para la busqueda de findIndex
                function compareElements(element) {
                    // Comprobamos que la categoria del array y del objeto introducido tenga el nombre igual
                    return (element.Title === title)
                }

                let position = this.#ProductionsList.findIndex(compareElements);

                if (position >= 0) {
                    return this.#ProductionsList[position];
                }
            }

            checkLogin(user, passwd) {
                for (let users of this.#Users) {
                    if (users.Username == user) {
                        return passwd == users.Password;
                    }
                }
                return false;
            }
            /**
             * Crea un objeto Person
             * @param {String} name 
             * @param {String} dni 
             * @param {String} lastname1 
             * @param {String} born 
             * @param {String} lastname2 
             * @param {String} picture 
             * @returns Objeto person creado
             */
            personFactory(name, dni, lastname1, born, lastname2 = "Example", picture = "Base.jpg") {
                let createdPerson = new Person(name, dni, lastname1, born, lastname2, picture);
                // Comprueba la posicion de la persona creada en la array de actores
                let positionActor = this.#getActorPosition(createdPerson);
                // Comprueba la posicion de la persona creada en la array de Director
                let positionDirector = this.#getDirectorPosition(createdPerson);
                // Comprobamos si existe la persona como Actor o como Director
                if (positionDirector == -1 || positionActor == -1) {
                    // Devuelve la persona
                    return createdPerson;
                } else throw new PersonExists();

            }

            /**
             * Crea un objeto User
             * @param {String} username 
             * @param {String} email 
             * @param {String} password 
             * @returns Objeto User creado
             */
            userFactory(username, email, password) {
                let createdUser = new User(username, email, password);
                // Comprueba la posicion del usuario creado por username
                let positionUsername = this.#getUserPositionUsername(createdUser);
                // Comprueba la posicion del usuario creado por email
                let positionEmail = this.#getUserPositionEmail(createdUser);
                // Comprobamos si existe la persona segun email o username
                if (positionEmail === -1 && positionUsername === positionEmail) {

                    return createdUser;
                } else throw new UserExists();

            }

            /**
             * Crea un objeto Category
             * @param {String} name 
             * @param {String} description 
             * @returns Objeto Category creado
             */
            categoryFactory(name, description = "") {
                let createdCategory = new Category(name, description);
                // Comprueba la posicion de la categoria en la Array principal de Categorias
                let position = this.#getCategoryPosition(createdCategory);
                if (position === -1) {
                    // Devuelve el objeto creado
                    return createdCategory;
                } else throw new CategoryExists();

            }

            /**
             * Crea un objeto Movie
             * @param {String} title 
             * @param {String} publication 
             * @param {String} nationality 
             * @param {String} synopsis 
             * @param {String} image 
             * @param {Resource} resource 
             * @returns Objeto Movie Creado
             */
            movieFactory(title, publication, nationality = "NaN", synopsis = "", image = "defaultProduction.jpg", resource = new Resource(5, "defaultProduction.jpg")) {
                let createdMovie = new Movie(title, publication, nationality, synopsis, image, resource);
                // Comprueba la posicion de la pelicula en la array de produccion
                let position = this.#getProductionPosition(createdMovie);
                // En caso de que no exista en la array
                if (position === -1) {
                    // Devuelve el objeto movie
                    return createdMovie;
                } else throw new ProductionExists();
            }

            /**
             * Crea un objeto Serie
             * @param {String} title 
             * @param {String} publication 
             * @param {String} nationality 
             * @param {String} synopsis 
             * @param {String} image 
             * @param {Resource} resource 
             * @returns Objeto creado
             */
            serieFactory(title, publication, nationality = "NaN", synopsis = "", image = "defaultProduction.jpg", seasons = 1) {
                let createdSerie = new Serie(title, publication, nationality, synopsis, image, seasons);
                // Comprueba la posicion de la Serie dentro de la array de producciones
                let position = this.#getProductionPosition(createdSerie);
                // En caso de que no exista en la array
                if (position === -1) {
                    // Devuelve el objeto serie
                    return createdSerie;
                } else throw new ProductionExists();
            }


            backupGenerator(deletedObjects) {
                let ListJSON = {
                    Category: [],
                    Person: { Actor: [], Director: [] },
                    User: [],
                    Production: { Movie: [], Serie: [] }
                }

                for (let movie of this.Movies) {

                    let movieJSON;

                    movieJSON = {
                        Title: movie.Title,
                        Nationality: movie.Nationality,
                        Publication: movie.Publication,
                        Synopsis: movie.Synopsis,
                        Image: movie.Image,
                        Resource: movie.Resource,
                        Location: movie.Locations,
                    }

                    ListJSON.Production.Movie.push(movieJSON);
                }

                for (let serie of this.Series) {

                    let serieJSON;

                    serieJSON = {
                        Title: serie.Title,
                        Nationality: serie.Nationality,
                        Publication: serie.Publication,
                        Synopsis: serie.Synopsis,
                        Image: serie.Image,
                        Resource: serie.Resource,
                        Location: serie.Locations,
                        Seasons: serie.Seasons
                    }

                    ListJSON.Production.Serie.push(serieJSON);
                }

                for (let category of this.CategoriesList) {

                    let categoryJSON;

                    categoryJSON = {
                        Title: category.Name,
                        Description: category.Description,
                        Producciones: []
                    }
                    let categoryProductions = this.getProductionsCategory(category);
                    for (let productions of categoryProductions) {
                        categoryJSON.Producciones.push(productions.Title);
                    }

                    ListJSON.Category.push(categoryJSON);
                }

                for (let actor of this.Actors) {
                    let actorJSON;
                    actorJSON = {
                        name: actor.Name,
                        lastname1: actor.FirstLastName,
                        lastname2: actor.SecondLastName,
                        born: actor.Born,
                        picture: actor.Picture,
                        dni: actor.dni,
                        Producciones: []
                    }
                    let ProductionsActor=this.getProductionsActor(actor);
                    for (let production of ProductionsActor) {
                     actorJSON.Producciones.push(production.Title)   
                    }

                    ListJSON.Person.Actor.push(actorJSON);
                }

                for (let director of this.Directors) {
                    let directorJSON;
                    directorJSON = {
                        name: director.Name,
                        lastname1: director.FirstLastName,
                        lastname2: director.SecondLastName,
                        born: director.Born,
                        picture: director.Picture,
                        dni: director.dni,
                        Producciones: []
                    }
                    let ProductionsDirector=this.getProductionsDirector(director);
                    for (let production of ProductionsDirector) {
                     directorJSON.Producciones.push(production.Title)   
                    }

                    ListJSON.Person.Director.push(directorJSON);
                }

                for (let user of this.Users) {
                    let userJSON;
                    userJSON = {
                        Username: user.Username,
                        Email: user.Email,
                        Password: user.Password,
                    }
                    ListJSON.User.push(userJSON);
                }

                ListJSON=Object.assign(deletedObjects,ListJSON);
                return JSON.stringify(ListJSON);
            }
        }

        let vs = new VideoSystem(systemName);

        Object.freeze(vs);

        return vs;
    }
    return {
        getInstance(systemName) {
            // Si no existe instantiated lo crea y le da el valor del objeto
            if (!instantiated) {
                instantiated = init(systemName);
            }
            // Si existe simplemente devuelve el existente
            return instantiated;
        }
    }
}
)();

export default videoSystem;
