var url = "http://teamhortus.herokuapp.com/data";

angular.module('demo', [])
.controller('Hello', function($scope, $http) {
    $http.get('http://rest-service.guides.spring.io/greeting').
        then(function(response) {
            $scope.greeting = response.data;
        });
});

$(document).ready(function () {
    console.log("document loaded");


    $("button").click(function () {
        $.ajax({
            url: "http://teamhortus.herokuapp.com/data", type: "GET", dataType: "jsonp", async: false, success: function (result) {
                $("viewLed1").html(result);
            }
        });
    });

});

$(window).on("load", function () {
    console.log("window loaded");


    let url = 'http://teamhortus.herokuapp.com/data';

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                document.body.className = 'ok';
                console.log(request.responseText);
            } else {
                document.body.className = 'error';
            }
        }
    };
    request.open("GET", url, true);
    request.send(null);

});

