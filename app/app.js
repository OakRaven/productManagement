(function(){
    "use strict";
    
    angular
        .module("productManagement", 
            [ "ui.router",
              "common.services",
              "productResourceMock"])
        .config(["$stateProvider", "$urlRouterProvider", function($stateProvider,$urlRouterProvider){
            $stateProvider
                .state("home", {
                    url: "/",
                    templateUrl: "app/welcome-view.html"
                })
                .state("productList", {
                    url: "/products",
                    templateUrl: "app/products/product-list-view.html",
                    controller: "ProductListController as vm"
                })
                .state("productEdit", {
                    url: "/products/edit/:productId",
                    templateUrl: "app/products/product-edit-view.html",
                    controller: "ProductEditController as vm"
                });
                
            $urlRouterProvider.otherwise("/");
        }]);
    
})();