/*
 * @Author: linnanli 
 * @Date: 2018-03-02 22:25:22 
 * @Last Modified by: linnanli
 * @Last Modified time: 2018-03-02 23:15:12
 * @Dscription: des 
*/
var listener = {
    cache:{},
    trigger:function(){
        var key = Array.prototype.shift.call(arguments);
        var func = this.cache[key];
        if (func === undefined || func.length === 0) return false;

        for (var i = 0; i < func.length;i++){
            func[i].apply(this,arguments);
        }
    },
    on:function(key,callback){
        if (typeof key !== 'string' || typeof callback !== 'function') return false;
        if(typeof this.cache[key] === 'undefined')
            this.cache[key] = [];
        
        this.cache[key].push(callback);
    },
    removeListener: function (key,callback){
        if(typeof key !== 'string' || typeof callback !== 'function') return false;
        var fnc = this.cache[key];
        for (var index = 0; index < fnc.length; index++) {
            if (fnc[i] === callback) {
                func.splice(i,1);
            }
            
        }
    }
};

function installEvent(object){
    for (var key in object) {
        object[key] = event[key];
    }
}
