angular.module('wordPressApp')

    .controller('NavBarCtrl', function($scope, $http, $location, navBarServ) {
        navBarServ.async().then(function(data) {
            $scope.press = data;
            //console.log(data.articles[3].id);
        }, function(error) {
            alert("404 Not found");
        });
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    })

    .controller('wordPressCtrl', function($scope, $http, $route, $location, $routeParams, $log, pressListServ) {
        pressListServ.async().then(function(data) {
            $scope.all = data;
            $scope.totalItems = $scope.all.articles.length;
            //console.log(data.articles[3].id);
        }, function(error) {
            alert("404 Not found");
        });

        $http.get('http://localhost/codeigniter/index.php/api/example/all/3/1').success(function(data) {
            $scope.all = data;
            //Pagination

            $scope.currentPage = 1;

            $scope.setPage = function (pageNo) {
                $scope.currentPage = pageNo;
            };

            $scope.pageChanged = function() {
                $http.get('http://localhost/codeigniter/index.php/api/example/all/3/'+ $scope.currentPage +'/' ).success(function(data) {
                    $scope.all = data;
                    $log.log('Page changed to: ' + $scope.currentPage);
                })
            };

            $scope.maxSize = 5;
            $scope.bigTotalItems = 175;
            $scope.bigCurrentPage = 1;
        });
        $scope.delete = function(id) {
            $http.delete("http://localhost/codeigniter/index.php/api/example/del/" + id).success(function (result) {
                $route.reload();
            }).error(function () {
                console.log("error");
            });
        };
        $scope.go = function ( path ) {
            $location.path( path );
        };
    })

    .controller('editArticle', function($scope, $routeParams, $http, $filter) {
        $http.get('http://localhost/codeigniter/index.php/api/example/viewpresstitle').success(function(data) {
            $scope.press = data;
            $http.get('http://localhost/codeigniter/index.php/api/example/getidarticle/' + $routeParams.id_article).success(function(data) {
                $scope.all = data;
            });
        });
        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();
        $scope.clear = function () {
            $scope.dt = null;
        };
        // Disable weekend selection
        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };
        $scope.formats = ['YYYY-MM-dd'];
        $scope.status = {
            isopen: false
        };
        $scope.all = {};
        $scope.submitData = function(all) {
            $scope.all.articles['0']['data'] = $filter('date')($scope.all.articles['0']['data'], 'yyyy-MM-dd');
            $http.post("http://localhost/codeigniter/index.php/api/example/edit/" + $routeParams.id_article, all)
                .success(function (data, status, headers, config)
                {
                    $scope.success = 'Success! Editted in database';
                })
                .error(function (data, status, headers, config)
                {
                    $scope.error = 'Warning! Something wrong';
                });
        };
    })

    .controller('wordPressDetailCtrl', function($scope, $http, $routeParams, $location, $log) {
        $http.get('http://localhost/codeigniter/index.php/api/example/viewpagin/3/1/'+ $routeParams.id_press).success(function(data) {
            $scope.all = data;
            $scope.totalItems = $scope.all.articles.length;
            $scope.currentPage = 1;

            $scope.setPage = function (pageNo) {
                $scope.currentPage = pageNo;
            };

            $scope.pageChanged = function() {
                $http.get('http://localhost/codeigniter/index.php/api/example/viewpagin/3/'+ $scope.currentPage +'/' + $routeParams.id_press)
                    .success(function(data) {
                        $scope.all = data;
                    });
                $log.log('Page changed to: ' + $scope.currentPage);
            };

            $scope.maxSize = 5;
            $scope.bigTotalItems = 175;
            $scope.bigCurrentPage = 1;
        });
    })

    .controller('AllPressCtrl', function($scope, $http, $route, $routeParams, $location) {
        $http.get('http://localhost/codeigniter/index.php/api/example/viewPressTitle').success(function(data) {
            $scope.all = data;
        });
        $scope.delete = function(id) {
            $http.delete("http://localhost/codeigniter/index.php/api/example/delpress/" + id).success(function (result) {
                $route.reload();
            }).error(function () {
                console.log("error");
            });
        };
        $scope.go = function ( path ) {
            $location.path( path );
        };

        /////////////////////////////////////////////////map

        $http.get('http://localhost/codeigniter/index.php/api/example/press_office_all').success(function(data) {
            $scope.cities = data;

            var array = [];
                for(i=0; i < data.length; i++) {

                    array.push({
                        id: data[i].id, 
                        coords: {latitude: data[i].lat, longitude: data[i].long}, 
                        title: data[i].desc
                    });
                };

        $scope.map = {center: { latitude: 45, longitude: -73 }, zoom: 6};
        $scope.markerList = array;
        })
        .error(function(data) {
            console.log('errrrrrrrrrror');
        });
    })

    .controller('addArticleCtrl', function($scope, $http, $log, $filter) {
        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();
        $scope.clear = function () {
            $scope.dt = null;
        };
        // Disable weekend selection
        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };
        $scope.formats = ['YYYY-MM-dd'];
        $scope.status = {
            isopen: false
        };
        $scope.data = {};
        $scope.submitData = function(data, resultVarName) {
            data.data = $filter('date')(data.data, 'yyyy-MM-dd');
            $http.post("http://localhost/codeigniter/index.php/api/example/add", data)
                .success(function (data, status, headers, config)
                {
                    $scope[resultVarName] = data;
                    $scope.success = 'Success! Added a new entry in database';
                })
                .error(function (data, status, headers, config)
                {
                    $scope[resultVarName] = "SUBMIT ERROR";
                    $scope.error = 'Warning! Something wrong';
                });
        };
    })
    .controller('addPressCtrl', function($scope, $http) {
        $http.get('http://localhost/codeigniter/index.php/api/example/press_id').success(function(data) {
            $scope.press = data;
            $scope.addMarker = function() {
                newMarker.push({
                    id: ++$scope.press[0].id,
                    key: ++key,
                    coordsObj: {latitude: 40.1451, longitude: -99.6680},
                    title: $scope.data.title,
                    desc: $scope.data.desc,
                    options: { draggable: true },
                    events: {
                        dragend: function (marker, eventName, args) {
                            console.log('marker dragend');
                            var k = marker.key;
                            var lat = marker.getPosition().lat();
                            var lon = marker.getPosition().lng();
                            console.log(lat);
                            console.log(lon);
                            newMarker[k-1].coordsObj.latitude = lat;
                            newMarker[k-1].coordsObj.longitude = lon;
                        }
                    }
                });
            };
        });
        var newMarker = [];
        $scope.addPressMarker = newMarker;
        var key = 0;
        $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 };
        $scope.options = {scrollwheel: true};
        $scope.markerList = newMarker;

        $scope.submitData = function() {
            //console.log(data);
            $http.post("http://localhost/codeigniter/index.php/api/example/addpress", $scope.addPressMarker)
                .success(function (data, status, headers, config)
                {
                    $scope.success = 'Success! Added a new entry in database';
                })
                .error(function (data, status, headers, config)
                {
                    $scope.error = 'Warning! Something wrong';
                });
        };
    })

    .controller('editPressCtrl', function($scope, $http, $routeParams, $timeout, $log) {
    
    var coordsObj = [];
        $scope.editData = coordsObj;
        $http.get("http://localhost/codeigniter/index.php/api/example/press_office/" + $routeParams.id).success(function(data) {
            $scope.data = data;
            for(i=0; i < data.length; i++) {
                
                coordsObj.push({
                    id: data[i].id,
                    key: i,
                    coordsObj: {latitude: data[i].lat, longitude: data[i].long},
                    title: data[i].title,
                    options: { draggable: true },
                    events: {
                        dragend: function (marker, eventName, args) {
                            console.log('marker dragend');
                            var k = marker.key;
                            var lat = marker.getPosition().lat();
                            var lon = marker.getPosition().lng();

                            console.log(lat);
                            console.log(lon);

                            coordsObj[k].coordsObj.latitude = lat;
                            coordsObj[k].coordsObj.longitude = lon;
                        }
                    }
                });
            }
            $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 };
            $scope.options = {scrollwheel: true};
            $scope.coordsUpdates = 0;
            $scope.dynamicMoveCtr = 0;
            $scope.markerList = coordsObj;
            $scope.$watchCollection("marker.coords", function (newVal, oldVal) {
                if (_.isEqual(newVal, oldVal))
                    return;
                $scope.coordsUpdates++;
            });
                $timeout(function () {
                    $scope.markerList = coordsObj;
                    $scope.dynamicMoveCtr++;
                }, 6000);

            });        

        $scope.submitData = function() {
            $http.post("http://localhost/codeigniter/index.php/api/example/edit_press/" + $routeParams.id, $scope.editData)
            .success(function (data)
            {
                $scope.success = 'Success! Edited in database';
            })
            .error(function (data, status, headers, config)
            {
                $scope.error = 'Warning! Something wrong';
            });
        };   
    })

//////////////////////////////////////////////////////End of Edit Press///////////////////////////////////////////////////////////////////
    
    .controller('loginCtrl', function($scope, $http, $route, $cookieStore, $rootScope, $location) {
        $scope.submitData = function(data) {
           $http.post("http://localhost/codeigniter/index.php/api/example/check_login", data)
               .success(function (data) {
                   if(data) {
                       $rootScope.signIn = data.title[0].firstname;
                       $scope.success = "Hello " + data.title[0].firstname + '!';
                       $cookieStore.put('username', data.title[0].firstname);
                       $location.path( '#/home' );
                   }
               })
               .error(function() {
                   $scope.error = 'Warning! Something wrong';
               });
        };
    })
    .controller('regFormCtrl', function($scope, $http) {
       $scope.submitData = function(data) {
           $http.post("http://localhost/codeigniter/index.php/api/example/register_user", data)
               .success(function(data) {
                   console.log('New user added!');
               })
               .error(function(data) {
                   console.log('error!!!');
               })
       }
    });




