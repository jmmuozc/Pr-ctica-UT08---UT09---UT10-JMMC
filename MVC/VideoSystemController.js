"use strict";
import videoSystem from "./VideoSystemModel.js";

class videoSystemController {
    //Campos privados
    #videoSystemModel;
    #videoSystemView;

    #loadDefaultObjects() {

        let category1 = this.#videoSystemModel.categoryFactory("Comedia", "Peliculas de comedia, destinadas a hacer reir al espectador");

        let production1 = this.#videoSystemModel.movieFactory("Ocho apellidos vascos", "14/03/2014", "ES", "Rafa, un señorito andaluz que nunca ha salido de Sevilla, decide dejarlo todo para conquistar a Amaia, una chica vasca. Se muda al País Vasco y allí tendrá que adaptarse a un nuevo entorno y hacerse pasar por vasco para ganarse la aprobación del padre de Amaia.", "Ocho-apellidos-vascos.jpg");

        let person1 = this.#videoSystemModel.personFactory("Dani", "03887947G", "Rovira", "01/11/1980", "Rivas", "DaniRovira.jpg");
        this.#videoSystemModel.addActor(person1);
        let person2 = this.#videoSystemModel.personFactory("Carmen", "71025412D", "Machi", "07/01/1963", "Arroyo", "CarmenMachi.jpg");
        this.#videoSystemModel.addActor(person2);
        let person3 = this.#videoSystemModel.personFactory("Emilio", "31186215D", "Martínez", "30/11/1944", "Lazaro", "EmilioMartinez.jpg");
        this.#videoSystemModel.addDirector(person3);

        let production2 = this.#videoSystemModel.movieFactory("Zoolander", "04/1/2002", "US", "Derek Zoolander ha sido el modelo masculino más cotizado durante los últimos tres años. Cuando le arrebatan la corona, decide retirarse, hasta que un diseñador le pide que desfile para él, involucrándolo al mismo tiempo en una trama de asesinato.", "Zoolander.png");

        let person4 = this.#videoSystemModel.personFactory("Ben", "84718220C", "Stiller", "30/11/1965", "Meara", "Ben_Stiller.jpg");
        this.#videoSystemModel.addActor(person4);
        let person5 = this.#videoSystemModel.personFactory("Owen", "36685822V", "Wilson", "18/11/1968", "Cunningham", "Owen_Wilson.jpg");
        this.#videoSystemModel.addActor(person5);
        this.#videoSystemModel.addDirector(person4);

        let production3 = this.#videoSystemModel.serieFactory("Castle", "09/3/2009", "US", "Aburrido con su éxito, el reconocido escritor de novelas misteriosas Rick Castle se une a la detective de NYPD, Kate Beckett para resolver el caso de un asesino que emula a otro de su calaña recreando las escenas de asesinato de las novelas de Rick. Desafortunadamente, él y Kate disienten violentamente y pareciera que se fuesen a matar uno al otro.", "Castle.jpg", 8);

        let person6 = this.#videoSystemModel.personFactory("Nathan", "24009028H", "Christopher", "27/3/1971", "Fillion", "Nathan_Fillion.jpg");
        this.#videoSystemModel.addActor(person6);
        let person7 = this.#videoSystemModel.personFactory("Stana", "06859582Q", "Katic", "26/4/1978", "Katic", "Stana_Katic.jpg");
        this.#videoSystemModel.addActor(person7);
        let person8 = this.#videoSystemModel.personFactory("Andrew", "84590389T", "Marlowe", "23/12/1966", "Marlowe", "Andrew_Marlowe.jpg");
        this.#videoSystemModel.addDirector(person8);

        let production4 = this.#videoSystemModel.serieFactory("Mejor llama a Saul", "26/04/2009", "US", "Better Call Saul sigue la transformación de Jimmy McGill (Bob Odenkirk), un ex estafador que intenta convertirse en un abogado respetable, a la personalidad del extravagante abogado penalista Saul Goodman ", "better-call-saul.jpg", 6);

