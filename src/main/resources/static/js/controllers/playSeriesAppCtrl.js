angular.module("playSeriesApp").controller("playSeriesAppCtrl", function ($scope, $http, seriesService) {

    $scope.series = [];
    $scope.profile = [];
    $scope.watchlist = [];
    $scope.loggedIn;
    
    // Requests in API IMDB

    $('#registrationModal').on('hidden.bs.modal', function() {
    $(this).find('form').trigger('reset');
    $('#loginModal').find('form').trigger('reset');

    });
  
    $('#loginModal').on('hidden.bs.modal', function() {
    $(this).find('form').trigger('reset');
    $('#registrationModal').find('form').trigger('reset');

    });
    
    $scope.getSeries = function (nomeSerie) {
      seriesService.getSeriesAPI(nomeSerie).then(function (response) {
        if (response.data.Response == "True") {
          $scope.series = response.data.Search;
        } else {
          alert("Busca sem sucesso: Série não encontrada!");
        };
      }, function error(error) {
          console.log(error);
      });
    };

    $scope.addSerieToProfile = function (serie) {
      if (!$scope.IsloggedIn()) {
        alert("Você precisa estar conectado para adicionar séries ao seu perfil!");
      } else {
        $scope.auxAddSerieToProfile(serie);
      }
    };

    $scope.auxAddSerieToProfile = function (serie) {
      if ($scope.containsSerie(serie, $scope.profile)) {
          alert('"' + serie.Title + '" já está em seu Perfil!');
      }
      else {
        //compressedSerie
        var promise = seriesService.getFullSeriesAPI(serie).then(function (response) {
//      var compressedSerie = $scope.serieFilter(response.data);
          $scope.profile.push(serie);
          $scope.saveToProfile(serie);
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

    $scope.addSerieToWatchlist = function (serie) {
      if (!$scope.IsloggedIn()) {
        alert("Você precisa estar conectado para adicionar séries à sua watchlist!");
      }
      else {
        $scope.auxAddSerieToWatchlist(serie);
      }
    }

    $scope.auxAddSerieToWatchlist = function (serie) {
      if ($scope.containsSerie(serie, $scope.profile)) {
        alert('"' + compressedSerie.Title + '" já está em seu Perfil, portanto, não pode ser adicionado em sua Watchlist!');
      } else {
        if (!$scope.containsSerie(serie, $scope.watchlist)) {
          $scope.watchlist.push(serie);
          $scope.saveToWatchlist(serie);
          alert('A série "' + serie.Title + '" foi adicionada à sua Watchlist.');
        } else {
          alert('"' + serie.Title + '" já está em sua Watchlist!')
        };
      };
    }

    $scope.removeProfileSerie = function (serie) {
      if (confirm('Você está preste a remover "'+ serie.Title +'" do Perfil. Prosseguir?') === true) {  
       $scope.removeSerie(serie, $scope.profile);
       $scope.deleteProfileSerie(serie);
      }
    };

    $scope.removeWatchlistSerie = function (serie) {
      if (confirm('Você está preste a remover "'+ serie.Title +'" da Watchlist. Continuar?') === true) {
        $scope.removeSerie(serie, $scope.watchlist);
        $scope.deleteWatchlistSerie(serie);
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
      if ($scope.loggedIn.profile != undefined) {
        $scope.profile = angular.copy($scope.loggedIn.profile);
      }
      if ($scope.loggedIn.watchlist != undefined) {
        $scope.watchlist = angular.copy($scope.loggedIn.watchlist);
      }
    }
    
    // Generates a serie object that has only the attributes needed for our use.
    $scope.serieFilter = function (serie) {
      var serieObject = {
    	poster: serie.Poster,	  
        imdbRating: serie.imdbRating,
        title: serie.Title,
        rated: serie.Rated,
        imdbID: serie.imdbID,
        plot: serie.plot,
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
            if (response.data.name == null) {
              alert("Você deve estar logado para entrar. Reveja seu email e senha.");
            } else {
              $scope.loggedIn = response.data;
              $scope.fillTheArraysWithSeries();
              alert("Bem vindo(a), " + response.data.name + "!");
            }
          }, function errorCallback(response) {
             console.log("Falha ao autenticar...");
          });
    };
    
    $scope.registerClient = function (idName, idLogin, idPassword) {
      $http({
          method: 'POST',
          url: 'http://localhost:8080/clients',
          data: { name : idName, email : idLogin , password : idPassword} 
        }).then(function successCallback(response) {
          $scope.authenticateClient(idLogin, idPassword);
          alert("Cliente registrado com sucesso!");
          }, function errorCallback(response) {
           console.log("Falha ao cadastrar cliente...");
          });
    };
    
    $scope.saveToProfile = function(serie) {
      $http({
            method: 'POST',
            url: 'http://localhost:8080/client/profile/' + $scope.loggedIn.id,
            data: serie
          }).then(function successCallback(response) {
            }, function errorCallback(response) {
             console.log("Falha ao salvar série no pefil...");
            });
    }
    
    $scope.saveToWatchlist = function(serie) {
      $http({
          method: 'POST',
          url: 'http://localhost:8080/client/watchlist/' + $scope.loggedIn.id,
          data: serie
        }).then(function successCallback(response) {
          }, function errorCallback(response) {
           console.log("Falha ao salvar série na watchlist...");
          });

    }
  
    $scope.deleteProfileSerie = function(serie) {
      $http({
          method: 'DELETE',
          url: 'http://localhost:8080/client/removeFromProfile/' 
            + $scope.loggedIn.id + "/" + serie.imdbID,
        }).then(function successCallback(response) {
          }, function errorCallback(response) {
           console.log("Falha ao remover série do pefil...");
          });

    }
    
    $scope.deleteWatchlistSerie = function(serie) {
      $http({
          method: 'DELETE',
          url: 'http://localhost:8080/client/removeFromWatchlist/' 
            + $scope.loggedIn.id + "/" + serie.imdbID,
        }).then(function successCallback(response) {
          }, function errorCallback(response) {
           console.log("Falha ao remover série da watchlist...");
          });
    }
    
    // Other methods
    
    $scope.IsloggedIn = function() {
      return $scope.loggedIn != null;
    }
    
    $scope.signOut = function() {
      $scope.loggedIn = null;
      $scope.profile = [];
      $scope.watchlist = [];
  }

});