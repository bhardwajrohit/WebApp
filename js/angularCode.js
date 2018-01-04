var app = angular.module('mainApp', ['ngMaterial']);

app.controller('recipesList', function ($scope, $http, $mdToast, $document) {
    $scope.configuration = {};

    //Activate Recipe
    $scope.setActive = function () {
        if (!($scope.configurations == null)) {
            $http({
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: $.param($scope.configurations),
                url: "https://teamhortus.herokuapp.com/data"
            }).then(function mySuccess(response) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent($scope.configurations.name + ' Recipe Activated!')
                        .position('bottom right')
                        .hideDelay(3000)
                );
                window.location.reload();
            }, function myError(response) {
                console.log('Error at ' + response.statusText);
            });
        } else {
            $mdToast.show(
                $mdToast.simple({toastClass: 'error'})
                    .textContent('Select A Recipe to Activate!')
                    .position('bottom right')
                    .hideDelay(3000)
            );
        }
    }

    //Add New Recipe 
    $scope.addRecipe = function () {
        if (!($scope.config == null)) {
            $http({
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: $.param($scope.config),
                url: "https://teamhortus.herokuapp.com/recipes/add"
            }).then(function mySuccess(response) {
                window.location.reload();
                console.log(response.status + "Saved.");
            }, function myError(response) {
                console.log('Error at ' + response.statusText);
            });
        } else {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Enter Recipe Information to Add!')
                    .position('bottom right')
                    .hideDelay(3000)
            );
        }
    }

    //update Recipe 
    $scope.updateRecipe = function () {
        if (!($scope.configurations == null) && $scope.configurations && $scope.configurations.name) {
            $http({
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: $.param($scope.configurations),
                url: "https://teamhortus.herokuapp.com/recipes/update"
            }).then(function mySuccess(response) {

                $mdToast.show(
                    $mdToast.simple()
                        .textContent($scope.configurations.name + ' Recipe Updated!')
                        .position('bottom right')
                        .hideDelay(3000)
                );
                window.location.reload();
            }, function myError(response) {
                console.log('Error at ' + response.statusText);
            });
        } else {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Select A Recipe to Update!')
                    .position('bottom right')
                    .hideDelay(3000)
            );
        }
    }

    //delete Recipe
    $scope.deleteRecipe = function () {
        if (!($scope.configurations == null) && $scope.configurations && $scope.configurations.name) {
            $http({
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: $.param($scope.configurations),
                url: "https://teamhortus.herokuapp.com/recipes/delete"
            }).then(function mySuccess(response) {
                console.log(response.status + "Deleted.");
                window.location.reload();
            }, function myError(response) {
                console.log('Error at ' + response.statusText);
            });
        } else {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Select A Recipe to Delete!')
                    .position('bottom right')
                    .hideDelay(3000)
            );
        }
    }

    //Load default configuration
    $http({
        method: "GET",
        url: "https://teamhortus.herokuapp.com/recipes"
    }).then(function mySuccess(response) {
        if (response.data.lenght > 1)
            $scope.configurations = response.data[0];
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });

    $scope.recipes = [];

    //Load All Recipes
    $http({
        method: "GET",
        url: "https://teamhortus.herokuapp.com/recipes"
    }).then(function mySuccess(response) {
        response.data.forEach(function (recipe) {
            $scope.recipes.push(recipe);
        });
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });

    //load the configurations
    $scope.recipeSelected = function (id, index) {
        $http({
            method: "GET",
            url: "https://teamhortus.herokuapp.com/recipes?id=" + id
        }).then(function mySuccess(response) {
            $scope.configurations = response.data;
            $scope.selected = index;
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    }
});



app.controller('viewActiveRecipe', function ($scope, $http) {
    $scope.configuration = {};

    $http({
        method: "GET",
        url: "https://teamhortus.herokuapp.com/data"
    }).then(function mySuccess(response) {
        $scope.configurations = response.data[0];
    }, function myError(response) {
        console.log('Error at ' + response.statusText);
    });
});





