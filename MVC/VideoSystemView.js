"use strict";

import Production from "../js/Production.js";
import { stringToDate } from "../js/Modules.js";
import { newCategoryValidation, newPersonValidation, newProductionValidation, changeCasting, logIn } from "./validation.js";

class videoSystemView {

  windows = new Map();

  constructor() {
    // Recogemos el main
    this.main = document.getElementsByTagName("main")[0];
  }

  /**
   * Metodo que realiza el guardado dentro del history
   * @param {Function} handler 
   * @param {*} handlerArguments 
   * @param {*} scrollElement 
   * @param {*} data 
   * @param {*} url 
   * @param {*} event 
   */
  #excecuteHandler(handler, handlerArguments, scrollElement, data, url, event) {
    handler(handlerArguments);
    $(scrollElement).get(0).scrollIntoView();
    history.pushState(data, null, url);
    event.preventDefault();
  }

  /**
   * Crea un elemento div con cada una de las categorias de la lista introducida
   * @param {Category} categoriesList 
   */
  showCategories(categoriesList) {


    if (document.getElementById("div-Contents")) this.main.removeChild(document.getElementById("div-Contents"));
    if (document.getElementById("div-categories")) this.main.removeChild(document.getElementById("div-categories"));
    // Creamos un elemento Div
    let categories = document.createElement("div");
    // Le añadimos una clase (container)
    categories.classList.add("container");
    categories.classList.add("text-center");
    categories.setAttribute("Id", "div-categories");
    this.main.appendChild(categories);

    let categoriesRow = document.createElement("div");
    categoriesRow.classList.add("row");

    categories.appendChild(categoriesRow);

    for (let category of categoriesList) {
      let categoriesColumn = document.createElement("div");
      categoriesColumn.classList.add("col");
      categoriesColumn.classList.add("category");
      categoriesColumn.setAttribute("style", `margin-top:2rem`);
      categoriesColumn.setAttribute("data-category", `${category.Name}`);
      categoriesColumn.innerHTML = `<img src='./media/categorias/${category.Name}.jpg' width=200 height=100 alt='${category.Name}.jpg'/>
            <h3>${category.Name}</h3>`;
      categoriesRow.appendChild(categoriesColumn);
    }
  }

  /**
   * Introduce en el header una lista desordenada con las respectivas categorias dentro de la lista
   * @param {Category} categoriesList 
   */
  headerCategories(categoriesList) {
    let nav = document.getElementById("navbarUl");
    if (document.getElementById("nav-categories")) nav.removeChild(document.getElementById("nav-categories"));
    let categoriesIl = document.createElement("li");
    categoriesIl.classList.add("nav-item");
    categoriesIl.classList.add("dropdown");
    categoriesIl.setAttribute("Id", "nav-categories");
    categoriesIl.innerHTML = `<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
        aria-expanded="false">Categorias</a>`;

    nav.appendChild(categoriesIl);
    let categoriesUl = document.createElement("ul");
    categoriesUl.setAttribute("Id", "categories-ul");
    categoriesUl.classList.add("dropdown-menu");
    categoriesIl.appendChild(categoriesUl);

    for (let category of categoriesList) {
      let categoryLink = document.createElement("li");
      categoryLink.classList.add("category");
      categoryLink.setAttribute("data-category", `${category.Name}`);
      categoryLink.innerHTML = `<a class="dropdown-item" href="#Category">${category.Name}</a>`;
      categoriesUl.appendChild(categoryLink);
    }
  }

  headerLogged(username) {
    let nav = document.getElementById("navbarUl");
    if (document.getElementById("nav-forms")) nav.removeChild(document.getElementById("nav-forms"));
    if (document.getElementById("nav-greeting")) nav.removeChild(document.getElementById("nav-greeting"));
    if (document.getElementById("nav-logOff")) nav.removeChild(document.getElementById("nav-logOff"));
    if (document.getElementById("nav-backUp")) nav.removeChild(document.getElementById("nav-backUp"));
    let formsLi = document.createElement("li");
    formsLi.classList.add("nav-item");
    formsLi.classList.add("dropdown");
    formsLi.setAttribute("Id", "nav-forms");
    formsLi.innerHTML = `<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Form</a>`;
    nav.appendChild(formsLi);
    let formUl = document.createElement("ul");
    formUl.setAttribute("Id", "forms-ul");
    formUl.classList.add("dropdown-menu");
    formUl.innerHTML = `
    <li>
    <button type="button" class="btn btn-light" style="width: 100%;" data-bs-toggle="modal" data-bs-target="#Modal" id="FormProduction">
      Producciones
    </button>
  </li>
  <li>
    <button type="button" class="btn btn-light" style="width: 100%;" data-bs-toggle="modal" data-bs-target="#Modal" id="FormCasting">
      Asignar reparto
    </button>
  </li>
  <li>
    <button type="button" class="btn btn-light" style="width: 100%;" data-bs-toggle="modal" data-bs-target="#Modal" id="FormCategory">
     Categorias
    </button>
  </li>
  <li>
    <button type="button" class="btn btn-light" style="width: 100%;" data-bs-toggle="modal" data-bs-target="#Modal" id="FormPerson">
      Personas
    </button>
  </li>`;
    formsLi.appendChild(formUl);

    let greetLi = document.createElement("li");
    greetLi.classList.add("nav-item");
    greetLi.classList.add("dropdown");
    greetLi.setAttribute("Id", "nav-greeting");
    greetLi.innerHTML = ` <a class="nav-link disabled" href="#">Bienvenido ${username}</a>`;
    nav.appendChild(greetLi);

    let logOffLi = document.createElement("li");
    logOffLi.classList.add("nav-item");
    logOffLi.classList.add("dropdown");
    logOffLi.setAttribute("Id", "nav-logOff");
    logOffLi.innerHTML = ` <button type="button" class="btn btn-light" id="log-off" aria-current="page">Cerrar Sesion</button>`;
    nav.appendChild(logOffLi);

    let backUpLi = document.createElement("li");
    backUpLi.classList.add("nav-item");
    backUpLi.classList.add("dropdown");
    backUpLi.setAttribute("Id", "nav-backUp");
    backUpLi.innerHTML = `<button class="nav-link bg-transparent border-0 ps-3 pe-3" type="submit" name="fbBackup" id="fbBackup">Backup</button>`;
    nav.appendChild(backUpLi);
    
    let FavoritesLi = document.createElement("li");
    FavoritesLi.classList.add("nav-item");
    FavoritesLi.classList.add("dropdown");
    FavoritesLi.setAttribute("Id", "nav-favorites");
    FavoritesLi.innerHTML = `<a class="dropdown-item" href="#Favorites">Favoritos</a>`;
    nav.appendChild(FavoritesLi);
  }

  /**
   * Muestra en div una categoria aleatoria, hasta un número de 3 veces
   * @param {Production} productionsList 
   */
  rngProductions(productionsList) {

    if (document.getElementById("div-Contents")) this.main.removeChild(document.getElementById("div-Contents"));

    // let arrayProductions=
    let arrayProductions = [];
    let rng;
    const numberProductions = 3;
    let arrayExistent = [];
    // Creamos un elemento Div
    let productionsContainer = document.createElement("div");
    // Le añadimos una clase (container)
    productionsContainer.classList.add("container");
    productionsContainer.classList.add("text-center");
    productionsContainer.setAttribute("Id", "div-Contents");
    this.main.appendChild(productionsContainer);

    for (let production of productionsList) {
      arrayProductions.push(production);
    }
    let productionsRow = document.createElement("div");
    productionsRow.classList.add("row");

    productionsContainer.appendChild(productionsRow);


    for (let i = 0; i < numberProductions; i++) {
      do {
        rng = Math.floor(Math.random() * (arrayProductions.length));
      } while (arrayExistent.includes(rng));

      arrayExistent.push(rng);
      let productionsColumn = document.createElement("div");
      productionsColumn.classList.add("col");
      productionsColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem;  margin-top:2rem;">
            <img src='./media/producciones/${arrayProductions[rng].Image}' class="card-img-top" alt="${arrayProductions[rng].Image}" width=250 height=150/>
            <div class="card-body">
              <h5 class="card-title">${arrayProductions[rng].Title}</h5>
              <a href="#ProductionCard" class="btn btn-primary production-btn" data-production='${arrayProductions[rng].Title}'>Ver</a>
              <button class="btn btn-primary production-btn-window" data-production='${arrayProductions[rng].Title}'>Ventana</button>
            </div>
          </div>`

      productionsRow.appendChild(productionsColumn);
    }
  }

  /**
   * Crea cartas de las producciones con Bootstrap de la categoria introducida y muestra el nombre de la categoria 
   * @param {Category} category 
   * @param {String} name 
   */
  showCategoriesProductions(category, name) {


    if (document.getElementById("div-categories")) this.main.removeChild(document.getElementById("div-categories"));
    if (document.getElementById("div-Contents")) this.main.removeChild(document.getElementById("div-Contents"));

    let productionsContainer = document.createElement("div");
    // Le añadimos una clase (container)
    productionsContainer.classList.add("container");
    productionsContainer.classList.add("text-center");
    productionsContainer.setAttribute("Id", "div-Contents");
    productionsContainer.innerHTML = `<h1>${name}</h1>`;
    this.main.appendChild(productionsContainer);

    let productionsRow = document.createElement("div");
    productionsRow.classList.add("row");

    productionsContainer.appendChild(productionsRow);


    for (let production of category) {
      let productionsColumn = document.createElement("div");
      productionsColumn.classList.add("col");
      productionsColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem;  margin-top:2rem;">
            <img src='./media/producciones/${production.Image}' class="card-img-top" alt="${production.Image}" width=250 height=150>
            <div class="card-body">
              <h5 class="card-title">${production.Title}</h5>
              <a href="#ProductionCard" class="btn btn-primary production-btn" data-production='${production.Title}'>Ver</a>
              <button class="btn btn-primary production-btn-window" data-production='${production.Title}'>Ventana</button>
            </div>
          </div>`
      productionsRow.appendChild(productionsColumn);
    }
  }

  /**
   * Muestra una lista de cartas de producciones, muestra si es una serie o pelicula depende del tipo
   * @param {Production} productionList 
   * @param {String} type 
   */
  showProductions(productionList, type) {


    if (document.getElementById("div-categories")) this.main.removeChild(document.getElementById("div-categories"));
    if (document.getElementById("div-Contents")) this.main.removeChild(document.getElementById("div-Contents"));

    let productionContainer = document.createElement("div");
    // Le añadimos una clase (container)
    productionContainer.classList.add("container");
    productionContainer.classList.add("text-center");
    productionContainer.setAttribute("Id", "div-Contents");
    productionContainer.innerHTML = `<h1>${type}</h1>`;
    this.main.appendChild(productionContainer);

    let productionRow = document.createElement("div");
    productionRow.classList.add("row");

    productionContainer.appendChild(productionRow);

    for (let production of productionList) {
      let productionColumn = document.createElement("div");
      productionColumn.classList.add("col");
      productionColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem;  margin-top:2rem;">
            <img src='./media/producciones/${production.Image}' class="card-img-top" alt="${production.Image}" width=250 height=150/>
            <div class="card-body">
              <h5 class="card-title">${production.Title}</h5>
              <a href="#ProductionCard" class="btn btn-primary production-btn" data-production='${production.Title}'>Ver</a>
              <button class="btn btn-primary production-btn-window" data-production='${production.Title}'>Ventana</button>
            </div>
          </div>`
      productionRow.appendChild(productionColumn);
    }
  }

  /**
   * Muestra una lista de cartas de Personas, muestra si es un actor o director depende del tipo
   * @param {Person} personList 
   * @param {String} type 
   */
  showPersonsList(personList, type) {

    if (document.getElementById("div-categories")) this.main.removeChild(document.getElementById("div-categories"));
    if (document.getElementById("div-Contents")) this.main.removeChild(document.getElementById("div-Contents"));

    let personContainer = document.createElement("div");
    // Le añadimos una clase (container)
    personContainer.classList.add("container");
    personContainer.classList.add("text-center");
    personContainer.setAttribute("Id", "div-Contents");
    personContainer.innerHTML = `<h1>${type}</h1>`;
    this.main.appendChild(personContainer);

    let personRow = document.createElement("div");
    personRow.classList.add("row");

    personContainer.appendChild(personRow);

    for (let person of personList) {
      let personColumn = document.createElement("div");
      personColumn.classList.add("col");
      personColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem; margin-top:2rem;">
            <img src='./media/personas/${person.Picture}' class="card-img-top" alt="${person.Picture}" width=250 height=250/>
            <div class="card-body">
            <h5 class="card-title"><p>${type}</p>${person.Name} ${person.FirstLastName}</h5>
            <a href="#${type}card" class="btn btn-primary person-${type}" data-person='${person.dni}'>Conocer</a>
            <button class="btn btn-primary person-${type}-window" data-person='${person.dni}'>Ventana</button>
            </div>
          </div>`
      personRow.appendChild(personColumn);
    }
  }

  /**
   * Crea un div de cartas de las producciones en las que está la persona introducida
   * @param {Person} person 
   * @param {Production} productionsList 
   */
  showPerson(person, productionsList) {
    if (document.getElementById("div-categories")) this.main.removeChild(document.getElementById("div-categories"));
    if (document.getElementById("div-Contents")) this.main.removeChild(document.getElementById("div-Contents"));

    let personContainer = document.createElement("div");
    // Le añadimos una clase (container)
    personContainer.classList.add("container");
    personContainer.classList.add("text-center");
    personContainer.classList.add("row");
    personContainer.setAttribute("Id", "div-Contents");
    personContainer.setAttribute("style", "margin:auto; margin-top:4rem");

    this.main.appendChild(personContainer);
    personContainer.innerHTML = `
        <div class="col">
        <img src='./media/personas/${person.Picture}' class="card-img-top" alt="${person.Picture}" width=200 height=500/>
        </div>`
      ;

    let productionContainer = document.createElement("div");
    // Le añadimos una clase (container)
    productionContainer.classList.add("container");
    productionContainer.classList.add("text-center");
    productionContainer.classList.add("col");


    productionContainer.innerHTML = `<h4>${person.Name} ${person.FirstLastName}</h4>
        <h2>${person.Born.toISOString().split("T")[0]}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquam tempor tempor. Vivamus libero mi, cursus id ullamcorper vitae, commodo nec erat. Proin iaculis odio sit amet quam aliquet, et rhoncus mi dignissim. Vestibulum sed justo nec diam mollis finibus elementum et felis. Sed lobortis risus ac tellus auctor ullamcorper.</p>`;


    // No se mete junto con el inner html
    personContainer.appendChild(productionContainer);

    let productionsRow = document.createElement("div");
    productionsRow.classList.add("row");
    productionsRow.innerHTML = "<h2>Producciones</h2>";
    productionContainer.appendChild(productionsRow);

    for (let production of productionsList) {
      let productionsColumn = document.createElement("div");
      productionsColumn.classList.add("col");
      productionsColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem; margin-top:2rem;">
            <img src='./media/producciones/${production.Image}' class="card-img-top" alt="${production.Image}" width=250 height=150/>
            <div class="card-body">
              <h5 class="card-title">${production.Title}</h5>
              <a href="#ProductionCard" class="btn btn-primary production-btn" data-production='${production.Title}'>Ver</a>
              <button class="btn btn-primary production-btn-window" data-production='${production.Title}'>Ventana</button>
            </div>
          </div>`
      productionsRow.appendChild(productionsColumn);
    }



  }

  /**
   * Crea un div de cartas de las producciones en las que está la persona introducida en una ventana
   * @param {Person} person 
   * @param {Production} productionsList 
   */
  showPersonWindow(person, productionsList, window) {
    let main = window.document.getElementsByTagName("main")[0];
    if (window.document.getElementById("div-categories")) main.removeChild(window.document.getElementById("div-categories"));
    if (window.document.getElementById("div-Contents")) main.removeChild(window.document.getElementById("div-Contents"));

    let personContainer = window.document.createElement("div");
    // Le añadimos una clase (container)
    personContainer.classList.add("container");
    personContainer.classList.add("text-center");
    personContainer.classList.add("row");
    personContainer.setAttribute("Id", "div-Contents");
    personContainer.setAttribute("style", "margin:auto; margin-top:4rem");

    main.appendChild(personContainer);
    personContainer.innerHTML = `
        <div class="col">
        <img src='./media/personas/${person.Picture}' class="card-img-top" alt="${person.Picture}" width=200 height=500/>
        </div>`
      ;

    let productionContainer = window.document.createElement("div");
    // Le añadimos una clase (container)
    productionContainer.classList.add("container");
    productionContainer.classList.add("text-center");
    productionContainer.classList.add("col");

    productionContainer.innerHTML = `<h4>${person.Name} ${person.FirstLastName}</h4>
        <h2>${person.Born.toISOString().split("T")[0]}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquam tempor tempor. Vivamus libero mi, cursus id ullamcorper vitae, commodo nec erat. Proin iaculis odio sit amet quam aliquet, et rhoncus mi dignissim. Vestibulum sed justo nec diam mollis finibus elementum et felis. Sed lobortis risus ac tellus auctor ullamcorper.</p>`;


    // No se mete junto con el inner html
    personContainer.appendChild(productionContainer);

    let productionsRow = window.document.createElement("div");
    productionsRow.classList.add("row");
    productionsRow.innerHTML = "<h2>Producciones</h2>";
    productionContainer.appendChild(productionsRow);

    for (let production of productionsList) {
      let productionsColumn = window.document.createElement("div");
      productionsColumn.classList.add("col");
      productionsColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem; margin-top:2rem;">
            <img src='./media/producciones/${production.Image}' class="card-img-top" alt="${production.Image}" width=250 height=150/>
            <div class="card-body">
              <h5 class="card-title">${production.Title}</h5>
              </div>
              </div>`
      productionsRow.appendChild(productionsColumn);
    }

    this.windows.set(person.dni, window);
  }

  /**
   * Muestra un div de la producción introducida y añade los actores y directores participantes
   * @param {Production} production 
   * @param {Person} actors 
   * @param {Person} directors 
   */
  showProductionCard(production, actors, directors) {
    if (document.getElementById("div-categories")) this.main.removeChild(document.getElementById("div-categories"));
    if (document.getElementById("div-Contents")) this.main.removeChild(document.getElementById("div-Contents"));

    let productionContainer = document.createElement("div");
    // Le añadimos una clase (container)
    productionContainer.classList.add("container");
    productionContainer.classList.add("text-center");
    productionContainer.classList.add("row");
    productionContainer.setAttribute("Id", "div-Contents");
    productionContainer.setAttribute("style", "margin:auto; margin-top:4rem");
    this.main.appendChild(productionContainer);
    productionContainer.innerHTML = `
        <div class="col">
        <img src='./media/producciones/${production.Image}' class="card-img-top" alt="${production.Image}" width=200 height=500/>
        </div>`;


    let productionInfoContainer = document.createElement("div");
    // Le añadimos una clase (container)
    productionInfoContainer.classList.add("container");
    productionInfoContainer.classList.add("text-center");
    productionInfoContainer.classList.add("col");

    let publication = stringToDate(production.Publication);

    productionInfoContainer.innerHTML = `<h4>${production.Title}</h4>
        <h2>${publication.toISOString().split("T")[0]}</h2>
        <p>${production.Synopsis}</p>
        <button class="btn btn-primary add-favorite" data-production='${production.Title}'>Favorito</button>`;

    productionContainer.appendChild(productionInfoContainer);


    let CastRow = document.createElement("div");
    CastRow.classList.add("row");
    CastRow.innerHTML = "<h2>Reparto</h2>";
    productionInfoContainer.appendChild(CastRow);

    for (let actor of actors) {
      let actorsColumn = document.createElement("div");
      actorsColumn.classList.add("col");
      actorsColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem; margin-top:2rem;">
            <img src='./media/personas/${actor.actor.Picture}' class="card-img-top" alt="${actor.actor.Picture}" width=200 height=200/>
            <div class="card-body">
              <h5 class="card-title"><p>Actor</p>${actor.actor.Name} ${actor.actor.FirstLastName}</h5>
              <a href="#ActoresCard" class="btn btn-primary person-Actores" data-person='${actor.actor.dni}'>Conocer</a>
              <button class="btn btn-primary person-Actores-window" data-person='${actor.actor.dni}'>Ventana</button>
            </div>
          </div>`
      CastRow.appendChild(actorsColumn);
    }
    for (let director of directors) {
      let directorsColumn = document.createElement("div");
      directorsColumn.classList.add("col");
      directorsColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem;  margin-top:2rem;">
            <img src='./media/personas/${director.director.Picture}' class="card-img-top" alt="${director.director.Picture}" width=200 height=200/>
            <div class="card-body">
              <h5 class="card-title"><p>Director</p>${director.director.Name} ${director.director.FirstLastName}</h5>
              <a href="#DirectoresCard" class="btn btn-primary person-Directores" data-person='${director.director.dni}'>Conocer</a>
              <button class="btn btn-primary person-Directores-window" data-person='${director.director.dni}'>Ventana</button>
            </div>
          </div>`
      CastRow.appendChild(directorsColumn);
    }


  }

  /**
   * Muestra la carta en una ventana nueva
   * @param {Production} production 
   * @param {Person} actors 
   * @param {Person} directors 
   * @param {Window} window 
   */
  showProductionCardWindow(production, actors, directors, window) {
    let main = window.document.getElementsByTagName("main")[0];
    if (window.document.getElementById("div-categories")) main.removeChild(window.document.getElementById("div-categories"));
    if (window.document.getElementById("div-Contents")) main.removeChild(window.document.getElementById("div-Contents"));

    let productionContainer = window.document.createElement("div");

    // Le añadimos una clase (container)
    productionContainer.classList.add("container");
    productionContainer.classList.add("text-center");
    productionContainer.classList.add("row");
    productionContainer.setAttribute("Id", "div-Contents");
    productionContainer.setAttribute("style", "margin:auto; margin-top:4rem");
    main.appendChild(productionContainer);
    productionContainer.innerHTML = `
        <div class="col">
        <img src='./media/producciones/${production.Image}' class="card-img-top" alt="${production.Image}" width=200 height=500/>
        </div>`;


    let productionInfoContainer = window.document.createElement("div");
    // Le añadimos una clase (container)
    productionInfoContainer.classList.add("container");
    productionInfoContainer.classList.add("text-center");
    productionInfoContainer.classList.add("col");

    productionInfoContainer.innerHTML = `<h4>${production.Title}</h4>
        <h2>${production.Publication.toISOString().split("T")[0]}</h2>
        <p>${production.Synopsis}</p>`;

    productionContainer.appendChild(productionInfoContainer);


    let CastRow = window.document.createElement("div");
    CastRow.classList.add("row");
    CastRow.innerHTML = "<h2>Reparto</h2>";
    productionInfoContainer.appendChild(CastRow);

    for (let actor of actors) {
      let actorsColumn = document.createElement("div");
      actorsColumn.classList.add("col");
      actorsColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem; margin-top:2rem;">
            <img src='./media/personas/${actor.actor.Picture}' class="card-img-top" alt="${actor.actor.Picture}" width=200 height=200/>
            <div class="card-body">
              <h5 class="card-title"><p>Actor</p>${actor.actor.Name} ${actor.actor.FirstLastName}</h5>
            </div>
          </div>`
      CastRow.appendChild(actorsColumn);
    }
    for (let director of directors) {
      let directorsColumn = document.createElement("div");
      directorsColumn.classList.add("col");
      directorsColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem;  margin-top:2rem;">
            <img src='./media/personas/${director.director.Picture}' class="card-img-top" alt="${director.director.Picture}" width=200 height=200/>
            <div class="card-body">
              <h5 class="card-title"><p>Director</p>${director.director.Name} ${director.director.FirstLastName}</h5>
    
            </div>
          </div>`
      CastRow.appendChild(directorsColumn);
    }

    this.windows.set(production.Title, window);
  }

  // createModal(){
  //   console.log("Eliminado modal");
  //   let body = document.getElementsByTagName("body")[0];
  //   if (document.getElementById("Modal")) body.removeChild(document.getElementById("Modal"));
  //   let modal=document.createElement("div");
  //   modal.classList.add("modal");
  //   modal.classList.add("fade");
  //   modal.setAttribute("Id","Modal");
  //   modal.setAttribute("tabindex","-1");
  //   modal.setAttribute("aria-labelledby","ModalLabel");
  //   modal.setAttribute("aria-hidden","true");
  //   modal.innerHTML=`<div class="modal-dialog">
  //   <div class="modal-content">
  //     <div class="modal-header">
  //       <h1 class="modal-title fs-5" id="ModalLabel">Formulario</h1>
  //       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  //     </div>
  //     <div class="modal-body" id="formModal">

  //     </div>
  //     <div class="modal-footer">
  //       <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
  //     </div>
  //   </div>
  // </div>`;
  // body.appendChild(modal);
  // }


  productionForm(categoryList, actorList, directorList, done, title, del) {
    let modal = document.getElementById("formModal");
    if (document.getElementById("errorDiv")) modal.removeChild(document.getElementById("errorDiv"));
    let form = document.getElementById("formModal");
    if (done) {
      form.innerHTML = ` <div class="container" id="cValidation" >
        <h1 class="display-5">Producciones</h1>
        <form name="fNewProduction" role="form" id="form-validation">
          <!-- Requiered -->
          <div class="form-row">
          <div class="row">
            <div class="col-md-4 mb-3 w-50">
              <label for="type">Tipo</label>
              <div class="input-group">
                
                <select class="form-select" aria-label="Default select example" id="type" name="type">
                  <option selected value="Serie">Serie</option>
                  <option value="Movie">Pelicula</option>
                </select>
              </div>
            </div>
            <div class="col-md-4 mb-3 w-50" >
              <label for="vfTitulo">Título *</label>
              <div class="input-group">
                    
                <input type="text" class="form-control" id="vfTitle" name="vfTitle" placeholder="Titulo"
                  aria-describedby="titlePrepend" value="" required>
                <div class="invalid-feedback">El Título es obligatorio.</div>
                <div class="valid-feedback">Correcto.</div>
              </div>
            </div>
            </div>
            <div class="col-md-4 mb-3 w-50" >
            <div class="input-group">
            <input class="form-check-input" type="checkbox" id="CheckDelete">
            <label class="form-check-label ms-1" for="CheckDelete">
              Eliminar
            </label>
            </div>
            </div>
            <div class="row">
            <div class="col-md-4 mb-3 w-50">
              <label for="vfPublication">Publicación *</label>
              <div class="input-group">
                                
                <input type="date" class="form-control" id="vfPublication" name="vfPublication"
                  placeholder="" aria-describedby="publicationPrepend" value="" required>
                <div class="invalid-feedback">La fecha de publicación es obligatoria.</div>
                <div class="valid-feedback">Correcto.</div>
              </div>
            </div>
            <div class="col-md-4 mb-3 w-50">
              <label for="Nationality">Nacionalidad</label>
              <div class="input-group">
                                 
                <input type="text" class="form-control" id="Nationality" name="Nationality"
                  placeholder="ES/FR/GB/RU/US" aria-describedby="nationalityPrepend" value="">
              </div>
            </div>
            </div>
            </div>

          <!-- Datos -->
          <div class="form-row" id="dinamicHolder">
          <div class="row">
            <div class="col-md-4 mb-3 w-100">
              <label for="Synopsis">Sinopsis</label>
              <div class="input-group">        
                <textarea type="text" class="form-control" id="Synopsis" name="Synopsis"
                 aria-describedby="synopsisPrepend" rows="9"></textarea>
              </div>
            </div>
            <div class="col-md-4 mb-3 w-100">
              <label for="Image">Imagen</label>
              <div class="input-group">
                
                <input type="file" class="form-control" id="Image" name="Image" aria-describedby="imagePrepend">
              </div>
          </div>
          </div>
          </div>
          <button type="submit" class="btn btn-primary">Ejecutar</button>
        </form>
      </div>`;

      let dinamicHolder = document.getElementById("dinamicHolder");
      let dinamicContents = document.createElement("div");
      dinamicContents.classList.add("row");
      dinamicContents.innerHTML = `<div class="col-md-4 mb-3 w-50">
        <label for="Director">Directores</label>
        <div class="input-group">
        <select class="form-select" multiple aria-label="multiple select example" id="directorSelect">

        </select>
        </div>
        </div>
        <div class="col-md-4 mb-3 w-50">
        <label for="Actor">Actores</label>
        <div class="input-group">
        <select class="form-select" multiple aria-label="multiple select example" id="actorSelect">

        </select>
        </div>
        </div>
        <div class="col-md-4 mb-3 w-50">
        <label for="Category">Categorias</label>
        <div class="input-group">
        <select class="form-select" multiple aria-label="multiple select example" id="categorySelect">

        </select>
        </div>
        </div>
        `;

      dinamicHolder.appendChild(dinamicContents);

      let dinamicDirectors = document.getElementById("directorSelect");
      for (let director of directorList) {
        let option = document.createElement("option");
        option.setAttribute("value", director.dni);
        option.innerText = `${director.Name} ${director.FirstLastName}`;
        dinamicDirectors.appendChild(option);
      }

      let dinamicActors = document.getElementById("actorSelect");
      for (let actor of actorList) {
        let option = document.createElement("option");
        option.setAttribute("value", actor.dni);
        option.innerText = `${actor.Name} ${actor.FirstLastName}`;
        dinamicActors.appendChild(option);
      }

      let dinamicCategory = document.getElementById("categorySelect");
      for (let category of categoryList) {
        let option = document.createElement("option");
        option.setAttribute("value", category.Name);
        option.innerText = `${category.Name}`;
        dinamicCategory.appendChild(option);
      }
      if (del) {
        let errorDiv = document.createElement("div");
        errorDiv.setAttribute("Id", "errorDiv")
        errorDiv.innerHTML = `<div class="error text-info p-3"><i class="fas fa-exclamation-triangle"></i> La produccion <strong>${title}</strong> se ha eliminado con exito.</div>`;
        form.appendChild(errorDiv);
      } else if (del == false) {
        let errorDiv = document.createElement("div");
        errorDiv.setAttribute("Id", "errorDiv")
        errorDiv.innerHTML = `<div class="error text-info p-3"><i class="fas fa-exclamation-triangle"></i> La produccion <strong>${title}</strong> se ha creado con exito.</div>`;
        form.appendChild(errorDiv);
      } else {

      }
    } else {
      if (del) {
        let errorDiv = document.createElement("div");
        errorDiv.setAttribute("Id", "errorDiv")
        errorDiv.innerHTML = `<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> La produccion <strong>${title}</strong> no existe.</div>`;
        form.appendChild(errorDiv);
      } else if (del == false) {
        let errorDiv = document.createElement("div");
        errorDiv.setAttribute("Id", "errorDiv")
        errorDiv.innerHTML = `<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> La produccion <strong>${title}</strong> ya está creada.</div>`;
        form.appendChild(errorDiv);
      }

    }

  }

  personForm(done, person, del) {
    let modal = document.getElementById("formModal");
    if (document.getElementById("errorDiv")) modal.removeChild(document.getElementById("errorDiv"));
    let form = document.getElementById("formModal");
    if (done) {
      form.innerHTML = ` <div class="container" id="cValidation" >
        <h1 class="display-5">Personas</h1>
        <form name="fNewPerson" role="form" id="form-validation">
          <!-- Requiered -->
          <div class="form-row">
          <div class="row">
            <div class="col-md-4 mb-3 w-50">
              <label for="type">Tipo</label>
              <div class="input-group">
                
                <select class="form-select" aria-label="Default select example" id="type" name="type">
                  <option selected value="Actor">Actor</option>
                  <option value="Director">Director</option>
                </select>
              </div>
            </div>
            <div class="col-md-4 mb-3 w-50" >
              <label for="vfName">Nombre *</label>
              <div class="input-group">
                    
                <input type="text" class="form-control" id="vfName" name="vfName" placeholder="Nombre"
                  aria-describedby="namePrepend" value="" required>
                <div class="invalid-feedback">El Nombre es obligatorio.</div>
                <div class="valid-feedback">Correcto.</div>
              </div>
            </div>
            </div>
            <div class="col-md-4 mb-3 w-50" >
            <div class="input-group">
            <input class="form-check-input" type="checkbox" id="CheckDelete">
            <label class="form-check-label ms-1" for="CheckDelete">
              Eliminar
            </label>
            </div>
            </div>
            <div class="row">
            <div class="col-md-4 mb-3 w-50">
              <label for="vfBorn">Fecha Nacimiento *</label>
              <div class="input-group">
                                
                <input type="date" class="form-control" id="vfBorn" name="vfBorn"
                  placeholder="" aria-describedby="datePrepend" value="" required>
                <div class="invalid-feedback">La fecha de nacimiento es obligatoria.</div>
                <div class="valid-feedback">Correcto.</div>
              </div>
            </div>
            <div class="col-md-4 mb-3 w-50">
              <label for="DNI">DNI *</label>
              <div class="input-group">
                                 
                <input type="text" class="form-control" id="DNI" name="DNI"
                  placeholder="00000000X" aria-describedby="dniPrepend" value="">
              </div>
            </div>
            </div>
          </div>
          <!-- Datos -->
          <div class="form-row">
          <div class="row">
            <div class="col-md-4 mb-3 w-50">
              <label for="LastName">Apellido *</label>
              <div class="input-group">        
              <input type="text" class="form-control" id="LastName" name="LastName"
              placeholder="Apellido" aria-describedby="lastNamePrepend" value="">
              </div>
            </div>
            <div class="col-md-4 mb-3 w-50">
              <label for="LastNameTwo">Segundo Apellido</label>
              <div class="input-group">        
              <input type="text" class="form-control" id="LastNameTwo" name="LastNameTwo"
              placeholder="Segundo Apellido" aria-describedby="lastNameTwoPrepend" value="">
              </div>
            </div>
            <div class="col-md-4 mb-3 w-100">
              <label for="Image">Imagen</label>
              <div class="input-group">
                
                <input type="file" class="form-control" id="Image" name="Image" aria-describedby="imagePrepend">
              </div>
          </div>
          </div>
          <button type="submit" class="btn btn-primary">Ejecutar</button>

        </form>
      </div>`;
      if (del) {
        let errorDiv = document.createElement("div");
        errorDiv.setAttribute("Id", "errorDiv")
        errorDiv.innerHTML = `<div class="error text-info p-3"><i class="fas fa-exclamation-triangle"></i> La persona <strong>${person}</strong> se ha eliminado con exito.</div>`;
        form.appendChild(errorDiv);
      } else if (del == false) {
        let errorDiv = document.createElement("div");
        errorDiv.setAttribute("Id", "errorDiv")
        errorDiv.innerHTML = `<div class="error text-info p-3"><i class="fas fa-exclamation-triangle"></i> La persona <strong>${person}</strong> se ha creado con exito.</div>`;
        form.appendChild(errorDiv);
      } else {

      }
    } else {
      if (del) {
        let errorDiv = document.createElement("div");
        errorDiv.setAttribute("Id", "errorDiv")
        errorDiv.innerHTML = `<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> La persona <strong>${person}</strong> no existe.</div>`;
        form.appendChild(errorDiv);
      } else if (del == false) {
        let errorDiv = document.createElement("div");
        errorDiv.setAttribute("Id", "errorDiv")
        errorDiv.innerHTML = `<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> La persona <strong>${person}</strong> ya está creada.</div>`;
        form.appendChild(errorDiv);
      }

    }
  }

  castingForm(productionList, actorList, directorList, done, actor, doneActor, director, doneDirector, title, del) {
    let modal = document.getElementById("formModal");
    if (document.getElementById("errorDiv")) modal.removeChild(document.getElementById("errorDiv"));
    let form = document.getElementById("formModal");
    if (done) {
      form.innerHTML = ` <div class="container" id="cValidation" >
        <h1 class="display-5">Asignar Reparto</h1>
        <form name="fChangeCasting" role="form" id="form-validation">
          <div class="col-md-4 mb-3 w-50" >
          <div class="input-group">
          <input class="form-check-input" type="checkbox" value="" id="CheckUnassign">
          <label class="form-check-label ms-1" for="CheckUnassign">
          Desasignar
          </label>
          </div>
          </div>
          <div class="form-row" id="dinamicHolder">
          
          </div>
          </form>
          `;

      let dinamicHolder = document.getElementById("dinamicHolder");

      let dinamicContents = document.createElement("div");
      dinamicContents.classList.add("row");
      dinamicContents.innerHTML = `<div class="col-md-4 mb-3 w-100">
        <label for="Production">Production</label>
        <div class="input-group">
        <select class="form-select" aria-label="select example" id="productionSelect">

        </select>
        </div>
        </div>
        <div class="col-md-4 mb-3 w-50">
        <label for="Actor">Actores</label>
        <div class="input-group">
        <select class="form-select" aria-label= "select example" id="actorSelect">
        <option selected></option>
        </select>
        </div>
        </div>
        <div class="col-md-4 mb-3 w-50">
        <label for="Director">Directores</label>
        <div class="input-group">
        <select class="form-select" aria-label= "select example" id="directorSelect">
        <option selected></option>
        </select>
        </div>
        </div>
        <div class="col-md-4 mb-3">
        <button type="submit" class="btn btn-primary">Ejecutar</button>
        </div>
        `;

      dinamicHolder.appendChild(dinamicContents);

      let dinamicDirectors = document.getElementById("directorSelect");
      for (let director of directorList) {
        let option = document.createElement("option");
        option.setAttribute("value", director.dni);
        option.innerText = `${director.Name} ${director.FirstLastName}`;
        dinamicDirectors.appendChild(option);
      }

      let dinamicActors = document.getElementById("actorSelect");
      for (let actor of actorList) {
        let option = document.createElement("option");
        option.setAttribute("value", actor.dni);
        option.innerText = `${actor.Name} ${actor.FirstLastName}`;
        dinamicActors.appendChild(option);
      }

      let dinamicCategory = document.getElementById("productionSelect");
      for (let production of productionList) {
        let option = document.createElement("option");
        option.setAttribute("value", production.Title);
        option.innerText = `${production.Title}`;
        dinamicCategory.appendChild(option);
      }
      if (del) {
        let errorDiv = document.createElement("div");
        errorDiv.setAttribute("Id", "errorDiv")

        if (doneActor == true) {
          let errorActorDiv = document.createElement("div");
          errorActorDiv.innerHTML = `<div class="error text-info p-3"><i class="fas fa-exclamation-triangle"></i> El/La actor/actriz <strong>${actor}</strong> se ha desasignado con exito.</div>`;
          errorDiv.appendChild(errorActorDiv);
        }
        if (doneDirector == true) {
          let errorDirectorDiv = document.createElement("div");
          errorDirectorDiv.innerHTML = `<div class="error text-info p-3"><i class="fas fa-exclamation-triangle"></i>El/La director/directora <strong>${director}</strong> se ha desasignado con exito.</div>`;
          errorDiv.appendChild(errorDirectorDiv);
        }

        form.appendChild(errorDiv);

      } else if (del == false) {
        let errorDiv = document.createElement("div");
        errorDiv.setAttribute("Id", "errorDiv")

        if (doneActor == true) {
          let errorActorDiv = document.createElement("div");
          errorActorDiv.innerHTML = `<div class="error text-info p-3"><i class="fas fa-exclamation-triangle"></i> El/La actor/actriz <strong>${actor}</strong> se ha asignado con exito.</div>`;
          errorDiv.appendChild(errorActorDiv);
        }
        if (doneDirector == true) {
          let errorDirectorDiv = document.createElement("div");
          errorDirectorDiv.innerHTML = `<div class="error text-info p-3"><i class="fas fa-exclamation-triangle"></i> El/La director/directora <strong>${director}</strong> se ha asignado con exito.</div>`;
          errorDiv.appendChild(errorDirectorDiv);
        }
        form.appendChild(errorDiv);
      } else {

      }
    } else {
      if (del) {
        let errorDiv = document.createElement("div");
        errorDiv.setAttribute("Id", "errorDiv")

        if (doneActor == false) {
          let errorActorDiv = document.createElement("div");
          errorActorDiv.innerHTML = `<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> El/La actor/actriz <strong>${actor}</strong> no existe en la produccion <strong>${title}</strong>.</div>`;
          errorDiv.appendChild(errorActorDiv);
        }
        if (doneDirector == false) {
          let errorDirectorDiv = document.createElement("div");
          errorDirectorDiv.innerHTML = `<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i>El/La director/directora <strong>${director}</strong> no existe en la produccion <strong>${title}</strong>.</div>`;
          errorDiv.appendChild(errorDirectorDiv);
        }

        if (doneActor == true) {
          let errorActorDiv = document.createElement("div");
          errorActorDiv.innerHTML = `<div class="error text-info p-3"><i class="fas fa-exclamation-triangle"></i> El/La actor/actriz <strong>${actor}</strong> se ha desasignado con exito.</div>`;
          errorDiv.appendChild(errorActorDiv);
        }
        if (doneDirector == true) {
          let errorDirectorDiv = document.createElement("div");
          errorDirectorDiv.innerHTML = `<div class="error text-info p-3"><i class="fas fa-exclamation-triangle"></i>El/La director/directora <strong>${director}</strong> se ha desasignado con exito.</div>`;
          errorDiv.appendChild(errorDirectorDiv);
        }

        form.appendChild(errorDiv);
      } else if (del == false) {
        let errorDiv = document.createElement("div");
        errorDiv.setAttribute("Id", "errorDiv")
        if (doneActor == false) {
          let errorActorDiv = document.createElement("div");
          errorActorDiv.innerHTML = `<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> El/La actor/actriz <strong>${actor}</strong> ya existe en la produccion <strong>${title}</strong>.</div>`;
          errorDiv.appendChild(errorActorDiv);
        }
        if (doneDirector == false) {
          let errorDirectorDiv = document.createElement("div");
          errorDirectorDiv.innerHTML = `<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> El/La director/directora <strong>${director}</strong> ya existe en la produccion <strong>${title}</strong>.</div>`;
          errorDiv.appendChild(errorDirectorDiv);
        }
        if (doneActor == true) {
          let errorActorDiv = document.createElement("div");
          errorActorDiv.innerHTML = `<div class="error text-info p-3"><i class="fas fa-exclamation-triangle"></i> El/La actor/actriz <strong>${actor}</strong> se ha asignado con exito.</div>`;
          errorDiv.appendChild(errorActorDiv);
        }
        if (doneDirector == true) {
          let errorDirectorDiv = document.createElement("div");
          errorDirectorDiv.innerHTML = `<div class="error text-info p-3"><i class="fas fa-exclamation-triangle"></i> El/La director/directora <strong>${director}</strong> se ha asignado con exito.</div>`;
          errorDiv.appendChild(errorDirectorDiv);
        }
        form.appendChild(errorDiv);
      }

    }
  }


  categoryForm(done, cat, del) {

    let modal = document.getElementById("formModal");
    if (document.getElementById("errorDiv")) modal.removeChild(document.getElementById("errorDiv"));
    let form = document.getElementById("formModal");
    if (done) {
      form.innerHTML = ` <div class="container" id="cValidation" >
        <h1 class="display-5">Categorias</h1>
        <form name="fNewCategory" role="form" id="form-validation">
          <!-- Requiered -->
          <div class="form-row">
          <div class="row">
            <div class="col-md-4 mb-3 w-100" >
              <label for="vfName">Nombre *</label>
              <div class="input-group">
                    
                <input type="text" class="form-control" id="vfName" name="vfName" placeholder="Nombre"
                  aria-describedby="namePrepend" value="" required>
                <div class="invalid-feedback">El Nombre es obligatorio.</div>
                <div class="valid-feedback">Correcto.</div>
              </div>
              </div>
              <div class="col-md-4 mb-3 w-50" >
              <div class="input-group">
              <input class="form-check-input" type="checkbox" id="CheckDelete">
              <label class="form-check-label ms-1" for="CheckDelete">
                Eliminar
              </label>
              </div>
              </div>
              <div class="col-md-4 mb-3 w-100">
                <div class="input-group">
                  
                <label for="Description">Descripción</label>
                <div class="input-group">        
                  <textarea type="text" class="form-control" id="Description" name="Description"
                   aria-describedby="descriptionPrepend" rows="9"></textarea>
                </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-3 w-100">
              <label for="Image">Imagen</label>
              <div class="input-group">
                
                <input type="file" class="form-control" id="Image" name="Image" aria-describedby="imagePrepend">
              </div>
          </div>
          </div>
          <button type="submit" class="btn btn-primary">Ejecutar</button>
            </div>
            </form>
            </div>`;
      if (del) {
        let errorDiv = document.createElement("div");
        errorDiv.setAttribute("Id", "errorDiv")
        errorDiv.innerHTML = `<div class="error text-info p-3"><i class="fas fa-exclamation-triangle"></i> La categoría <strong>${cat}</strong> se ha eliminado con exito.</div>`;
        form.appendChild(errorDiv);
      } else if (del == false) {
        let errorDiv = document.createElement("div");
        errorDiv.setAttribute("Id", "errorDiv")
        errorDiv.innerHTML = `<div class="error text-info p-3"><i class="fas fa-exclamation-triangle"></i> La categoría <strong>${cat}</strong> se ha creado con exito.</div>`;
        form.appendChild(errorDiv);
      } else {

      }
    } else {
      if (del) {
        let errorDiv = document.createElement("div");
        errorDiv.setAttribute("Id", "errorDiv")
        errorDiv.innerHTML = `<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> La categoría <strong>${cat}</strong> no existe.</div>`;
        form.appendChild(errorDiv);
      } else if (del == false) {
        let errorDiv = document.createElement("div");
        errorDiv.setAttribute("Id", "errorDiv")
        errorDiv.innerHTML = `<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> La categoría <strong>${cat}</strong> ya está creada.</div>`;
        form.appendChild(errorDiv);
      }

    }

  }

  loginForm() {
    let nav = document.getElementById("navbarUl");
    if (document.getElementById("nav-forms")) nav.removeChild(document.getElementById("nav-forms"));
    if (document.getElementById("nav-greeting")) nav.removeChild(document.getElementById("nav-greeting"));
    if (document.getElementById("nav-logOff")) nav.removeChild(document.getElementById("nav-logOff"));

    if (document.getElementById("div-Contents")) this.main.removeChild(document.getElementById("div-Contents"));
    if (document.getElementById("div-categories")) this.main.removeChild(document.getElementById("div-categories"));
    let loginContainer = document.createElement("div");
    // Le añadimos una clase (container)
    loginContainer.classList.add("container");
    loginContainer.classList.add("text-center");
    loginContainer.setAttribute("Id", "div-Contents");
    loginContainer.setAttribute("height", "200px");

    let form = document.createElement("form");
    form.setAttribute("name", "fLogin");
    form.setAttribute("role", "form");
    form.setAttribute("id", "form-validation");
    form.innerHTML = ` <div class="form-row">
    <div class="row">
      <div class="col-md-4 mb-3 w-100" >
        <label for="vfUsuario">Usuario</label>
        <div class="input-group">
              
          <input type="text" class="form-control" id="vfUsuario" name="vfUsuario" placeholder="Usuario"
            aria-describedby="namePrepend" value="" required>
          <div class="invalid-feedback">El Nombre es obligatorio.</div>
          <div class="valid-feedback">Correcto.</div>
        </div>
        </div>
        <div class="col-md-4 mb-3 w-100" >
        <label for="vfPasswd">Contraseña</label>
        <div class="input-group">
              
          <input type="password" class="form-control" id="vfPasswd" name="vfPasswd" placeholder="Passwd"
            aria-describedby="passwdPrepend" value="" required>
          <div class="invalid-feedback">La contraseña es obligatoria.</div>
          <div class="valid-feedback">Correcto.</div>
        </div>
        </div>
        </div>
        <button type="submit" class="btn btn-primary">Iniciar sesión</button>
        `;
    this.main.appendChild(loginContainer);
    loginContainer.appendChild(form);
  }

  /**
   * Cierra todas las ventanas
   */
  closeAllWindows() {
    for (let window of this.windows.values()) {
      if (!window.closed) {
        window.close();
      }
    }

    this.windows = new Map();
  }

  /**
  * Funcion que añade un evento a los elementos con la clase init
  * @param {Function} handler 
  */
  bindInit(handler) {
    for (let element of document.getElementsByClassName('init')) {
      element.addEventListener("click", (event) => {
        this.#excecuteHandler(handler, [], 'body', { action: 'init' }, '#Inicio', event);
        // handler();
      });

    }
  }

  /**
  * Funcion que añade un evento a los elementos con la clase serie
  * @param {Function} handler 
  */
  bindSeries(handler) {
    for (let element of document.getElementsByClassName('series')) {
      element.addEventListener("click", (event) => {
        this.#excecuteHandler(handler, [], 'body', { action: 'showSeries' }, '#Series', event);
      });

    }
  }

  /**
  * Funcion que añade un evento a los elementos con la clase movies
  * @param {Function} handler 
  */
  bindMovies(handler) {
    for (let element of document.getElementsByClassName('movies')) {
      element.addEventListener("click", (event) => {
        this.#excecuteHandler(handler, [], 'body', { action: 'showMovies' }, '#Movies', event);
      });

    }
  }

  /**
  * Funcion que añade un evento a los elementos con la clase actors
  * @param {Function} handler 
  */
  bindActors(handler) {
    for (let element of document.getElementsByClassName('actors')) {
      element.addEventListener("click", (event) => {
        this.#excecuteHandler(handler, [], 'body', { action: 'showActors' }, '#Actores', event);
      });

    }
  }

  /**
   * Funcion que añade un evento a los elementos con la clase person-Directores-window
   * @param {Function} handler 
   */
  bindDirectors(handler) {
    for (let element of document.getElementsByClassName('directors')) {
      element.addEventListener("click", (event) => {
        this.#excecuteHandler(handler, [], 'body', { action: 'showDirectors' }, '#Directores', event);
        handler();
      });

    }
  }

  /**
  * Funcion que añade un evento a los elementos con la clase person-Actores
  * @param {Function} handler 
  */
  bindActorCard(handler) {
    for (let element of document.getElementsByClassName('person-Actores')) {
      element.addEventListener("click", (event) => {
        this.#excecuteHandler(handler, element.dataset.person, 'body', { action: 'showActorCard', picture: element.dataset.person }, '#ActoresCard', event);
      });

    }
  }

  /**
 * Funcion que añade un evento a los elementos con la clase person-Directores
 * @param {Function} handler 
 */
  bindDirectorCard(handler) {
    for (let element of document.getElementsByClassName('person-Directores')) {
      element.addEventListener("click", (event) => {
        this.#excecuteHandler(handler, element.dataset.person, 'body', { action: 'showDirectorCard', picture: element.dataset.person }, '#DirectoresCard', event);
      });

    }
  }

  /**
  * Funcion que añade un evento a los elementos con la clase person-Actores-window
  * @param {Function} handler 
  */
  bindActorCardWindow(handler) {
    for (let element of document.getElementsByClassName('person-Actores-window')) {
      element.addEventListener("click", (event) => {
        handler(element.dataset.person);
      });

    }
  }

  /**
   * Funcion que añade un evento a los elementos con la clase person-Directores-window
   * @param {Function} handler 
   */
  bindDirectorCardWindow(handler) {
    for (let element of document.getElementsByClassName('person-Directores-window')) {
      element.addEventListener("click", (event) => {
        handler(element.dataset.person);
      });

    }
  }

  /**
    * Funcion que añade un evento a los elementos con la clase production-btn
    * @param {Function} handler 
    */
  bindProductionCard(handler) {
    for (let element of document.getElementsByClassName('production-btn')) {
      element.addEventListener("click", (event) => {
        this.#excecuteHandler(handler, element.dataset.production, 'body', { action: 'showProduction', title: element.dataset.production }, '#ProductionCard', event);
      });

    }
  }

  /**
   * Funcion que añade un evento a los elementos con la clase production-btn-window
   * @param {Function} handler 
   */
  bindProductionCardWindow(handler) {
    for (let element of document.getElementsByClassName('production-btn-window')) {
      element.addEventListener("click", (event) => {
        handler(element.dataset.production);
      });

    }
  }

  /**
   * Funcion que añade un evento a los elementos con la clase category
   * @param {Function} handler 
   */
  bindCategory(handler) {
    for (let element of document.getElementsByClassName('category')) {

      element.addEventListener("click", (event) => {
        this.#excecuteHandler(handler, element.dataset.category, 'body', { action: 'showCategory', category: element.dataset.category }, '#Category', event);
      });

    }
  }

  /**
   * Funcion que añade un evento a los elementos con la clase close Window
   * @param {Function} handler 
   */
  bindWindow(handler) {
    for (let element of document.getElementsByClassName('close-windows')) {

      element.addEventListener("click", (event) => {
        handler()
      });

    }
  }

  /**
   * Funcion que añade un evento a los elementos con la clase formProduction
   * @param {Function} handler 
   */
  bindFormProduction(handler) {
    document.getElementById("FormProduction").addEventListener("click", (event) => {
      handler()
    });

  }

  /**
 * Funcion que llama a la validacion de la nueva Production
 * @param {Function} handler 
 */
  bindNewProduction(handler) {
    newProductionValidation(handler);
  }

  /**
   * Funcion que añade un evento a los elementos con la clase formCasting
   * @param {Function} handler 
   */
  bindFormCasting(handler) {
    document.getElementById("FormCasting").addEventListener("click", (event) => {
      handler()
    });

  }

  /**
 * Funcion que llama a la validacion de asignar casting
 * @param {Function} handler 
 */
  bindChangeCasting(handler) {
    changeCasting(handler);
  }

  /**
   * Funcion que añade un evento a los elementos con la clase formCategory
   * @param {Function} handler 
   */
  bindFormCategory(handler) {
    document.getElementById("FormCategory").addEventListener("click", (event) => {
      handler()
    });

  }
  /**
   * Funcion que llama a la validacion de la nueva categoria
   * @param {Function} handler 
   */
  bindNewCategory(handler) {
    newCategoryValidation(handler);
  }

  /**
   * Funcion que añade un evento a los elementos con la clase formPerson
   * @param {Function} handler 
  */
  bindFormPerson(handler) {
    document.getElementById("FormPerson").addEventListener("click", (event) => {
      handler()
    });

  }
  /**
   * Funcion que llama a la validacion de la nueva persona
   * @param {Function} handler 
   */
  bindNewPerson(handler) {
    newPersonValidation(handler);
  }


  /**
   * Funcion que añade un evento a los elementos con la Id log-off
   * @param {Function} handler 
  */
  bindLogOff(handler) {
    document.getElementById("log-off").addEventListener("click", (event) => {
      handler()
    });

  }
  
  /**
   * Funcion que añade un evento a los elementos con la Id 
   * @param {Function} handler 
  */
  bindBackUp(handler) {
    document.getElementById("nav-backUp").addEventListener("click", (event) => {
      handler()
    });

  }

    /**
   * Funcion que añade un evento a los elementos con la clase add-favorite
   * @param {Function} handler 
   */
    bindFavorite(handler) {
      for (let element of document.getElementsByClassName('add-favorite')) {
        element.addEventListener("click", (event) => {
          handler(element.dataset.production)
        });
  
      }
    }
  

  /**
 * Funcion que llama al nuevo logIn
 * @param {Function} handler 
 */
  bindLogIn(handler) {
    logIn(handler);
  }

}

export default videoSystemView;