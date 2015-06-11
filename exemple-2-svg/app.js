'use strict';

// Chargement de données villes
d3.json("json/villes.json", processData);

function processData(data) {

	// Ajout d'autant de ligne <g class="ville"></g> qu'il y a de villes dans les données
	d3.select("body").select("svg")
		.selectAll("g.ville")
		.data(data)
		.enter()
			.append("g")
				.classed("ville", true);

	

	// Calcul du mininum et du maximum des valeurs du champ "population" des données
	var minPopulation = d3.min(data, function(v) { return v.population;});
	var maxPopulation = d3.max(data, function(v) { return v.population;});

	// Fonction de remise à l'échelle des valeurs du champ "population" des données
	var rScale = d3.scale.linear().domain([minPopulation, maxPopulation]).range([30, 60]);

	var chaqueVille = d3.selectAll("g.ville");

	// Un cercle pour chaque ville
	// dont le rayon est proportionnelle à la population
	chaqueVille.append("circle")
				.attr("r", function(d){return rScale(d.population);})
				.attr("cx", function(d,i) {return 50 + i*100})
				.attr("cy", 0)
				.style("fill", "red");

	// Le nom de chaque ville
	chaqueVille.append("text")
			.attr("x", function(d,i) {return 50 + i*100})
			.style("text-anchor", "middle")
			.attr("y", 275)
			.text(function(d){return d.nom;});

	// Animation de chaque cercle
	d3.selectAll("g.ville circle")
		.transition()
			.duration(2000)
				.ease("elastic")
				.attr("cy", 200).delay(function(d,i){return 1000 + i*500});

	var toutesLesClesSaufLeNom = d3.keys(data[0]).filter(function(d){
		return d != "nom";
	});

	d3.select("body")
		.select("button")
		.data(toutesLesClesSaufLeNom)
		.enter()
			.append("button")
			.text(function(d){return d;})
			.on("click", function(d) { 

				var max = d3.max(data, function(l){return l[d];});
				var min = d3.min(data, function(l){return l[d];});

				var rScale = d3.scale.linear().domain([min, max]).range([30, 60]);

				d3.selectAll("g.ville circle").attr("r", function(l){
					return rScale(l[d]);
				});
			});

	d3.selectAll("g.ville circle").on("mouseover", function(d){
		d3.select(this).style("fill", "blue");
	});

	d3.selectAll("g.ville circle").on("mouseout", function(d){
		d3.select(this).style("fill", "red");
	});

	// Templating
	d3.text("partials/detail.html", function(details) {
    	d3.select("body").append("div").attr("id", "detail").html(details);
	});

	// Mise à jour du template lors du clic sur un cercle
	d3.selectAll("g.ville circle").on("click", function(d){
		d3.selectAll("td.data").data(d3.values(d)).text(function(p){return p;});
	});

}




