"use strict";
import videoSystem from "./VideoSystemModel.js";

class videoSystemController {
    //Campos privados
    #videoSystemModel;
    #videoSystemView;

    // #loadDefaultObjects() {

    // }

    constructor(videoSystemModel, videoSystemView) {
        this.#videoSystemModel = videoSystemModel;
        this.#videoSystemView = videoSystemView;

        // Lo invocamos en el constructor como primer evento ya que el resto necesitarán que la carga inicial se haya producido.
        this.onLoad();

        this.onInit();

        // Enlazamos handlers con la vista
        this.#videoSystemView.bindInit(this.handleInit);
    }

    onLoad = () => {
        // this.#loadDefaultObjects();
        
        fetch("js/JSON/datos.json")
        .then(respuesta=>respuesta.json())
        .then(data=>{
            data.Production.Movie.forEach(mov =>{
				let auxMovie = this.#videoSystemModel.movieFactory(mov.Title,mov.Publication,mov.Nationality,mov.Synopsis,mov.Image,mov.Seasons);
				this.#videoSystemModel.addProductions(auxMovie);

            })

            data.Production.Serie.forEach(serie =>{
				let auxSerie = this.#videoSystemModel.serieFactory(serie.Title,serie.Publication,serie.Nationality,serie.Synopsis,serie.Image,serie.Seasons);
				this.#videoSystemModel.addProductions(auxSerie);

            })

            data.Category.forEach(category =>{
				let auxCtgr = this.#videoSystemModel.categoryFactory(category.Name,category.Description);
				this.#videoSystemModel.addCategory(auxCtgr);        
				this.#videoSystemModel.assignCategory(auxCtgr,category.Producciones);

            })
            
            data.Person.Actor.forEach(person =>{
				let auxActor = this.#videoSystemModel.personFactory(person.name,person.dni,person.lastname1,person.born,person.lastname2,person.picture);
				this.#videoSystemModel.addActor(auxActor);
                this.#videoSystemModel.assignActor(auxActor,person.Producciones)
                // person.Producciones.forEach(element => {
                //     this.#videoSystemModel.assignActor(auxActor,person.Producciones)
                    
                // });
            })
            
            data.Person.Director.forEach(person =>{
                let auxDirector = this.#videoSystemModel.personFactory(person.name,person.dni,person.lastname1,person.born,person.lastname2,person.picture);
				this.#videoSystemModel.addDirector(auxDirector);
                this.#videoSystemModel.assignDirector(auxDirector,person.Producciones)
                // person.Producciones.forEach(element => {
                //     this.#videoSystemModel.assignActor(auxActor,person.Producciones)
                    
                // });
            })
            
            data.User.forEach(user =>{
                let auxUser = this.#videoSystemModel.userFactory(user.Username,user.Email,user.Password);
                this.#videoSystemModel.addUser(auxUser);
            })

        })
        }
    

