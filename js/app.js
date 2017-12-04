var app = angular.module('app', ['ngMaterial','ngCart','ngAnimate','ngSanitize','ngRoute','restangular','ui.bootstrap','angularjs-dropdown-multiselect']);

app.service('modalService', function($uibModal,$uibModalStack){
    var modalService = {};
    modalService.openModal = function(url, controller, size, spectacleUrl){
        $uibModalStack.dismissAll('another modal just opened');
        modalService.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: url,
            controller: controller,
            controllerAs: '$ctrl',
            resolve: {
                spectacleUrl: function() {return spectacleUrl;}
            },
            size: size
        });
    };
    return modalService;
});


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

app.controller("connexionController", function($scope,$uibModalInstance,modalService){
    $scope.openModal = function(url, controller) {
        modalService.openModal(url,controller);
    };

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

app.controller("tileController", function($scope,$uibModalInstance,spectacleUrl,ngCart,$mdToast){
    $scope.selectedSpectacleUrl = spectacleUrl;

    $scope.quantite = 1;

    $scope.plusUn = function() {
        $scope.quantite++;
    };

    $scope.moinsUn = function() {
        if ($scope.quantite>0) $scope.quantite--;
    };

    $scope.addItToCart = function() {
        ngCart.addItem($scope.selectedSpectacleUrl, $scope.selectedSpectacleUrl, 7.99, $scope.quantite);
        var toast = $mdToast.simple()
            .action('ANNULER')
            .highlightAction(true)
            .position('top right')
            .parent(document.getElementById('modal-toast'))
            .textContent($scope.quantite+' élément ajouté');
        if ($scope.quantite>1) toast.textContent($scope.quantite+' éléments ajoutés');
        $mdToast.show(toast).then(function(response) {
            if ( response === 'ok' ) {
                ngCart.addItem($scope.selectedSpectacleUrl, $scope.selectedSpectacleUrl, 7.99, -$scope.quantite);
            }
        });
    };

    $scope.cancelModal = function(){
        $uibModalInstance.dismiss('close');
    };
    $scope.connexion = function(){
        $uibModalInstance.close('save');
    };
});


app.controller('recherche', function($scope, $location) {
    $scope.setSearching(true);
    $scope.query = $location.search().search;

    $scope.pageChanged = function() {
        $scope.setPage($scope.page);
    };

    $scope.listeReponse=[
        {name:'Denis Moulisse',country:'Norway', image:'test/spectacle1.jpg', url:'test/spectacle1info.html'},
        {name:'HRB$$$$',country:'Sweden', image:'test/spectacle2.jpg', url:'test/spectacle2info.html'},
        {name:'Partiel d\'ALM',country:'Denmark', image:'test/spectacle3.jpg', url:'test/spectacle3info.html'},
        {name:'Zizule ',country:'Norway', image:'test/spectacle1.jpg', url:'test/spectacle1info.html'},
        {name:'Rotimule',country:'Sweden', image:'test/spectacle2.jpg', url:'test/spectacle2info.html'},
        {name:'Partiel d\'ALM',country:'Denmark', image:'test/spectacle3.jpg', url:'test/spectacle3info.html'},
        {name:'Concert de Zaz',country:'Norway', image:'test/spectacle1.jpg', url:'test/spectacle1info.html'},
        {name:'Soirée Pop-Shot',country:'Sweden', image:'test/spectacle2.jpg', url:'test/spectacle2info.html'},
        {name:'Partiel d\'ALM',country:'Denmark', image:'test/spectacle3.jpg', url:'test/spectacle3info.html'},
        {name:'Concert de Zaz',country:'Norway', image:'test/spectacle1.jpg', url:'test/spectacle1info.html'},
        {name:'Soirée Pop-Shot',country:'Sweden', image:'test/spectacle2.jpg', url:'test/spectacle2info.html'},
        {name:'Partiel d\'ALM',country:'Denmark', image:'test/spectacle3.jpg', url:'test/spectacle3info.html'},
        {name:'Concert de Zaz',country:'Norway', image:'test/spectacle1.jpg', url:'test/spectacle1info.html'},
        {name:'Soirée Pop-Shot',country:'Sweden', image:'test/spectacle2.jpg', url:'test/spectacle2info.html'},
        {name:'Partiel d\'ALM',country:'Denmark', image:'test/spectacle3.jpg', url:'test/spectacle3info.html'},
        {name:'Concert de Zaz',country:'Norway', image:'test/spectacle1.jpg', url:'test/spectacle1info.html'},
        {name:'Soirée Pop-Shot',country:'Sweden', image:'test/spectacle2.jpg', url:'test/spectacle2info.html'},
        {name:'Partiel d\'ALM',country:'Denmark', image:'test/spectacle3.jpg', url:'test/spectacle3info.html'},

        {name:'Concert de Zaz',country:'Norway', image:'test/spectacle1.jpg', url:'test/spectacle1info.html'},
        {name:'Soirée Pop-Shot',country:'Sweden', image:'test/spectacle2.jpg', url:'test/spectacle2info.html'},
        {name:'Partiel d\'ALM',country:'Denmark', image:'test/spectacle3.jpg', url:'test/spectacle3info.html'},
        {name:'Barnave',country:'Norway', image:'test/spectacle2.jpg', url:'test/spectacle2info.html'},
        {name:'Le tumulte d\'un apothicaire',country:'Sweden', image:'test/spectacle3.jpg', url:'test/spectacle3info.html'},
        {name:'Le Cuiseur de Riz',country:'Denmark', image:'test/spectacle1.jpg', url:'test/spectacle1info.html'}];



    /*
        Gestion du date picker
     */
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

    $scope.popup1 = {opened: false};
    $scope.popup2 = {opened: false};

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [{date: tomorrow, status: 'full'}, {date: afterTomorrow, status: 'partially'}];

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
    $scope.$on('$destroy', function() {
        $scope.setSearching(false);
    })
});

app.controller('mainController', ['$scope', '$http', 'ngCart', 'modalService', '$location', function($scope,$uibModal,$uibModalStack,modalService,$location) {
    $scope.query = "";
    $scope.rechercheType = "";
    $scope.page = 1;
    $scope.isSearching = false;

    $scope.currentTitle = "My Spectacle";

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
        smartButtonTextConverter: function(itemText) {
            return itemText;
        }
    };

    $scope.getUrlParams = function() {
        $scope.query = $location.search().search;

    };

    $scope.setRechercheType = function(type) {
        $scope.rechercheType=type;
        $scope.page = 1;
        $scope.query = "";
        $scope.goSearch();
    };

    $scope.setPage = function(n) {
        $scope.page = n;
        $scope.goSearch();
    };

    $scope.setSearching = function(b) {
        $scope.isSearching = Boolean(b);
    };

    $scope.openModal = function(url, controller, size, spectacleUrl) {
        modalService.openModal(url, controller, size, spectacleUrl);
    };

    $scope.rechercher = function (e) {
        if (e !== 13) return;
        $scope.query = document.getElementById("query").value;
        $scope.page = 1;
        $scope.goSearch();
    };

    //recharche la page de recherche
    $scope.goSearch = function() {
        var res = "recherche";
        var tig = "?";
        if ($scope.query !== "") {
            res += (tig + "search=" + $scope.query);
            tig = "&";
        }
        if ($scope.page > 0) {
            res += (tig + "page=" + $scope.page);
            tig = "&";
        }
        if ($scope.rechercheType !== "") {
            res += (tig + "type=" + $scope.rechercheType);
        }

        $location.url(res);
    };

    //a supprimer si possible
    $scope.gotoPage = function(page) {
        $location.url(page);
    };

    $scope.$on('$routeChangeSuccess', function(event, current) {
        $scope.currentTitle = current.title;
    });
}]);


app.controller('panier', function ($scope, ngCart) {
    ngCart.setTaxRate(10);
    $scope.cart=ngCart;

    $scope.plusUn = function(item) {
        ngCart.addItem(item.getId(), item.getName(), item.getPrice(), 1);
    };

    $scope.moinsUn = function(item) {
        ngCart.addItem(item.getId(), item.getName(), item.getPrice(), -1);
    };
});



app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : 'accueil.html',
                title: 'My Spectacle'
            })
            .when('/recherche', {
                templateUrl : 'recherche.html',
                title: 'My Spectacle - Recherche'
            })
            .when('/panier', {
                templateUrl : 'panier.html',
                title: 'My Spectacle - Panier'
            })
            .otherwise({
                templateUrl : '404.html',
                title: 'My Spectacle - 404'
            })
    });