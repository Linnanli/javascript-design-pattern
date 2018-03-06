/*
 * @Author: linnanli 
 * @Description: Description 
 * @Date: 2018-03-06 18:44:11 
 * @Last Modified by: linnanli
 * @Last Modified time: 2018-03-06 19:06:56
 */


 var objectPoolFactory = function(createFunc){
    var objPool = []; 
    return {
         create:function(){
             var obj = objPool.length === 0 ?
                 createFunc.apply(this,arguments) :
                 objPool.shift();

            return obj;
         },
         recovery:function(obj){
             objPool.push(obj);
         }
     };
 }
// debugger
var iframeFactory = objectPoolFactory(function(id){
    var iframe = document.createElement('iframe');
    iframe.id = id;
    document.body.appendChild(iframe);

    iframe.onload = function(){
        iframe.onload = null;
        iframeFactory.recovery(iframe);
    }
    
    return iframe;
});
// debugger
var iframe = iframeFactory.create(1);
iframe.src = 'http://www.baidu.com';

var iframe2 = iframeFactory.create(2);
iframe2.src = 'http://www.qq.com';

var timer = setTimeout(function(){
    //这时iframe已经被回收,create时就会从对象池里获取DOM
    var iframe3 = iframeFactory.create(2);
    iframe3.src = 'http://www.qq.com';
    clearTimeout(timer);
},3000);