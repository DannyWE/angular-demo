var myApp = angular.module('myApp',[])
    .controller('demoController', ['$scope', DemoController]);


function DemoController($scope){

    $scope.dev = 30;
    $scope.ba = 40;
    $scope.qa = 30;

    $scope.$watch("dev", function(newValue, oldValue){
        $scope.qa = 100 - $scope.dev - $scope.ba;
        $scope.render();
    });

    $scope.$watch("ba", function(newValue, oldValue){
        $scope.qa = 100 - $scope.dev - $scope.ba;
        $scope.render();
    });

    $scope.$watch("qa", function(newValue, oldValue){
        $scope.ba = 100 - $scope.dev - $scope.qa;
        $scope.render();
    });

    $scope.render = function() {
        var data = [
            { label: "DEV", value: $scope.dev },
            { label: "BA", value: $scope.ba },
            { label: "QA", value: $scope.qa }
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