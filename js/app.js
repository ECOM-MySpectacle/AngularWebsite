angular.module('app', ['ngAnimate', 'ngSanitize', 'ngRoute', 'restangular', 'ui.bootstrap']);
angular.module('app').controller('CarouselDemoCtrl', function ($scope) {
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var currIndex = 0;

    $scope.addSlide = function(i) {
        slides.push({
            image: 'test/spectacle'+i+'.jpg',
            masque: 'img/masque.png',
            info: 'test/spectacle'+i+'info.html',
            id: currIndex++
        });
    };

    for (var i = 1; i <= 3; i++) {
        $scope.addSlide(i);
    }
});


angular.module('app').controller('rechercher', function ($scope, Restangular) {
    $scope.rechercher = function () {
        var query = document.getElementById("query").value;

        Restangular.all('students');

        location.href='#!recherche';
    };


});

angular.module('app')
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : 'accueil.html'
            })

            .when('/recherche', {
                templateUrl : 'recherche.html'
            })

            .when('/billets', {
                templateUrl : 'billets.html'
            })
    });