    onInit = () => {
        this.#videoSystemView.headerCategories(this.#videoSystemModel.CategoriesList);
        
        // this.#videoSystemView.showCategories(this.#videoSystemModel.CategoriesList);
        // this.#videoSystemView.rngProductions(this.#videoSystemModel.Productions);
        // this.#videoSystemView.headerForms();
        // this.#videoSystemView.createModal();


        this.#videoSystemView.bindWindow(this.handleCloseWindows);
        this.#videoSystemView.bindCategory(this.handleCategory);
        this.#videoSystemView.bindSeries(this.handleSeries);
        this.#videoSystemView.bindMovies(this.handleMovies);
        this.#videoSystemView.bindActors(this.handleActors);
        this.#videoSystemView.bindDirectors(this.handleDirectors);
        this.#videoSystemView.bindProductionCard(this.HandleProduction);
        this.#videoSystemView.bindProductionCardWindow(this.HandleProductionWindow);
        // this.#videoSystemView.bindFormProduction(this.HandleProductionForm);
        // this.#videoSystemView.bindFormCasting(this.HandleCastingForm);
        // this.#videoSystemView.bindFormCategory(this.HandleCategoryForm);
        // this.#videoSystemView.bindFormPerson(this.HandlePersonForm);
        let cookie1 = document.cookie.replace(/(?:(?:^|.*;\s*)Cookie1\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if (cookie1!="") {
            this.onLogIn();
        } else {
            this.#videoSystemView.loginForm();
            this.#videoSystemView.bindLogIn(this.HandleLogIn);
        }
    }

    onLogIn = () => {
        let cookie1 = document.cookie.replace(/(?:(?:^|.*;\s*)Cookie1\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        this.#videoSystemView.showCategories(this.#videoSystemModel.CategoriesList);
        this.#videoSystemView.rngProductions(this.#videoSystemModel.Productions);
        this.#videoSystemView.headerLogged(cookie1);
        this.#videoSystemView.bindLogOff(this.HandleLogOff);
        this.#videoSystemView.bindFormProduction(this.HandleProductionForm);
        this.#videoSystemView.bindFormCasting(this.HandleCastingForm);
        this.#videoSystemView.bindFormCategory(this.HandleCategoryForm);
        this.#videoSystemView.bindFormPerson(this.HandlePersonForm);

        this.#videoSystemView.bindWindow(this.handleCloseWindows);
        this.#videoSystemView.bindCategory(this.handleCategory);
        this.#videoSystemView.bindSeries(this.handleSeries);
        this.#videoSystemView.bindMovies(this.handleMovies);
        this.#videoSystemView.bindActors(this.handleActors);
        this.#videoSystemView.bindDirectors(this.handleDirectors);
        this.#videoSystemView.bindProductionCard(this.HandleProduction);
        this.#videoSystemView.bindProductionCardWindow(this.HandleProductionWindow);
    }

    failedLogIn = () => {
        this.#videoSystemView.showCategories(this.#videoSystemModel.CategoriesList);
        this.#videoSystemView.rngProductions(this.#videoSystemModel.Productions);

        this.#videoSystemView.bindWindow(this.handleCloseWindows);
        this.#videoSystemView.bindCategory(this.handleCategory);
        this.#videoSystemView.bindSeries(this.handleSeries);
        this.#videoSystemView.bindMovies(this.handleMovies);
        this.#videoSystemView.bindActors(this.handleActors);
        this.#videoSystemView.bindDirectors(this.handleDirectors);
        this.#videoSystemView.bindProductionCard(this.HandleProduction);
        this.#videoSystemView.bindProductionCardWindow(this.HandleProductionWindow);
    }

    handleInit = () => {
        this.onInit();
    }

    handleCloseWindows = () => {
        this.onClickClosewindows();
    }

    handleCategory = (name) => {
        this.onClickCategory(name);
        this.#videoSystemView.bindProductionCard(this.HandleProduction);
        this.#videoSystemView.bindProductionCardWindow(this.HandleProductionWindow);
    }

    handleSeries = () => {
        this.onClickSeries();
        this.#videoSystemView.bindProductionCard(this.HandleProduction);
        this.#videoSystemView.bindProductionCardWindow(this.HandleProductionWindow);
    }

    handleMovies = () => {
        this.onClickMovies();
        this.#videoSystemView.bindProductionCard(this.HandleProduction);
        this.#videoSystemView.bindProductionCardWindow(this.HandleProductionWindow);
    }


    handleActors = () => {
        this.onClickActors();
        this.#videoSystemView.bindActorCard(this.handleActorCard);
        this.#videoSystemView.bindActorCardWindow(this.handleActorCardWindow);

    }


    handleDirectors = () => {
        this.onClickDirectors();
        this.#videoSystemView.bindDirectorCard(this.handleDirectorCard);
        this.#videoSystemView.bindDirectorCardWindow(this.handleDirectorCardWindow);

    }

    handleActorCard = (dni) => {
        this.onClickActorCard(dni);
        this.#videoSystemView.bindProductionCard(this.HandleProduction);
        this.#videoSystemView.bindProductionCardWindow(this.HandleProductionWindow);

    }

    handleDirectorCard = (dni) => {
        this.onClickDirectorCard(dni);
        this.#videoSystemView.bindProductionCard(this.HandleProduction);
        this.#videoSystemView.bindProductionCardWindow(this.HandleProductionWindow);
    }

    handleActorCardWindow = (dni) => {
        this.onClickActorCardWindow(dni);
    }

    handleDirectorCardWindow = (dni) => {
        this.onClickDirectorCardWindow(dni);
    }

    HandleProduction = (title) => {
        this.onClickProductionCard(title);
        this.#videoSystemView.bindActorCard(this.handleActorCard);
        this.#videoSystemView.bindActorCardWindow(this.handleActorCardWindow);
        this.#videoSystemView.bindDirectorCard(this.handleDirectorCard);
        this.#videoSystemView.bindDirectorCardWindow(this.handleDirectorCardWindow);
    }

    HandleProductionWindow = (title) => {
        this.onClickProductionCardWindow(title);
    }

    HandleProductionForm = () => {
        this.onClickProductionForm();
    }

    HandleCastingForm = () => {
        this.onClickCastingForm();
    }

    HandleCategoryForm = () => {
        this.onClickCategoryForm();

    }

    HandlePersonForm = () => {
        this.onClickPersonForm();
    }
    HandleLogOff = () => {
        this.onClickLogOff();
    }

    onClickClosewindows = () => {
        this.#videoSystemView.closeAllWindows();
    }

    onClickCategory = (name) => {
        this.#videoSystemView.showCategoriesProductions(this.#videoSystemModel.getProductionsCategory(this.#videoSystemModel.getCategoryByName(name)), name);
    }

    onClickSeries = () => {
        this.#videoSystemView.showProductions(this.#videoSystemModel.Series, "Series");
    }

    onClickMovies = () => {
        this.#videoSystemView.showProductions(this.#videoSystemModel.Movies, "Peliculas");
    }
    onClickActors = () => {
        this.#videoSystemView.showPersonsList(this.#videoSystemModel.Actors, "Actores");
    }

    onClickDirectors = () => {
        this.#videoSystemView.showPersonsList(this.#videoSystemModel.Directors, "Directores");
    }

    onClickActorCard = (dni) => {
        this.#videoSystemView.showPerson(this.#videoSystemModel.getPersonByDNI(dni), this.#videoSystemModel.getProductionsActor(this.#videoSystemModel.getPersonByDNI(dni)));
    }

    onClickDirectorCardWindow = (dni) => {
        let windowDirector = this.#videoSystemView.windows.get(dni);

        if (!windowDirector || windowDirector.closed) {

            windowDirector = window.open("window.html", dni, "width=800, height=1000, top=0, left=0, titlebar=yes, toolbar=no, menubar=no, location=no");
            windowDirector.addEventListener('DOMContentLoaded', () => {
                this.#videoSystemView.showPersonWindow(this.#videoSystemModel.getPersonByDNI(dni), this.#videoSystemModel.getProductionsDirector(this.#videoSystemModel.getPersonByDNI(dni)), windowDirector);
            });
        } else {
            windowDirector.focus();

        }
    }

    onClickActorCardWindow = (dni) => {
        let windowActor = this.#videoSystemView.windows.get(dni);
        if (!windowActor || windowActor.closed) {

            windowActor = window.open("window.html", dni, "width=800, height=1000, top=0, left=0, titlebar=yes, toolbar=no, menubar=no, location=no");
            windowActor.addEventListener('DOMContentLoaded', () => {
                this.#videoSystemView.showPersonWindow(this.#videoSystemModel.getPersonByDNI(dni), this.#videoSystemModel.getProductionsActor(this.#videoSystemModel.getPersonByDNI(dni)), windowActor);
            });
        } else {
            windowActor.focus();

        }
    }

    onClickDirectorCard = (dni) => {
        this.#videoSystemView.showPerson(this.#videoSystemModel.getPersonByDNI(dni), this.#videoSystemModel.getProductionsDirector(this.#videoSystemModel.getPersonByDNI(dni)));
    }

    onClickProductionCard = (title) => {
        this.#videoSystemView.showProductionCard(this.#videoSystemModel.getProductionByTitle(title), this.#videoSystemModel.getCast(this.#videoSystemModel.getProductionByTitle(title)),
            this.#videoSystemModel.getDirector(this.#videoSystemModel.getProductionByTitle(title)));
    }

    onClickProductionCardWindow = (title) => {
        let windowProduction = this.#videoSystemView.windows.get(title);

        if (!windowProduction || windowProduction.closed) {
            windowProduction = window.open("window.html", title, "width=1500, height=1000, top=0, left=0, titlebar=yes, toolbar=no, menubar=no, location=no");
            windowProduction.addEventListener('DOMContentLoaded', () => {
                this.#videoSystemView.showProductionCardWindow(this.#videoSystemModel.getProductionByTitle(title), this.#videoSystemModel.getCast(this.#videoSystemModel.getProductionByTitle(title)),
                    this.#videoSystemModel.getDirector(this.#videoSystemModel.getProductionByTitle(title)), windowProduction);
            });
        } else {
            windowProduction.focus();
        }

    }

    onClickProductionForm = () => {
        this.#videoSystemView.productionForm(this.#videoSystemModel.CategoriesList, this.#videoSystemModel.Actors, this.#videoSystemModel.Directors, true, "", undefined);
        this.#videoSystemView.bindNewProduction(this.handleCreateProduction);
    }

    onClickCastingForm = () => {
        this.#videoSystemView.castingForm(this.#videoSystemModel.Productions, this.#videoSystemModel.Actors, this.#videoSystemModel.Directors, true, "", undefined, "", undefined, "", undefined);
        this.#videoSystemView.bindChangeCasting(this.handleChangeCasting);
    }

    onClickCategoryForm = () => {
        this.#videoSystemView.categoryForm(true, "", undefined);
        this.#videoSystemView.bindNewCategory(this.handleCreateCategory);
    }

    onClickLogInForm = () => {
        this.#videoSystemView.bindNewCategory(this.handleCreateCategory);
    }

    handleCreateCategory = (name, desc, del) => {
        let done;

        if (del) {
            try {
                this.#videoSystemModel.removeCategory(this.#videoSystemModel.getCategoryByName(name));
                done = true;
                this.onLogIn();
            } catch (exception) {
                done = false;
            }
        } else {
            try {
                this.#videoSystemModel.addCategory(this.#videoSystemModel.categoryFactory(name, desc));
                done = true;
                this.onLogIn();
            } catch (exception) {
                done = false;
            }
        }
        this.#videoSystemView.categoryForm(done, name, del);
        if (done) this.#videoSystemView.bindNewCategory(this.handleCreateCategory);

    }

    onClickPersonForm = () => {
        this.#videoSystemView.personForm(true, "", undefined);
        this.#videoSystemView.bindNewPerson(this.handleCreatePerson);
    }

    handleCreatePerson = (type, name, del, born, dni, lastName, LastNameTwo) => {
        let done;
        if (type == "Actor") {
            if (del) {
                try {
                    this.#videoSystemModel.removeActor(this.#videoSystemModel.getPersonByDNI(dni));
                    done = true;
                    this.onLogIn();
                } catch (exception) {
                    done = false;
                }
            } else {
                try {
                    if (this.#videoSystemModel.getPersonByDNI(dni)) {
                        this.#videoSystemModel.addActor(this.#videoSystemModel.getPersonByDNI(dni));
                    } else {
                        this.#videoSystemModel.addActor(this.#videoSystemModel.personFactory(name, dni, lastName, born, LastNameTwo));
                    }
                    done = true;
                    this.onLogIn();
                } catch (exception) {
                    done = false;
                }
            }
        } else {
            if (del) {
                try {
                    this.#videoSystemModel.removeDirector(this.#videoSystemModel.getPersonByDNI(dni));
                    done = true;
                    this.onLogIn();
                } catch (exception) {
                    done = false;
                }
            } else {
                try {
                    if (this.#videoSystemModel.getPersonByDNI(dni)) {
                        this.#videoSystemModel.addDirector(this.#videoSystemModel.getPersonByDNI(dni));
                    } else {
                        this.#videoSystemModel.addDirector(this.#videoSystemModel.PersonFactory(name, dni, lastName, born, LastNameTwo));
                    }
                    done = true;
                    this.onLogIn();
                } catch (exception) {
                    done = false;
                }
            }
        }
        this.#videoSystemView.personForm(done, name, del);
        if (done) this.#videoSystemView.bindNewPerson(this.handleCreatePerson);

    }

    handleCreateProduction = (type, title, del, date, nat, syn, directors, actors, categories) => {
        let done;
        let production;
        if (type == "Serie") {
            if (del) {
                try {
                    this.#videoSystemModel.removeProductions(this.#videoSystemModel.getProductionByTitle(title));
                    done = true;
                    this.onLogIn();
                } catch (exception) {
                    done = false;
                }
            } else {
                try {
                    production = this.#videoSystemModel.serieFactory(title, date, nat, syn);
                    this.#videoSystemModel.addProductions(production);

                    directors.forEach(element => {
                        this.#videoSystemModel.assignDirector(this.#videoSystemModel.getPersonByDNI(element), production);
                    });

                    actors.forEach(element => {
                        this.#videoSystemModel.assignActor(this.#videoSystemModel.getPersonByDNI(element), production);
                    });

                    categories.forEach(element => {
                        this.#videoSystemModel.assignCategory(this.#videoSystemModel.getCategoryByName(element), production);
                    });

                    done = true;
                    this.onLogIn();
                } catch (exception) {
                    done = false;
                }
            }
        } else {
            if (del) {
                try {
                    this.#videoSystemModel.removeProductions(this.#videoSystemModel.getProductionByTitle(title));
                    done = true;
                    this.onLogIn();
                } catch (exception) {
                    done = false;
                }
            } else {
                try {
                    production = this.#videoSystemModel.movieFactory(title, date, nat, syn);
                    this.#videoSystemModel.addProductions(production);

                    directors.forEach(element => {
                        this.#videoSystemModel.assignDirector(this.#videoSystemModel.getPersonByDNI(element), production);
                    });

                    actors.forEach(element => {
                        this.#videoSystemModel.assignActor(this.#videoSystemModel.getPersonByDNI(element), production);
                    });

                    categories.forEach(element => {
                        this.#videoSystemModel.assignCategory(this.#videoSystemModel.getCategoryByName(element), production);
                    });

                    done = true;
                    this.onLogIn();
                } catch (exception) {
                    done = false;
                }
            }
        }
        this.#videoSystemView.productionForm(this.#videoSystemModel.CategoriesList, this.#videoSystemModel.Actors, this.#videoSystemModel.Directors, done, title, del);
        if (done) this.#videoSystemView.bindNewProduction(this.handleCreateProduction);

    }

    handleChangeCasting = (prod, actor, direct, des) => {
        let done;
        let doneActor;
        let doneDirect;
        let production;
        let actorUsed;
        let directorUsed;
        production = this.#videoSystemModel.getProductionByTitle(prod);
        actorUsed = this.#videoSystemModel.getPersonByDNI(actor);
        directorUsed = this.#videoSystemModel.getPersonByDNI(direct);
        if (actor != "") {
            actor = actorUsed.Name;
        }
        if (direct != "") {
            direct = directorUsed.Name;
        }
        if (des) {
            try {
                if (actor != "") {
                    this.#videoSystemModel.deassignActor(actorUsed, production);
                    doneActor = true;
                }
                done = true;
                this.onLogIn();
            } catch (exception) {
                done = false;
                doneActor = false;
            }
            try {
                if (direct != "") {
                    this.#videoSystemModel.deassignDirector(directorUsed, production);
                    doneDirect = true;
                }
                if (done != false) {
                    done = true;
                }
                this.onLogIn();
            } catch (exception) {
                done = false;
                doneDirect = false;
            }
        } else {
            try {
                if (actor != "") {
                    this.#videoSystemModel.assignActor(actorUsed, production);
                    doneActor = true;
                }

                done = true;
                this.onLogIn();
            } catch (exception) {
                done = false;
                doneActor = false;
            }
            try {
                if (direct != "") {
                    this.#videoSystemModel.assignDirector(directorUsed, production);
                    doneDirect = true;
                }
                if (done != false) {
                    done = true;
                }
                this.onLogIn();
            } catch (exception) {
                done = false;
                doneDirect = false;
            }
        }
        this.#videoSystemView.castingForm(this.#videoSystemModel.Productions, this.#videoSystemModel.Actors, this.#videoSystemModel.Directors, done, actor, doneActor, direct, doneDirect, prod, des);
        if (done) this.#videoSystemView.bindChangeCasting(this.handleChangeCasting);

    }

    HandleLogIn = (user, passwd) => {
        if (this.#videoSystemModel.checkLogin(user, passwd)) {
            document.cookie = `Cookie1 = ${user}`;
            this.onLogIn();
        } else {
            this.failedLogIn();
        }
    }

    onClickLogOff = () => {
       this.setCookie("Cookie1");
       this.onInit();
    }

    setCookie(cname) {
        const d = new Date();
        d.setTime(d.getTime());
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + ";" + expires + ";path=/";
    }
}

export default videoSystemController