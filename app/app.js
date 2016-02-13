///<reference path="../typings/main.d.ts" />

(function(){
    "use strict";
    
    angular
        .module("productManagement", 
            [ "ui.router",
              "ui.mask",
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
                .state("productDetail", {
                    url: "/products/:productId",
                    templateUrl: "app/products/product-detail-view.html",
                    controller: "ProductDetailController as vm",
                    resolve: {
                        productResouce: "productResource",
                        product: function(productResource, $stateParams){
                            var productId = $stateParams.productId;
                            return productResource.get({
                                productId: productId
                            }).$promise;
                        }
                    }
                })
                .state("productEdit", {
                    absract: true,
                    url: "/products/edit/:productId",
                    templateUrl: "app/products/product-edit-view.html",
                    controller: "ProductEditController as vm",
                    resolve: {
                        productResouce: "productResource",
                        product: function(productResource, $stateParams){
                            var productId = $stateParams.productId;
                            return productResource.get({
                                productId: productId
                            }).$promise;
                        }
                    }                    
                })               
                .state("productEdit.info", {
                    url: "/info",
                    templateUrl: "app/products/product-edit-info-view.html"
                })               
                .state("productEdit.price", {
                    url: "/price",
                    templateUrl: "app/products/product-edit-price-view.html"
                })               
                .state("productEdit.tags", {
                    url: "/tags",
                    templateUrl: "app/products/product-edit-tags-view.html"
                });
                
            $urlRouterProvider.otherwise("/");
        }]);
    
})();