angular.module("playSeriesApp").service("seriesService", function($http) {

	this.getSeriesAPI = function(serieName) {
		return $http.get('http://www.omdbapi.com/?s=' + serieName + '&type=series&apikey=93330d3c');
	}

	this.getFullSeriesAPI = function(serieName) {
		return $http.get('https://omdbapi.com/?i=' + serieName.imdbID + '&plot=full&apikey=93330d3c');
	}

});