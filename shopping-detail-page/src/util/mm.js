
'use strict';
var Hogan = require('hogan.js');
var conf = {
    serverHost : ''
};
var _mm = {

    request : function(param){
        var _this = this;
        $.ajax({
            type        : param.method  || 'get',
            url         : param.url     || '',
            dataType    : param.type    || 'json',
            data        : param.data    || '',
            success     : function(res){

                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }

                else if(10 === res.status){
                    _this.doLogin();
                }

                else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error       : function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },

    getServerUrl : function(path){
        return conf.serverHost + path;
    },

    getUrlParam : function(name){
        var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result  = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },

    renderHtml : function(htmlTemplate, data){
        var template    = Hogan.compile(htmlTemplate),
            result      = template.render(data);
        return result;
    },

    successTips : function(msg){
        alert(msg || 'Right！');
    },
    errorTips : function(msg){
        alert(msg || 'Smothing Wrong');
    },

};

module.exports = _mm;