        let person9 = this.#videoSystemModel.personFactory("Robert", "16868595G", "Bob", "22/10/1962", "Odenkirk", "Bob_Odenkirk.jpg");
        this.#videoSystemModel.addActor(person9);
        let person10 = this.#videoSystemModel.personFactory("Jonathan", "18041889E", "Ray", "31/1/1947", "Banks", "Jonathan_Banks.jpg");
        this.#videoSystemModel.addActor(person10);
        let person11 = this.#videoSystemModel.personFactory("Terry", "39726325N", "Mcdonough", "23/12/1966", "Mcdonough", "Terry_McDonough.jpg");
        this.#videoSystemModel.addDirector(person11);

        let category2 = this.#videoSystemModel.categoryFactory("Drama", "Peliculas de drama, destinadas a hacer llorar al espectador");

        let production5 = this.#videoSystemModel.movieFactory("Cerdo", "16/07/2021", "US", "Robin es un ermitaño atormentado por su pasado que vive en medio del bosque con la única compañía de una cerda trufera. Cuando esta le es arrebatada, Robin buscará venganza.", "pig.jpg");

        let person12 = this.#videoSystemModel.personFactory("Lyn", "41629302S", "Mendiola", "12/12/1952", "May", "LynMay.jpg");
        this.#videoSystemModel.addActor(person12);
        let person13 = this.#videoSystemModel.personFactory("José María", "00375747L", "Torre", "04/11/1977", "Hutt", "José_María_Torre.jpg");
        this.#videoSystemModel.addActor(person13);
        let person14 = this.#videoSystemModel.personFactory("Juan Carlos", "37783577M", "Daboin", "24/5/1977", "Daboin", "Juan-carlos.jpeg");
        this.#videoSystemModel.addDirector(person14);

        let production6 = this.#videoSystemModel.movieFactory("Puñales por la espalda", "29/10/2019", "US", "Un misterio moderno en el que un grupo de investigadores ha de descubrir al responsable del asesinato del patriarca de una excéntrica familia.", "Knives_Out.jpg");

        let person15 = this.#videoSystemModel.personFactory("Chris", "97980957Z", "Robert", "13/6/1981", "Evans", "Chris_Evans.jpg");
        this.#videoSystemModel.addActor(person15);
        let person16 = this.#videoSystemModel.personFactory("Ana", "30028098B", "Dearmas", "30/4/1988", "Caso", "Ana_De_Armas.png");
        this.#videoSystemModel.addActor(person16);
        let person17 = this.#videoSystemModel.personFactory("Rian", "70496193C", "Craig", "17/12/1973", "Johnson", "Rian_Johnson.jpg");
        this.#videoSystemModel.addDirector(person17);

        let production7 = this.#videoSystemModel.serieFactory("You", "09/9/2009", "US", "Una historia de amor del siglo XXI sobre un obsesivo, pero brillante mánager de 20 años de una librería, quien utiliza la era digital hiperconectada para enamorar a la mujer de sus sueños.", "You.jpg", 4);

        let person18 = this.#videoSystemModel.personFactory("Elizabeth", "74038302Z", "Lail", "13/6/1992", "Manshadi", "Elizabeth_Lail.jpg");
        this.#videoSystemModel.addActor(person18);
        let person19 = this.#videoSystemModel.personFactory("Jenna", "46401836A", "Marie", "27/9/2002", "Ortega", "Jenna_Ortega.jpg");
        this.#videoSystemModel.addActor(person19);
        let person20 = this.#videoSystemModel.personFactory("Marcos", "31029047T", "Siega", "08/6/1969", "Siega", "Marcos_Siega.jpg");
        this.#videoSystemModel.addDirector(person20);

        let production8 = this.#videoSystemModel.serieFactory("Alguien está mintiendo", "07/10/2021", "US", "Tras la muerte de Simon Kelleger, un estudiante de secundaria, cuatro de sus compañeros, Cooper, Bronwyn, Addy y Nate, se convierten en sospechosos de asesinato.", "Alguien-esta-mintiendo-serie.jpg", 2);

