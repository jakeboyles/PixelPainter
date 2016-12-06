'use strict';

(function () {

    'use strict';

    angular.module('app', ['ui.router']).config(appConfig);

    appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function appConfig($stateProvider, $urlRouterProvider, $locationProvider) {

        // ------------------------------------------------------------
        // Angular State Routes
        // ------------------------------------------------------------
        $stateProvider.state('home', {
            url: '/',
            templateUrl: '../partials/home.html',
            controller: 'CMain',
            controllerAs: 'controller'
        });

        $locationProvider.html5Mode(true);
    }
})();