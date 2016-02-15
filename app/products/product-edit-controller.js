///<reference path="../../typings/main.d.ts" />

(function () {
    "use strict";

    angular
        .module("productManagement")
        .controller("ProductEditController", ["product", "$state", ProductEditController]);

    function ProductEditController(product, $state) {
        var vm = this;

        vm.product = product;

        if (vm.product && vm.product.productId) {
            vm.title = "Edit: " + product.productName;
        } else {
            vm.title = "New Product"
        }
        
        vm.submit = function(){
            vm.product.$save();
        }
        
        vm.cancel = function(){
            $state.go("productList");
        }
    }
})();