        let person21 = this.#videoSystemModel.personFactory("Barrett", "05456677L", "Carnahan", "22/9/1992", "Carnahan", "Barrett_Carnahan.jpg");
        this.#videoSystemModel.addActor(person21);
        let person22 = this.#videoSystemModel.personFactory("Marianly", "26545283V", "Tejada", "04/7/1992", "Tejada", "Marianly_Tejada.jpg");
        this.#videoSystemModel.addActor(person22);
        let person23 = this.#videoSystemModel.personFactory("Jennifer", "95305815W", "Marie", "12/4/1979", "Morrison", "Jennifer_Morrison.jpg");
        this.#videoSystemModel.addDirector(person23);

        let category3 = this.#videoSystemModel.categoryFactory("Aventura", "Peliculas de aventura, destinadas a hacer experimentar una aventura al espectador");

        let production9 = this.#videoSystemModel.movieFactory("Viaje al centro de la tierra", "05/09/2008", "US", "Durante una expedición científica en Islandia, el científico Trevor Anderson, su sobrino Sean y Hannah, la guía que les acompaña, quedan atrapados en una cueva.", "Viaje_al_centro_Tierra.jpg");

        let person24 = this.#videoSystemModel.personFactory("Brendan", "73509482X", "James", "02/12/1968", "Fraser", "Brendan_Fraser.jpg");
        this.#videoSystemModel.addActor(person24);
        let person25 = this.#videoSystemModel.personFactory("Josh", "92318914L", "Ryan", "12/10/1992", "Hutcherson", "Josh_Hutcherson.jpg");
        this.#videoSystemModel.addActor(person25);
        let person26 = this.#videoSystemModel.personFactory("Henry", "58451547Z", "Levin", "05/6/1909", "Levyn", "henry-levin.jpg");
        this.#videoSystemModel.addDirector(person26);

        let production10 = this.#videoSystemModel.movieFactory("Atlantis El imperio perdido", "23/11/2001", "US", "Un inexperto aventurero se convierte en la clave para desentrañar un viejo misterio cuando se une a un grupo de temerarios exploradores para encontrar el legendario imperio perdido de Atlantis.", "Atlantis.jfif");

        let person27 = this.#videoSystemModel.personFactory("Florence", "06927439T", "Stanley", "01/7/1924", "Stanley", "Florence_Stanley.png");
        this.#videoSystemModel.addActor(person27);
        let person28 = this.#videoSystemModel.personFactory("John", "04518192A", "Jonathan", "20/6/1940", "Mahoney", "John_Mahoney.jpg");
        this.#videoSystemModel.addActor(person28);
        let person29 = this.#videoSystemModel.personFactory("Kirk", "29059056M", "Wise", "24/8/1963", "Wise", "Kirk_Wise.webp");
        this.#videoSystemModel.addDirector(person29);

        let production11 = this.#videoSystemModel.serieFactory("The witcher", "23/11/2001", "US", "El brujo Geralt, un cazador de monstruos, trata de encontrar su lugar en un mundo en el que las personas suelen ser más malvadas que las bestias.", "The-Witcher.jpg", 2);

        let person30 = this.#videoSystemModel.personFactory("Joey", "89629793N", "Batey", "01/1/1989", "Batey", "Joey_Batey.png");
        this.#videoSystemModel.addActor(person30);
        let person31 = this.#videoSystemModel.personFactory("Henry", "49924909M", "Dalgliesh", "05/5/1983", "Cavill", "Henry_Cavill.jpg");
        this.#videoSystemModel.addActor(person31);
        let person32 = this.#videoSystemModel.personFactory("Alik", "68157768M", "Sakharov", "17/5/1959", "Sakharov", "Sakharov.jpg");
        this.#videoSystemModel.addDirector(person32);

