'use strict';
require('./index.css');
require('page/common/nav/index.js');
var _mm             = require('util/mm.js');
var _cart           = require('service/cart-service.js');
let small = 'Small';
let medium = 'Medium';
let large = 'Large';
$('.size0').click(function(){
  console.log('123');
  $('.size').empty().append(small);
  });
  $('.size1').click(function(){
    console.log('123');
    $('.size').empty().append(medium);
    });
    $('.size2').click(function(){
      console.log('123');
      $('.size').empty().append(large);



      $(document).on('click', '#trans', function(){
          var $this       = $(this),
              $pCount     = $this.siblings('.count-input'),
              currCount   = parseInt($pCount.val()),
              type        = $this.hasClass('plus') ? 'plus' : 'minus',
              minCount    = 1,
              newCount    = 0;
          if(type === 'plus'){
              if(currCount >= maxCount){
                  _mm.errorTips('The most count');
                  return;
              }
              newCount = currCount + 1;
          }else if(type === 'minus'){
              if(currCount <= minCount){
                  return;
              }
              newCount = currCount - 1;
          }

          _cart.updateProduct({
              productId : productId,
              count : newCount
          }, function(res){
              _this.renderCart(res);
          }, function(errMsg){
              _this.showCartError();
          });
      });

});
