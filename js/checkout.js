app.controller("checkout-controller", function($scope, ngCart, Restangular){

    $scope.cart = ngCart;
    $scope.mail = "";
    $scope.nom = "";
    $scope.number = "";
    $scope.expiry = "";
    $scope.cvc = "";
    $scope.setShowSideNav(false);

    $scope.stripeCallback = function (code, result) {
        if (result.error) {
            window.alert('it failed! error: ' + result.error.message);
        } else {
            // construit le ventre de la requete
            var postBody = {};
            if (typeof $scope.mail === "undefined") {
                return;
            } else {
                postBody.mail = $scope.mail;
            }
            if (typeof $scope.nom === "undefined") {
                return;
            } else {
                postBody.nom = $scope.nom;
            }
            if (typeof result.id === "undefined") {
                return;
            } else {
                postBody.token = result.id;
            }
            var typePlace = ["fosse","balcon","orchestre"];

            var items = $scope.cart.getItems();
            if (items.length > 0) {
                postBody.spectacles = [];
                for (var i = 0; i < items.length; i++) {
                    var item = {};
                    item.id = parseInt(items[i].getId().split('+')[0]);
                    item.quantite = items[i].getQuantity();
                    item.position = typePlace[items[i].getId().split('+')[1]];
                    postBody.spectacles.push(item);
                }
            }

            Restangular.all('booking').post(postBody).then(function(result) {
                if (typeof result.error !== "undefined") {
                    console.log('Error: '+result.error);
                    return;
                }
                console.log(result);
            }, function() {
                console.log("There was an error in the POST request:"+postBody);
            });
        }
    };

    $scope.$on('$destroy', function() {
        $scope.setShowSideNav(true);
    })
});
