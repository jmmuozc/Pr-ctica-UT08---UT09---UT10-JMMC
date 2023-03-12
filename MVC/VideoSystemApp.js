"use strict";

import videoSystemController from "./VideoSystemController.js";
import videoSystemView from "./VideoSystemView.js";
import videoSystem from "./VideoSystemModel.js";

let VideoSystemApp;

(function () {
	VideoSystemApp = new videoSystemController(videoSystem.getInstance("VideoSystem"),new videoSystemView());
})();


const historyActions = {
	init: () => {
		VideoSystemApp.handleInit();
	},
	showCategories: (event) => VideoSystemApp.handleCategory(event.state.name),
	showSeries: () => VideoSystemApp.handleSeries(),
	showMovies: () => VideoSystemApp.handleMovies(),
	showActors: () => VideoSystemApp.handleActors(),
	showDirectors: () => VideoSystemApp.handleDirectors(),
	showCategory: (event) => VideoSystemApp.handleCategory(event.state.category),
	showActorCard: (event) => VideoSystemApp.handleActorCard(event.state.picture),
	showDirectorCard: (event) => VideoSystemApp.handleDirectorCard(event.state.picture),
	showProduction: (event) => VideoSystemApp.HandleProduction(event.state.title),
}

window.addEventListener('popstate', function(event) {
  if (event.state){
		historyActions[event.state.action](event);
  }
});

history.replaceState({action: 'init'}, null);

export default VideoSystemApp;