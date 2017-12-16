app.controller("checkout-controller", function($scope){

    $scope.number = "";
    $scope.setShowSideNav(false);

    $scope.stripeCallback = function (code, result) {
        if (result.error) {
            window.alert('it failed! error: ' + result.error.message);
        } else {
            window.alert('success! token: ' + result.id);
        }
    };

    $scope.$on('$destroy', function() {
        $scope.setShowSideNav(true);
    })
});
