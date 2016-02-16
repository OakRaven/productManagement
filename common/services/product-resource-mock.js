(function () {
    "use strict";

    angular
        .module("productResourceMock", ["ngMockE2E"])
        .run(function ($httpBackend) {
            var products = [
                {
                    "productId": 1,
                    "productName": "Leaf Rake",
                    "productCode": "GDN-0011",
                    "releaseDate": new Date(2009, 3, 19),
                    "description": "Leaf rake with 48-inch wooden handle.",
                    "cost": 9.00,
                    "price": 19.95,
                    "category": "garden",
                    "tags": ["leaf", "tool"],
                    "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
                },
                {
                    "productId": 2,
                    "productName": "Garden Cart",
                    "productCode": "GDN-0023",
                    "releaseDate": new Date(2010, 3, 18),
                    "description": "15 gallon capacity rolling garden cart",
                    "cost": 20.00,
                    "price": 32.99,
                    "category": "garden",
                    "tags": ["barrow", "cart", "wheelbarrow"],
                    "imageUrl": "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
                },
                {
                    "productId": 5,
                    "productName": "Hammer",
                    "productCode": "TBX-0048",
                    "releaseDate": new Date(2013, 5, 21),
                    "description": "Curved claw steel hammer",
                    "cost": 1.00,
                    "price": 8.99,
                    "category": "toolbox",
                    "tags": ["tool"],
                    "imageUrl": "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
                },
                {
                    "productId": 8,
                    "productName": "Saw",
                    "productCode": "TBX-0022",
                    "releaseDate": new Date(2009, 5, 15),
                    "description": "15-inch steel blade hand saw",
                    "cost": 6.95,
                    "price": 11.55,
                    "category": "garden",
                    "tags": ["garden", "mower"],
                    "imageUrl": "http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"
                },
                {
                    "productId": 10,
                    "productName": "Video Game Controller",
                    "productCode": "GMG-0042",
                    "releaseDate": new Date(2002, 10, 15),
                    "description": "Standard two-button video game controller",
                    "cost": 2.22,
                    "price": 35.95,
                    "category": "gaming",
                    "tags": ["gaming", "controller", "video game"],
                    "imageUrl": "http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"
                }
            ];
            
            var productUrl = "/api/products";            
            $httpBackend.whenGET(productUrl).respond(products);
            
            var editingRegex = new RegExp(productUrl + "/[0-9][0-0]*", "");
            $httpBackend.whenGET(editingRegex).respond(function(method, url, data){
                var product = {productId: 0};
                var parameters = url.split("/");
                var lengh = parameters.length;
                var id = parameters[lengh - 1];
                
                if(id > 0){
                    for(var i = 0; i < products.length; i++){
                        if(products[i].productId == id){
                            product = products[i];
                            break;
                        }
                    }
                }
                
                return [200, product, {}];
            });
            
            $httpBackend.whenPOST(productUrl).respond(function(method, url, data){
                var product = angular.fromJson(data);
                product.releaseDate = new Date(product.releaseDate);
                
                if(!product.productId) {
                    product.productId = products[products.length - 1].productId + 1;
                    products.push(product);
                } else {
                    for(var i = 0; i < products.length; i++){
                        if(products[i].productId ==  product.productId){
                            products[i] = product;
                            break;
                        }
                    }
                }
                
                
                return [200, product, {}];
            });
            
            // Pass though any requests for application files
            $httpBackend.whenGET(/app/).passThrough();
        });
})();