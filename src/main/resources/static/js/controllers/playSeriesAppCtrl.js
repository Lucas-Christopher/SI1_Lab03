angular.module("playSeriesApp").controller("playSeriesAppCtrl", function ($scope, $http, seriesService) {

    $scope.series = [];
    $scope.profile = [];
    $scope.watchlist = [];
    $scope.loggedIn;
    $scope.registrationStatus = false;
    
    // Requests in API IMDB
    
    $scope.getSeries = function (nomeSerie) {
      seriesService.getSeriesAPI(nomeSerie).then(function (response) {
        if (response.data.Response == "True") {
          $scope.series = response.data.Search;
        } else {
          alert("Busca sem sucesso: Série não encontrada!");
        };
      });
    };

    $scope.addSerieToProfile = function (serie) {
      if (!$scope.IsloggedIn) {
        alert("Você precisa estar conectado para adicionar séries ao seu perfil!");
      } else {
        // The client is already connected...

        //filteredSerie = $scope.serieFilter(serie);

        if ($scope.containsSerie(serie, $scope.profile)) {
          alert('"' + serie.Title + '" já está em seu Perfil!');
        }
        else {
          seriesService.getFullSeriesAPI(serie).then(function (response) {
            //var serieToBeAdded = $scope.serieFilter(response.data);
            $scope.profile.push(response.data);
            $scope.saveToProfile(response.data);
          }).catch(function (error) {
            console.log(error);
          });
  
          if ($scope.containsSerie(serie, $scope.watchlist)) {
            $scope.removeSerie(serie, $scope.watchlist);
            alert('"' + serie.Title + '" que estava em sua Watchlist, agora encontra-se em seu Perfil.')
          } else {
            alert('A série "' + serie.Title + '" foi adicionada ao seu Perfil.')
          }
        }
      }
    };

    $scope.addSerieToWatchlist = function (serie) {
      if (!$scope.IsloggedIn) {
        alert("Você precisa estar conectado para adicionar séries à sua watchlist!");
      }
      else {
        // The client is already conneted...

        //filteredSerie = $scope.serieFilter(serie);

        if ($scope.containsSerie(serie, $scope.watchlist)) {
          alert('"' + serie.Title + '" já está em sua Watchlist!')
        } else if ($scope.containsSerie(serie, $scope.profile)) {
          alert('"' + serie.Title + '" já está em seu Perfil, portanto, não pode ser adicionado em sua Watchlist!');
        } else {
          $scope.watchlist.push(serie);
          alert('A série "' + serie.Title + '" foi adicionada à sua Watchlist.');
          $scope.saveToWatchlist(serie);
        }
      }
    };

    $scope.removeProfileSerie = function (serie) {
      if (confirm('Você está preste a remover "'+ serie.Title +'" do Perfil. Prosseguir?') === true) {  
       $scope.removeSerie(serie, $scope.profile);
      }
    };

    $scope.removeWatchlistSerie = function (serie) {
      if (confirm('Você está preste a remover "'+ serie.Title +'" da Watchlist. Continuar?') === true) {
        $scope.removeSerie(serie, $scope.watchlist);
      }
    };

    $scope.removeSerie = function (serie, list) {
      let index = list.indexOf(serie);
        if (index > -1) {
          list.splice(index, 1);
        }
    };
    
    // Other methods

    $scope.containsSerie = function (serie, lista) {
      for (var i = 0; i < lista.length; i++) {
        if (lista[i].imdbID === serie.imdbID) {
          return true;
        }
      }
      return false;
    };

    $scope.lastEpisode = function (serie, episode) {
      serie.lastSeenEpisode = episode;
      $scope.saveToProfile(serie);
    }
    $scope.personalRating = function (serie, rating) {
      serie.myRating = rating;
      $scope.saveToProfile(serie);
    }
    
    $scope.fillTheArraysWithSeries = function () {
      if ($scope.loggedIn.profile != undefined){
        $scope.profile = angular.copy($scope.loggedIn.profile);
      }
      if ($scope.loggedIn.watchlist != undefined){
        $scope.watchlist = angular.copy($scope.loggedIn.watchlist);
      }
    }
    
    // Generates a serie object that has only the attributes needed for our use.
    $scope.serieFilter = function (serie) {
      var serieObject = {
        imdbRating: serie.imdbRating,
        title: serie.Title,
        rated: serie.Rated,
        poster: serie.Poster,
        imdbID: serie.imdbID
      };
        return serieObject;
    }
    
    // Requests in the API REST
    
    $scope.authenticateClient = function (idLogin, idPassword) {
      $http({
            method: 'POST',
            url: 'http://localhost:8080/clients/authenticate',
            data: { email : idLogin , password : idPassword}  
          }).then(function successCallback(response) {
            if ($scope.registrationStatus === false) {
              alert("You must be logged in to enter!")
            } else {
              if (response.data.nome == null) {
                alert("Invalid email or password.");
              } else{
                $scope.loggedIn = response.data;
                $scope.fillTheArraysWithSeries();
                alert("Welcome, " + response.data.nome + "!");
              }
            }
          }, function errorCallback(response) {
             console.log("Fail...");
          });
    };
    
    $scope.registerClient = function (idName, idLogin, idPassword) {
      $http({
          method: 'POST',
          url: 'http://localhost:8080/clients',
          data: { name : idName, email : idLogin , password : idPassword} 
        }).then(function successCallback(response) {
        //  $scope.authenticateClient(idLogin, idPassword);
          alert("Client registered successfully!");
          }, function errorCallback(response) {
           console.log("Fail...");
          });
      $scope.registrationStatus = true;
    };
    
    $scope.saveToProfile = function(serie) {
      $http({
            method: 'POST',
            url: 'http://localhost:8080/client/profile/' + $scope.loggedIn.id,
            data: serie
          }).then(function successCallback(response) {
            }, function errorCallback(response) {
             console.log("Failed to save serie in profile...");
            });
    }
    
    $scope.saveToWatchlist = function(serie) {
      $http({
          method: 'POST',
          url: 'http://localhost:8080/client/watchlist/' + $scope.loggedIn.id,
          data: serie
        }).then(function successCallback(response) {
          }, function errorCallback(response) {
           console.log("Failed to save serie in watchlist...");
          });

    }
  
    $scope.deleteProfileSerie = function(serie) {
      $http({
          method: 'DELETE',
          url: 'http://localhost:8080/client/removeFromProfile/' 
            + $scope.loggedIn.id + "/" + serie.imdbID,
        }).then(function successCallback(response) {
          }, function errorCallback(response) {
           console.log("Fail to remove profile serie...");
          });

    }
    
    $scope.deleteWatchlistSerie = function(serie) {
      $http({
          method: 'DELETE',
          url: 'http://localhost:8080/client/removeFromWatchlist/' 
            + $scope.loggedIn.id + "/" + serie.imdbID,
        }).then(function successCallback(response) {
          }, function errorCallback(response) {
           console.log("Fail to remove watchlist serie...");
          });

    }
    
    // Other methods
    
    $scope.IsloggedIn = function() {
      return $scope.loggedIn != null;
    };
    
    $scope.signOut = function() {
      $scope.loggedIn = null;
      $scope.profile = [];
      $scope.watchlist = [];
    
  }
    

});