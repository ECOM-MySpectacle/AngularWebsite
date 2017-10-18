angular.module('app', ['ngAnimate', 'ngSanitize', 'ngRoute', 'ui.bootstrap']);
angular.module('app').controller('CarouselDemoCtrl', function ($scope) {
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var currIndex = 0;

    $scope.addSlide = function() {
        slides.push({
            image: 'test/spectacle1.jpg',
            masque: 'img/masque.png',
            id: currIndex++
        });
    };

    for (var i = 0; i < 3; i++) {
        $scope.addSlide();
    }

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
    });