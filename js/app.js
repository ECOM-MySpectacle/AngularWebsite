var app = angular.module('app', ['ngMaterial','ngCart','ngAnimate','ngSanitize','ngRoute','restangular','ui.bootstrap','angularjs-dropdown-multiselect','angularPayments']);

app.service('modalService', function($uibModal,$uibModalStack){
    var modalService = {};
    modalService.openModal = function(url, controller, size, spectacle){
        $uibModalStack.dismissAll('another modal just opened');
        modalService.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: url,
            controller: controller,
            controllerAs: '$ctrl',
            resolve: {
                spectacle: function() {return spectacle;}
            },
            size: size
        });
    };
    return modalService;
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

app.controller("tileController", function($scope,$uibModalInstance,spectacle,ngCart,$mdToast, Restangular){
    $scope.selectedSpectacle = spectacle;

    $scope.quantite = 1;
    $scope.selectedTypePlace = 0;

    Restangular.all('spectacles/' + $scope.selectedSpectacle.id +'/artistess').getList().then(function (result) {
        $scope.selectedSpectacle.artiste="";
         for(var i=0; i<result.length; i++) {
             $scope.selectedSpectacle.artiste += (result[i].nom+" ");
         }
    });

    Restangular.all('spectacles/' + $scope.selectedSpectacle.id +'/representations').getList().then(function (result) {
        $scope.selectedSpectacle.representation = [];
        for (var i = 0; i < result.length; i++) {
            $scope.selectedSpectacle.representation.push(result[i]);
        }

        if ($scope.selectedSpectacle.representation.length > 0) {
            $scope.selectedRepresentation = $scope.selectedSpectacle.representation[0].id;
        }
        $scope.checkBornSup();
    });

    $scope.plusUn = function() {
        $scope.quantite++;
        $scope.checkBornSup();
    };

    $scope.checkBornSup = function() {
        var index = -1;
        for(var i = 0, len = $scope.selectedSpectacle.representation.length; i < len; i++) {
            if ($scope.selectedSpectacle.representation[i].id === $scope.selectedRepresentation) {
                index = i;
                break;
            }
        }
        switch($scope.selectedTypePlace) {
            case 0:
                if ($scope.quantite > parseInt($scope.selectedSpectacle.representation[index].nbPlacesFosseLibres))
                    $scope.quantite = parseInt($scope.selectedSpectacle.representation[index].nbPlacesFosseLibres);
                break;

            case 1:
                if ($scope.quantite > parseInt($scope.selectedSpectacle.representation[index].nbPlacesBalconLibres))
                    $scope.quantite = parseInt($scope.selectedSpectacle.representation[index].nbPlacesBalconLibres);
                break;

            default:
                if ($scope.quantite > parseInt($scope.selectedSpectacle.representation[index].nbPlacesOrchestreLibres))
                    $scope.quantite = parseInt($scope.selectedSpectacle.representation[index].nbPlacesOrchestreLibres);
                break;
        }
    };

    $scope.moinsUn = function() {
        if ($scope.quantite>0) $scope.quantite--;
    };

    $scope.addItToCart = function() {
        ngCart.addItem($scope.selectedRepresentation.toString()+"+"+$scope.selectedTypePlace, $scope.selectedSpectacle.name, 7.99, $scope.quantite);
        var toast = $mdToast.simple()
            .action('ANNULER')
            .highlightAction(true)
            .position('top right')
            .parent(document.getElementById('modal-toast'))
            .textContent($scope.quantite+' élément ajouté');
        if ($scope.quantite>1) toast.textContent($scope.quantite+' éléments ajoutés');
        $mdToast.show(toast).then(function(response) {
            if ( response === 'ok' ) {
                ngCart.addItem($scope.selectedRepresentation.toString()+"+"+$scope.selectedTypePlace, $scope.selectedSpectacle.name, 7.99, -$scope.quantite);
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


app.controller("warningController",function($scope,$uibModalInstance,ngCart, spectacle){

    $scope.removeItemById= function(){
        ngCart.removeItemById(spectacle);
        $scope.cancelModal();

    };

    $scope.cancelModal = function(){
        $uibModalInstance.dismiss('close');
    };
});

app.controller('recherche', function($scope, $location, Restangular) {
    $scope.setSearching(true);

    $scope.query = $location.search().search;
    $scope.page = $location.search().page;

    if (typeof $location.search().type !== "undefined")
        $scope.setType($location.search().type.split(' '));

    if (typeof $location.search().region !== "undefined")
        $scope.setRegion($location.search().region.split(' '));

    $scope.perPage = 12;
    $scope.nbPages = $scope.page;

    // construit le ventre de la requete
    var postBody = {};
    if (typeof $scope.page === "undefined") {
        postBody.page = 1;
    } else {
        postBody.page = parseInt($scope.page);
    }
    if (typeof $scope.perPage === "undefined") {
        postBody.per_page = 1;
    } else {
        postBody.per_page = $scope.perPage;
    }
    var filter = {};
    if (typeof $scope.query !== "undefined") {
        filter.name = $scope.query;
    }
    if ($scope.getRegion().length > 0) {
        filter.region = [];
        for (var i = 0; i < $scope.getRegion().length; i++) {
            filter.region.push($scope.getRegion()[i].label);
        }
    }
    if ($scope.getType().length > 0) {
        filter.genre = [];
        for (i = 0; i < $scope.getType().length; i++) {
            filter.genre.push($scope.getType()[i].label);
        }
    }

    postBody.filters = filter;

    $scope.listeReponse = [];
    $scope.listeArtiste = [];

    $scope.rechercheEnded = false;
    Restangular.all('recherche/spectacles').post(postBody).then(function(result) {
        if (typeof result.error !== "undefined") {
            console.log('Error: '+result.error);
            $scope.rechercheEnded = true;
            return;
        }
        $scope.nbPages = result.pages;

        for (var i=0; i<result.entities.length; i++) {
            $scope.curItem = {};
            if (typeof result.entities[i].nom !== "undefined") $scope.curItem.name = result.entities[i].nom;
            if (typeof result.entities[i].id !== "undefined") $scope.curItem.id = result.entities[i].id;
            if (typeof result.entities[i].description !== "undefined") $scope.curItem.description = result.entities[i].description;
            if (typeof result.entities[i].genre !== "undefined") $scope.curItem.genre = result.entities[i].genre;
            if (typeof result.entities[i].theme !== "undefined") $scope.curItem.theme = result.entities[i].theme;

            $scope.listeReponse.push($scope.curItem);
        }

        $scope.rechercheEnded = true;
    }, function() {
        console.log("There was an error in the POST request:"+postBody);
    });

    $scope.pageChanged = function() {
        $scope.setPage($scope.page);
    };
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
    $scope.currentTitle = "My Spectacle";

    $scope.query = "";
    $scope.rechercheRegion = [];
    $scope.rechercheType = [];
    $scope.page = 1;
    $scope.isSearching = false;
    $scope.showSideNav = true;

    $scope.setShowSideNav = function(b) {
        $scope.showSideNav = b;
    };

    /* fonctions du DropDown Multi-select de REGIONS*/
    $scope.regionDropdownModel = [];
    $scope.regionDropdownChanged = {
        onSelectionChanged: function() {
            $scope.rechercheRegion = [];
            for (var i=0; i<$scope.regionDropdownModel.length; i++) {
                $scope.rechercheRegion.push($scope.regionDropdownModel[i].id);
            }
            $scope.goSearch();
        }
    };
    $scope.getRegion = function() {
        return $scope.regionDropdownModel;
    };
    $scope.setRegion = function(a) {
        $scope.regionDropdownModel = [];
        $scope.rechercheRegion = [];
        for(var i=0; i<a.length; i++) {
            $scope.regionDropdownModel.push($scope.regionDropdownData[parseInt(a[i])-1]);
            $scope.rechercheRegion.push(parseInt(a[i]));
        }
    };

    /* fonctions du DropDown Multi-select de TYPES*/
    $scope.typeDropdownModel = [];
    $scope.typeDropdownChanged = {
        onSelectionChanged: function() {
            $scope.rechercheType = [];
            for (var i=0; i<$scope.typeDropdownModel.length; i++) {
                $scope.rechercheType.push($scope.typeDropdownModel[i].id);
            }
            $scope.goSearch();
        }
    };
    $scope.getType = function() {
        return $scope.typeDropdownModel;
    };
    $scope.setType = function(a) {
        $scope.typeDropdownModel = [];
        $scope.rechercheType = [];
        for(var i=0; i<a.length; i++) {
            $scope.typeDropdownModel.push($scope.typeDropdownData[parseInt(a[i])-1]);
            $scope.rechercheType.push(parseInt(a[i]));
        }
    };

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

    $scope.typeDropdownData = [
        {id: 1, label: "Concerts"},
        {id: 2, label: "Théâtre & Humour"},
        {id: 3, label: "Sports"},
        {id: 4, label: "Spectacle, cabarets, cirques"},
        {id: 5, label: "Musées, expos, monuments"},
        {id: 6, label: "Parcs, salons, ciné"},
        {id: 7, label: "Festivals"},
        {id: 8, label: "Classique, opéra, danse"},
        {id: 9, label: "Spectacles pour enfants"},
        {id: 10, label: "Activités de Loisirs"}
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

    $scope.setRechercheType = function(id) {
        $scope.typeDropdownModel = [$scope.typeDropdownData[id-1]];
        $scope.rechercheType=[id];
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

    $scope.openModal = function(url, controller, size, spectacle) {
        modalService.openModal(url, controller, size, spectacle);
    };

    $scope.rechercher = function (e) {
        if (e !== 13) return;
        $scope.query = document.getElementById("query").value;
        $scope.page = 1;
        if ($scope.isSearching === false) {
            $scope.setType([]);
            $scope.setRegion([]);
        }
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
        if ($scope.rechercheType.length > 0) {
            res += (tig + "type=" + $scope.rechercheType[0]);
            for (var i=1; i<$scope.rechercheType.length; i++) {
                res += ("+"+ $scope.rechercheType[i]);
            }
        }
        if ($scope.rechercheRegion.length > 0) {
            res += (tig + "region=" + $scope.rechercheRegion[0]);
            for (i=1; i<$scope.rechercheRegion.length; i++) {
                res += ("+"+ $scope.rechercheRegion[i]);
            }
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


app.controller('panier', function ($scope, ngCart, modalService) {
    ngCart.setTaxRate(10);
    $scope.cart=ngCart;

    $scope.plusUn = function(item) {
        ngCart.addItem(item.getId(), item.getName(), item.getPrice(), 1, item.getData());
    };

    $scope.moinsUn = function(item) {
        if (item.getQuantity() > 1)
            ngCart.addItem(item.getId(), item.getName(), item.getPrice(), -1, item.getData());
    };
    $scope.warningBillet = function (item) {
        modalService.openModal('warningModal.html','warningController','md', item.getId() );

    }
});

app.config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://ec2-35-177-143-19.eu-west-2.compute.amazonaws.com:8080/MyApplication/api');
});

app.config(function(RestangularProvider) {
    // add a response intereceptor
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
        var extractedData;

        if (operation === "getList") {
            extractedData = data;
        } else {
            extractedData = data;
        }
        return extractedData;
    });
});

app.config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
        if (typeof date === "undefined") return "Entrez une date";
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + '/' + (monthIndex + 1) + '/' + year;
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
        .when('/checkout', {
            templateUrl : 'checkout.html',
            title: 'My Spectacle - checkout'
        })
        .otherwise({
            templateUrl : '404.html',
            title: 'My Spectacle - 404'
        })
});