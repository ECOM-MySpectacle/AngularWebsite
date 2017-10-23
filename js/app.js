var app = angular.module('app', ['ngAnimate', 'ngSanitize', 'ngRoute', 'restangular', 'ui.bootstrap', 'angularjs-dropdown-multiselect']);

var query = "";

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


app.controller('recherche', function ($scope, Restangular) {

    if (document.getElementById("well-query")) {console.log(query);
        document.getElementById("well-query").innerHTML = query;
    }

    $scope.regionDropdownModel = [];
    $scope.regionDropdownData = [
        {id: 1, label: "Auvergne-Rhône-Alpes"},
        {id: 2, label: "Bourgogne-Franche-Comté"},
        {id: 3, label: "Bretagne"},
        {id: 4, label: "Centre-Val de Loire"},
        {id: 5, label: "Corse"},
        {id: 6, label: "Grand Est"},
        {id: 7, label: "Hauts-de-France"},
        {id: 8, label: "Île-de-France"},
        {id: 9, label: "Normandie"},
        {id: 10, label: "Nouvelle-Aquitaine"},
        {id: 11, label: "Occitanie"},
        {id: 12, label: "Pays de la Loire"},
        {id: 13, label: "Provence-Alpes-Côte d\'Azur"}
        ];
    $scope.regionDropdownSettings = {
        showCheckAll: false,
        showUncheckAll: false,
        smartButtonMaxItems: 3,
        smartButtonTextConverter: function(itemText, originalItem) {
            return itemText;
        }
    };

    $scope.radioModel = "evenement";

    $scope.rechercher = function (e) {
        if (e !== 13) return;
        query = document.getElementById("query").value;

        if (document.getElementById("well-query")) {console.log(query);
            document.getElementById("well-query").innerHTML = query;
        }

        //Restangular.all('students');

        if (location.href.slice(-10)!=='/recherche')
            location.href = '#!recherche';
    };

    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }

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