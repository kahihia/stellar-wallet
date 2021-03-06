angular.module('stellar-wallet.controllers.transactions', [])

    .controller('TransactionsCtrl', function ($scope, $state, $http, $window, $ionicModal, $ionicLoading, Transaction, Balance, Conversions) {
        'use strict';

        //$scope.scanQr = function () {
        //
        //    cordova.plugins.barcodeScanner.scan(
        //        function (result) {
        //
        //            console.log(result);
        //
        //            $state.go('app.send', {
        //                email: result.text
        //            });
        //
        //            if (result.cancelled == 1) {
        //                 $state.go('app.home')
        //            }
        //
        //        },
        //        function (error) {
        //            alert("Scanning failed: " + error);
        //        }
        //    );
        //};

        $scope.refreshData = function () {
            var getBalance = Balance.get();

            getBalance.success(
                function (res) {
                    $window.localStorage.setItem('myCurrency', JSON.stringify(res.data.currency));
                    $scope.balance = Conversions.from_cents(res.data.balance);
                    $scope.currency = res.data.currency;

                    var getTransactions = Transaction.list();

                    getTransactions.success(
                        function (res) {
                            var items = [];

                            for (var i = 0; i < res.data.results.length; i++) {
                                res.data.results[i].id = i;
                                res.data.results[i].amount = Conversions.from_cents(res.data.results[i].amount);
                                items.push(res.data.results[i]);
                            }

                            $scope.items = items;
                            $window.localStorage.setItem('myTransactions', JSON.stringify(items));
                            $scope.nextUrl = res.data.next;
                            $scope.$broadcast('scroll.refreshComplete');
                        }
                    );

                }
            );

            getBalance.catch(function (error) {

            });
        };

        $scope.loadMore = function () {
            if ($scope.nextUrl) {
                $http.get($scope.nextUrl).success(
                    function (res) {

                        for (var i = 0; i < res.data.results.length; i++) {
                            res.data.results[i].id = i;
                            res.data.results[i].amount = Conversions.from_cents(res.data.results[i].amount);
                            $scope.items.push(res.data.results[i]);
                        }

                        $scope.nextUrl = res.data.next;
                    }
                );
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        $scope.$on('$ionicView.afterEnter', function () {
            if ($window.localStorage.myTransactions) {
                $scope.items = JSON.parse($window.localStorage.myTransactions);
            }

            $scope.refreshData();
        });
    });
