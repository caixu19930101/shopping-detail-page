
'use strict';
require('./index.css');

var nav             = require('page/common/nav/index.js');
var _mm             = require('util/mm.js');
var _cart           = require('service/cart-service.js');
var templateIndex   = require('./index.string');

var page = {
    data : {

    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadCart();
    },
    bindEvent : function(){
        var _this = this;

        $(document).on('click', '.cart-select', function(){
            var $this = $(this),
                productId = $this.parents('.nav-item').data('owl-stage');

            if($this.is(':checked')){
                _cart.selectProduct(productId, function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }

            else{
                _cart.unselectProduct(productId, function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }
        });

    },

    loadCart : function(){
        var _this       = this;

        _cart.getCartList(function(res){
            _this.renderCart(res);
        }, function(errMsg){
            _this.showCartError();
        })
    },

    renderCart : function(data){
        this.filter(data);

        this.data.cartInfo = data;

        var cartHtml = _mm.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml);
        nav.loadCartCount();
    },


    filter : function(data){
        data.notEmpty = !!data.cartProductVoList.length;
    },
    showCartError: function(){
        $('.page-wrap').html('<p class="err-tip">smothing wrong</p>');
    }
};
$(function(){
    page.init();
})
