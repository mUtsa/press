angular.module('wordPressApp', [
    'ngRoute',
    'ngResource',
    'picardy.fontawesome',
    'ui.bootstrap',
    'ngCookies',
    'uiGmapgoogle-maps'
])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/home', {
                    templateUrl: 'views/home.html',
                    controller: 'wordPressCtrl'
                })
                .when('/home/:id_press', {
                    templateUrl: 'views/home_id_press.html',
                    controller: 'wordPressDetailCtrl'
                })
                .when('/all_press', {
                    templateUrl: 'views/all_press.html',
                    controller: 'AllPressCtrl'
                })
                .when('/add_article', {
                    templateUrl: 'views/add_article.html',
                    controller: 'addArticleCtrl'
                })
                .when('/edit_article/:id_article', {
                    templateUrl: 'views/edit_article.html',
                    controller: 'editArticle'
                })
                .when('/add_press', {
                    templateUrl: 'views/add_press.html',
                    controller: 'addPressCtrl'
                })
                .when('/edit_press/:id', {
                    templateUrl: 'views/edit_press.html',
                    controller: 'editPressCtrl'
                })
                .when('/login', {
                    templateUrl: 'views/login.html',
                    controller: 'loginCtrl'
                })
                .when('/registration', {
                    templateUrl: 'views/register_form.html',
                    controller: 'regFormCtrl'
                })
                .otherwise({
                    redirectTo: '/home'
                })
            ;
        }])
    .run(function($cookieStore, $rootScope) {
        if($cookieStore.get('username')) {
            $rootScope.signIn = $cookieStore.get('username');
            $rootScope.logout = function() {
                $cookieStore.remove('username');
                $rootScope.signIn = false;
            }
        }
    });