        let production12 = this.#videoSystemModel.serieFactory("Hora de aventuras", "23/11/2001", "US", "Hora de Aventuras es un cuento con aire moderno sobre la interminable búsqueda del heroísmo protagonizada por Finn 'el humano' y Jake 'el perro'. Amigos del alma e inseparables se embarcan una vez tras otra en misiones muy particulares e intrépidas cruzadas a lo largo y ancho de la Tierra de Ooo.", "HoraAventuras.jpeg", 10);

        let person33 = this.#videoSystemModel.personFactory("Pendleton", "29458740H", "Ward", "23/9/1982", "Ward", "Pendleton_Ward.jpg");
        this.#videoSystemModel.addActor(person33);
        let person34 = this.#videoSystemModel.personFactory("Justin", "11442737F", "Mark", "21/2/1980", "Roiland", "Justin_Roiland.jpg");
        this.#videoSystemModel.addActor(person34);
        let person35 = this.#videoSystemModel.personFactory("Larry", "87132573V", "Leichliter", "24/5/1941", "Leichliter", "Larry_Leichliter.jpg");
        this.#videoSystemModel.addDirector(person35);

        let userAdmin = this.#videoSystemModel.userFactory("Admin", "Admin@gmail.com", "Admin01");


        this.#videoSystemModel.addCategory(category1);
        this.#videoSystemModel.assignCategory(category1, production1, production2, production3, production4);
        this.#videoSystemModel.assignActor(person1, production1);
        this.#videoSystemModel.assignActor(person2, production1);
        this.#videoSystemModel.assignDirector(person3, production1);
        this.#videoSystemModel.assignActor(person4, production2);
        this.#videoSystemModel.assignActor(person5, production2);
        this.#videoSystemModel.assignDirector(person4, production2);
        this.#videoSystemModel.assignActor(person6, production3);
        this.#videoSystemModel.assignActor(person7, production3);
        this.#videoSystemModel.assignDirector(person8, production3);
        this.#videoSystemModel.assignActor(person9, production4);
        this.#videoSystemModel.assignActor(person10, production4);
        this.#videoSystemModel.assignDirector(person11, production4);

        this.#videoSystemModel.addCategory(category2);
        this.#videoSystemModel.assignCategory(category2, production5, production6, production7, production8);
        this.#videoSystemModel.assignActor(person12, production5);
        this.#videoSystemModel.assignActor(person13, production5);
        this.#videoSystemModel.assignDirector(person14, production5);
        this.#videoSystemModel.assignActor(person15, production6);
        this.#videoSystemModel.assignActor(person16, production6);
        this.#videoSystemModel.assignDirector(person17, production6);
        this.#videoSystemModel.assignActor(person18, production7);
        this.#videoSystemModel.assignActor(person19, production7);
        this.#videoSystemModel.assignDirector(person20, production7);
        this.#videoSystemModel.assignActor(person21, production8);
        this.#videoSystemModel.assignActor(person22, production8);
        this.#videoSystemModel.assignDirector(person23, production8);

        this.#videoSystemModel.addCategory(category3);
        this.#videoSystemModel.assignCategory(category3, production9, production10, production11, production12);
        this.#videoSystemModel.assignActor(person24, production9);
        this.#videoSystemModel.assignActor(person25, production9);
        this.#videoSystemModel.assignDirector(person26, production9);
        this.#videoSystemModel.assignActor(person27, production10);
        this.#videoSystemModel.assignActor(person28, production10);
        this.#videoSystemModel.assignDirector(person29, production10);
        this.#videoSystemModel.assignActor(person30, production11);
        this.#videoSystemModel.assignActor(person31, production11);
        this.#videoSystemModel.assignDirector(person32, production11);
        this.#videoSystemModel.assignActor(person33, production12);
        this.#videoSystemModel.assignActor(person34, production12);
        this.#videoSystemModel.assignDirector(person35, production12);

        this.#videoSystemModel.addUser(userAdmin);
    }

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
        this.#loadDefaultObjects();
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