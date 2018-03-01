/*
 * @Author: linnanli 
 * @Description: Description 
 * @Date: 2018-03-01 17:26:34 
 * @Last Modified by: linnanli
 * @Last Modified time: 2018-03-01 17:50:36
 */
//计算乘数类
function Mult() {
    
}
Mult.prototype = {
    constructor: Mult,
    compute:function(){
        var arg = Array.prototype.slice.call(arguments);
        var result = 1;
        for (var i = 0; i < arg.length;i++){
            result *= arg[i];
        }

        return result;
    }
};
//计算累加类
function Plus() {

}
Plus.prototype = {
    constructor: Plus,
    compute: function () {
        var arg = Array.prototype.slice.call(arguments);
        var result = 1;
        for (var i = 0; i < arg.length; i++) {
            result += arg[i];
        }

        return result;
    }
};

//将缓存代理抽出
//并且按照鸭子判断，执行对象的compute函数
//用户可以通过代理执行任意类型的计算，并缓存他们
function ProxyCompute(object){
    var cache = [];
    return function(){
        var arg = Array.prototype.slice.call(arguments);
        var keyName = arg.join(',');
        if(keyName in cache){
            return cache[keyName];
        }else{
            return cache[keyName] = object.compute.apply(object, arg);
        }
    }
}


// debugger
var mult = ProxyCompute( new Mult() );
var plus = ProxyCompute( new Plus() );
console.log(mult(1, 2, 3, 4, 5));
console.log(mult(1, 2, 3, 4, 5));
console.log(mult(1, 2, 3, 4));

console.log(plus(1, 2, 3, 4, 5));
console.log(plus(1, 2, 3, 4));

