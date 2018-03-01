/*
 * @Author: linnanli 
 * @Description: Description 
 * @Date: 2018-03-01 15:02:36 
 * @Last Modified by:   linnanli 
 * @Last Modified time: 2018-03-01 15:02:36 
 */

//文件上传对象
function SyncFile(){
    
}
SyncFile.prototype = {
    constructor: SyncFile,
    upload: function (id){
        console.log('upload' + id);
        alert('upload' + id);
    }
};

//文件上传代理
//实现合并请求功能
function ProxySyncFile(){
    this.syncFile = new SyncFile();
    this.cache = [];
}

ProxySyncFile.prototype = {
    constructor: ProxySyncFile,
    upload:function(id){
        var _this = this;
        this.cache.push(id);
        if(this.timer)
            clearTimeout(this.timer);
        //延迟执行 upload
        this.timer = setTimeout(function(){
            _this.syncFile.upload(_this.cache.join(','));
            clearTimeout(_this.timer);
        },1500);
    }
};

var proxySyncFile = new ProxySyncFile();

var checkboxAll = Array.prototype.slice.call(document.querySelectorAll('input[type=checkbox]'));
checkboxAll.forEach(function (ele,index) {
    ele.onclick = function(){
        if(this.checked === true){
            proxySyncFile.upload(this.id);
        }
        
    }
});
console.log(checkboxAll);