(() => {

    'use strict';

    angular
        .module('app')
        .controller('CMain', function($state, $scope, $stateParams, $location) {

            let vm = this;
            let id = 123;

            const socket = io.connect(window.location.host);

            // Once we connect get the data;
            socket.on('connect', () => {
                socket.emit('getColors');
            });

            // On a new color add it to view.
            socket.on(id, (data) => {
                vm.data = data.data;
                $scope.$digest();
            });

            // On a new color add it to view.
            socket.on('connections', (data) => {
                vm.connections = data.data;
                $scope.$digest();
            });

            // New vote send it to server.
            vm.click = function(color) {
                socket.emit('vote', { color: color });
            }

            // Clear votes
            vm.clear = function(color) {
                socket.emit('clear');
            }
        })

})();
