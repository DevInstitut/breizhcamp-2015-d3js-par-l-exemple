'use strict';

// Génération d'autant de <div class="line"></div>
// qu'il y a de données dans le tableau "villes"
d3.select("body")
	.append('div')
		.attr("class", "chart")
	.selectAll("div.line")
	.data(villes)
		.enter()
		.append("div")
			.attr("class","line");



// Collection des <div class="line"></div> générées
var divLine = d3.selectAll("div.line");

// Pour chaque <div class="line"></div>
// ajout de <div class="label">[NOM]</div>
divLine.append("div")
		.attr("class","label")
		.text(function(d){return d.nom});

// Calcul du rapport permettant de mettre à l'échelle
// les chiffres liés à la population d'une ville
var MAX_POPULATION = 2125851;
var MAX_LARGEUR_PX = 700;
var RAPPORT_ECHELLE = MAX_LARGEUR_PX / MAX_POPULATION;

// Pour chaque <div class="line"></div>
// ajout de <div class="bar" style="width: 700px">[POPULATION]</div>
divLine.append("div")
		.attr("class", "bar")
		.style("width", function(d) {return d.population*RAPPORT_ECHELLE + "px"})
		.text(function(d) {
			return d.population;
		});
	