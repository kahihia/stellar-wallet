// Ionic Starter App
angular.module('stellar-wallet', ['ionic',
    'intlpnIonic',
    'ngMessages',
    'stellar-wallet.controllers',
    'stellar-wallet.controllers.accounts',
    'stellar-wallet.controllers.transactions',
    'stellar-wallet.controllers.send',
    'stellar-wallet.controllers.deposit',
    'stellar-wallet.controllers.withdraw',
    'stellar-wallet.controllers.receive',
    'stellar-wallet.controllers.promotions',
    'stellar-wallet.controllers.request',
    'stellar-wallet.controllers.fica',
    'stellar-wallet.controllers.settings',
    'stellar-wallet.controllers.notifications',
    'stellar-wallet.controllers.help',
    'stellar-wallet.controllers.about',
    'stellar-wallet.controllers.currency_accounts',
    'stellar-wallet.services',
    'stellar-wallet.services.accounts',
    'stellar-wallet.services.transactions',
    'stellar-wallet.services.contacts',
    'stellar-wallet.services.settings',
    'stellar-wallet.services.currency_accounts',
    'stellar-wallet.filters.contacts'])

    .constant('API', 'https://api.luuun.com/api/1')
    .constant('REFRESH_INTERVAL', 3000)
    .constant('COMPANY', 'luuun')

    .config(function ($httpProvider, $ionicConfigProvider, $compileProvider) {
        'use strict';
        //Switch off caching:
        $ionicConfigProvider.views.maxCache(0);
        $ionicConfigProvider.tabs.position('bottom');
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|bitcoin):/);
        //Insert JWT token into all api requests:
        $httpProvider.interceptors.push('authInterceptor');
    })

    .run(function ($ionicPlatform, $rootScope, Auth, $state) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
                StatusBar.overlaysWebView(true);
                StatusBar.show();
            }
        });

        $rootScope.logout = function () {
            Auth.logout();
            $state.go('login');
        };
    })

    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $stateProvider

            // Accounts
            .state('login', {
                url: '/login',
                templateUrl: 'templates/accounts/login.html',
                controller: 'LoginCtrl'
            })

            .state('loading', {
                url: '/loading',
                templateUrl: 'templates/elements/loading.html',
                params: {
                    amount: null
                }
            })

            // App
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/elements/menu.html',
                controller: 'AppCtrl'
            })

            // Home
            .state('app.home', {
                url: '/home',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/home/index.html',
                        controller: 'TransactionsCtrl'
                    }
                }
            })

            // Transactions
            .state('app.transactions', {
                url: '/transactions',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/transactions/index.html',
                        controller: 'TransactionsCtrl'
                    }
                }
            })

            // Send
            .state('app.send', {
                url: '/send',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/send/index.html',
                        controller: 'SendCtrl'
                    }
                },
                params: {
                    amount: null,
                    currency: null,
                    note: null
                }
            })

            .state('app.send_to', {
                url: '/send_to',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/send/to.html',
                        controller: 'SendToCtrl'
                    }
                },
                params: {
                    amount: null,
                    currency: null,
                    note: null,
                    to: null
                }
            })

            .state('app.send_confirm', {
                url: '/send_confirm',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/send/confirm.html',
                        controller: 'SendConfirmCtrl'
                    }
                },
                params: {
                    amount: null,
                    currency: null,
                    note: null,
                    to: null
                }
            })

            .state('app.send_success', {
                url: '/send_success',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/send/success.html',
                        controller: 'SendSuccessCtrl'
                    }
                },
                params: {
                    amount: null,
                    note: null,
                    to: null,
                    currency: null
                }
            })

            // Withdraw
            .state('app.withdraw_to', {
                url: '/withdraw_to',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/withdraw/to.html',
                        controller: 'WithdrawToCtrl'
                    }
                },
                params: {
                    accType: null
                }
            })

            .state('app.withdraw_to_bitcoin_account', {
                url: '/withdraw_to_bitcoin_account/:account',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/withdraw/to_bitcoin_account.html',
                        controller: 'WithdrawToCtrl'
                    }
                },
                params: {
                    account: null,
                    accType: null
                }
            })

            .state('app.withdraw_to_bank_account', {
                url: '/withdraw_to_bank_account',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/withdraw/to_bank_account.html',
                        controller: 'WithdrawToCtrl'
                    }
                },
                params: {
                    account: null,
                    accType: null
                }
            })

            .state('app.withdraw_amount', {
                url: '/withdraw_amount',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/withdraw/amount.html',
                        controller: 'WithdrawAmountCtrl'
                    }
                },
                params: {
                    amount: null,
                    account: null
                }
            })

            .state('app.withdraw_confirm', {
                url: '/withdraw_confirm',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/withdraw/confirm.html',
                        controller: 'WithdrawConfirmCtrl'
                    }
                },
                params: {
                    amount: null,
                    account: null
                }
            })

            .state('app.withdraw_success', {
                url: '/withdraw_success',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/withdraw/success.html',
                        controller: 'WithdrawSuccessCtrl'
                    }
                },
                params: {
                    amount: null,
                    account: null
                }
            })

            // Deposit
            .state('app.deposit', {
                url: '/deposit',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/deposit/index.html',
                        controller: 'DepositCtrl'
                    }
                }
            })

            // Receive
            .state('app.receive', {
                url: '/receive',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/receive/index.html',
                        controller: 'ReceiveCtrl'
                    }
                }
            })

            // Accounts
            .state('app.currency_accounts', {
                url: '/currency_accounts',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/currency_accounts/index.html',
                        controller: 'CurrencyAccountsCtrl'
                    }
                }
            })

            // Add Currency Accounts
            .state('app.add_currency', {
                url: '/add_currency',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/currency_accounts/add_currency.html',
                        controller: 'AddCurrencyCtrl'
                    }
                },
                params: {
                    code: null,
                    issuer: null
                }
            })

            // Add Currency Accounts Confirm
            .state('app.add_currency_confirm', {
                url: '/add_currency_confirm',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/currency_accounts/add_currency_confirm.html',
                        controller: 'AddCurrencyConfirmCtrl'
                    }
                },
                params: {
                    code: null,
                    issuer: null
                }
            })

            // Promotion
            .state('app.promotion_code', {
                url: '/promotion_code',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/promotions/code.html',
                        controller: 'PromotionCodeCtrl'
                    }
                }
            })

            .state('app.promotion_redeem', {
                url: '/promotion_redeem',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/promotions/redeem.html',
                        controller: 'PromotionRedeemCtrl'
                    }
                },
                params: {
                    promotion_code: null
                }
            })

            .state('app.promotion_success', {
                url: '/promotion_success',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/promotions/success.html',
                        controller: 'PromotionSuccessCtrl'
                    }
                },
                params: {
                    promotion_code: null
                }
            })

            // Request
            .state('app.request', {
                url: '/request',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/request/index.html',
                        controller: 'RequestCtrl'
                    }
                },
                params: {
                    amount: null,
                    note: null
                }
            })

            .state('app.request_from', {
                url: '/request_from',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/request/from.html',
                        controller: 'RequestFromCtrl'
                    }
                },
                params: {
                    amount: null,
                    note: null,
                    from: null
                }
            })

            .state('app.request_confirm', {
                url: '/request_confirm',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/request/confirm.html',
                        controller: 'RequestConfirmCtrl'
                    }
                },
                params: {
                    amount: null,
                    note: null,
                    from: null
                }
            })

            .state('app.request_success', {
                url: '/request_success',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/request/success.html',
                        controller: 'RequestSuccessCtrl'
                    }
                },
                params: {
                    amount: null,
                    note: null,
                    from: null
                }
            })

            .state('app.fica', {
                url: '/fica',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/fica/requirements.html',
                        controller: 'FicaRequirementsCtrl'
                    }
                },
                params: {
                    type: null
                }
            })

            .state('app.fica_id', {
                url: '/fica_id',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/fica/instructions_id.html',
                        controller: 'FicaIdCtrl'
                    }
                },
                params: {
                    type: null
                }
            })

            .state('app.fica_id_selfie', {
                url: '/fica_id_selfie',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/fica/instructions_id_selfie.html',
                        controller: 'FicaIdSelfieCtrl'
                    }
                },
                params: {
                    type: null
                }
            })

            .state('app.fica_proof_of_address', {
                url: '/fica_proof_of_address',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/fica/instructions_proof_of_address.html',
                        controller: 'FicaProofOfAddressCtrl'
                    }
                },
                params: {
                    type: null
                }
            })

            .state('app.fica_camera_upload', {
                url: '/fica_proof_of_address',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/fica/camera_upload.html',
                        controller: 'FicaCameraUploadCtrl'
                    }
                },
                params: {
                    type: null,
                    file: null
                }
            })

            // About
            .state('app.about', {
                url: '/about',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/about/index.html',
                        controller: 'AboutCtrl'
                    }
                }
            })


            // Help
            .state('app.help', {
                url: '/coming_soon',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/help/index.html',
                        controller: 'HelpCtrl'
                    }
                }
            })

            // Notifications
            .state('app.notifications', {
                url: '/notifications',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/notifications/index.html',
                        controller: 'NotificationsCtrl'
                    }
                }
            })

            // Settings
            .state('app.settings', {
                url: '/settings',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/index.html',
                        controller: 'SettingsCtrl'
                    }
                }
            })

            .state('app.personal_details', {
                url: '/personal_details',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/personal_details.html',
                        controller: 'PersonalDetailsCtrl'
                    }
                },
                params: {
                    first_name: null,
                    last_name: null,
                    metadata: null
                }
            })

            .state('app.username', {
                url: '/username',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/username.html',
                        controller: 'UsernameCtrl'
                    }
                },
                params: {
                    username: null
                }
            })

            .state('app.email_address', {
                url: '/email_address',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/email_address.html',
                        controller: 'EmailAddressCtrl'
                    }
                },
                params: {
                    email_address: null
                }
            })

            .state('app.mobile_number', {
                url: '/mobile_number',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/mobile_number.html',
                        controller: 'MobileNumberCtrl'
                    }
                },
                params: {
                    mobile_number: null
                }
            })

            .state('app.add_address', {
                url: '/add_address',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/add_address.html',
                        controller: 'AddressCtrl'
                    }
                }
            })

            .state('app.list_bank_accounts', {
                url: '/list_bank_accounts',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/list_bank_accounts.html',
                        controller: 'BankAccountCtrl'
                    }
                }
            })

            .state('app.add_bank_account', {
                url: '/add_bank_account',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/add_bank_account.html',
                        controller: 'BankAccountCtrl'
                    }
                }
            })


            .state('app.edit_bank_account', {
                url: '/edit_bank_account/:accId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/add_bank_account.html',
                        controller: 'BankAccountCtrl'
                    }
                }
            })


            .state('app.list_bitcoin_withdrawal_accounts', {
                url: '/list_bitcoin_withdrawal_accounts',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/list_bitcoin_withdrawal_accounts.html',
                        controller: 'BitcoinWithdrawalAccountCtrl'
                    }
                }
            })

            .state('app.add_bitcoin_withdrawal_account', {
                url: '/add_bitcoin_withdrawal_account',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/add_bitcoin_withdrawal_account.html',
                        controller: 'BitcoinWithdrawalAccountCtrl'
                    }
                }
            })


            .state('app.edit_bitcoin_withdrawal_account', {
                url: '/edit_bitcoin_withdrawal_account/:accId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/add_bitcoin_withdrawal_account.html',
                        controller: 'BitcoinWithdrawalAccountCtrl'
                    }
                }
            })


            .state('app.security', {
                url: '/security',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/security.html',
                        controller: 'SecurityCtrl'
                    }
                }
            })

            .state('app.change_password', {
                url: '/change_password',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/change_password.html',
                        controller: 'ChangePasswordCtrl'
                    }
                }
            })

            .state('app.two_factor', {
                url: '/two_factor',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/two_factor_instructions.html',
                        controller: 'TwoFactorCtrl'
                    }
                }
            })

            .state('app.pin', {
                url: '/pin',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/pin.html',
                        controller: 'PinCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');
    });
