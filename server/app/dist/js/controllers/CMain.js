'use strict';

(function () {

    'use strict';

    angular.module('app').controller('CMain', function ($state, $scope, $stateParams, $location) {

        var vm = this;
        var id = 123;

        var socket = io.connect(window.location.host);

        // Once we connect get the data;
        socket.on('connect', function () {
            socket.emit('getColors');
        });

        // On a new color add it to view.
        socket.on(id, function (data) {
            vm.data = data.data;
            $scope.$digest();
        });

        // On a new color add it to view.
        socket.on('connections', function (data) {
            vm.connections = data.data;
            $scope.$digest();
        });

        // New vote send it to server.
        vm.click = function (color) {
            socket.emit('vote', { color: color });
        };

        // Clear votes
        vm.clear = function (color) {
            socket.emit('clear');
        };
    });
})();