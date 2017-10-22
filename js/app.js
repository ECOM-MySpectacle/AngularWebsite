var app = angular.module('app', ['ngAnimate', 'ngSanitize', 'ngRoute', 'restangular', 'ui.bootstrap']);
app.controller('CarouselDemoCtrl', function ($scope) {
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


app.controller("compteModal", ['$scope','$uibModal','$uibModalStack',function($scope,$uibModal,$uibModalStack){

    $scope.$on('handleBroadcast', function() {
        $scope.openModal('creationCompte.html', creationCompteController);
    });

    $scope.openModal = function(url, controller){
        $uibModalStack.dismissAll('another modal just opened');
        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: url,
            controller : controller,
            controllerAs: '$ctrl',
            resolve: {}
        });
    }
}]);

app.controller("creationCompteController",function($scope,$uibModalInstance){

    $scope.cancelModal = function(){
        $uibModalInstance.dismiss('close');
    };
    $scope.connexion = function(){
        var mail = document.getElementById('email-form').value;
        var pwd = document.getElementById('pwd-form').value;
        console.log('mail: '+mail+' - pwd: '+pwd);
        $uibModalInstance.close('save');
    };

});

app.controller("connexionController", function($scope,$uibModalInstance){

    $scope.cancelModal = function(){
        $uibModalInstance.dismiss('close');
    };
    $scope.connexion = function(){
        var mail = document.getElementById('email-form').value;
        var pwd = document.getElementById('pwd-form').value;
        console.log('mail: '+mail+' - pwd: '+pwd);
        $uibModalInstance.close('save');
    };

}   );




app.controller('rechercher', function ($scope, Restangular) {
    $scope.rechercher = function (e) {
        if (e !== 13) return;
        var query = document.getElementById("query").value;

        Restangular.all('students');

        location.href='#!recherche';
    };


});


app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : 'accueil.html'
            })

            .when('/recherche', {
                templateUrl : 'recherche.html'
            })

            .otherwise({
                templateUrl : '404.html'
            })


    });