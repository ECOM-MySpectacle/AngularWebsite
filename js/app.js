var app = angular.module('app', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider

        // route for the home page
            .when('/', {
                templateUrl : 'accueil.html'
            })

            // route for the about page
            .when('/recherche', {
                templateUrl : 'recherche.html'
            })
    });