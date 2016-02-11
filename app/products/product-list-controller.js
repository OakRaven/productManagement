(function () {
    "use strict";

    angular
        .module("productManagement")
        .controller("ProductListController", ["productResource", ProductListController]);

    function ProductListController(productResource) {
        var vm = this;
        
        vm.products = [];
        
        productResource
            .query(function(data){
               vm.products = data; 
            });
        
        vm.showImage = false;
        
        vm.toggleImages = function(){
            vm.showImage = !vm.showImage;            
        }
    }
})();