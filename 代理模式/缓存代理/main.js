/*
 * @Author: linnanli 
 * @Description: 利用代理缓存计算量较大的结果 
 * @Date: 2018-03-01 15:04:13 
 * @Last Modified by: linnanli
 * @Last Modified time: 2018-03-01 17:12:59
 */
function Compute(){

}
Compute.prototype = {
    constructor: Compute,
    start:function(){
        var arg = Array.prototype.slice.call(arguments);
        var res = 0;
        for (var i = 0; i < arg.length;i++){
            res = res + arg[i];
        }

        return res;
    }
};

function ProxyCompute(){
    this.cache = [];
}
ProxyCompute.prototype = {
    constructor: ProxyCompute,
    start:function(){
        debugger
        var arg = Array.prototype.slice.call(arguments);
        var keyName = arg.join(',');
        if (keyName in this.cache){
            return this.cache[keyName];
        }
        var compute = new Compute();
        return this.cache[keyName] = compute.start.apply(compute, arg);
    }
};

var proxyCompute = new ProxyCompute();

proxyCompute.start(1,2,3,4);
proxyCompute.start(1, 2, 3, 4);
proxyCompute.start(1, 2, 3, 5);