    var myApp = angular.module('myApp',[])
        .controller('demoController', ['$scope', DemoController])
        .directive('navigation', function() {
            return {
                restrict: 'E',
                templateUrl: 'div-template.html',
                link: function(scope, element, attrs) {
                    scope.data = angular.fromJson(attrs.links);
                }
            };
    });


function DemoController($scope){

    $scope.links = [
        'For Sale', 'For lease', 'Sold / Leased', 'Find an Agent', 'Blog'
    ];

    $scope.dev = {
        label: "DEV",
        value: 30
    };
    $scope.ba = {
        label: "BA",
        value: 40
    };
    $scope.qa = {
        label: "QA",
        value: 30
    };

    $scope.$watch("dev.value", function(newValue, oldValue){
        $scope.qa.value = 100 - $scope.dev.value - $scope.ba.value;
        $scope.render();
    });

    $scope.$watch("ba.value", function(newValue, oldValue){
        $scope.qa.value = 100 - $scope.dev.value - $scope.ba.value;
        $scope.render();
    });

    $scope.$watch("qa.value", function(newValue, oldValue){
        $scope.ba.value = 100 - $scope.dev.value - $scope.qa.value;
        $scope.render();
    });

    $scope.render = function() {
        var data = [
            $scope.dev, $scope.ba, $scope.qa
        ];

        nv.addGraph(function() {
            var chart = nv.models.pieChart()
                .x(function(d) { return d.label })
                .y(function(d) { return d.value })
                .showLabels(true);

            d3.select("#chart svg")
                .datum(data)
                .transition().duration(1300)
                .call(chart);

            return chart;
        });
    };


}