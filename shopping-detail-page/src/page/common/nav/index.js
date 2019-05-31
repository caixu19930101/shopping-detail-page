
'use strict';
require('./index.css');

var _mm     = require('util/mm.js');
var _cart   = require('service/cart-service.js');

var nav = {
    init : function(){
        this.loadCartCount();
        return this;
    },

    loadCartCount : function(){
        _cart.getCartCount(function(res){
            $('.navbar .cart-count').text(res || 0);
        }, function(errMsg){
            $('.navbar .cart-count').text(0);
        });
    }
};

module.exports = nav.init();
$(function(){
      $(".control").hover(function(){
        $(".minichart").css("display","block");
        },function(){
        $(".minichart").css("display","none");
      });
    });
