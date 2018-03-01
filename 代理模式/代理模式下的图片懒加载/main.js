/*
 * @Author: linnanli 
 * @Description: 学习代理模式伪代码 
 * @Date: 2018-03-01 12:53:48 
 * @Last Modified by: linnanli
 * @Last Modified time: 2018-03-01 13:25:56
 */
// 使用代理模式实现图片预加载

//按照单一职责原则，myImg对象只负责定义图片本身的一些方法属性
function MyImg() {
    this.imgEle = document.createElement('img');
    document.body.appendChild(this.imgEle);
}
MyImg.prototype = {
    constructor: MyImg,
    setSrc: function (src) {
        this.imgEle.src = src;
    }
};

//定义一个Img对象的代理
//将图片预加载职责抽离出来
//实现对象之间的松耦合
function ProxyImg(){
    var _this = this;
    this.myImg = new MyImg();
    this.imgObj = new Image();
    this.imgObj.onload = function(){
        _this.myImg.setSrc(_this.imgObj.src);
    }
}
ProxyImg.prototype = {
    constructor: ProxyImg,
    //代理接口和本体接口需要保持一致性
    //这样在任何使用代理的地方都可以切换到本体,用户可以放心的请求代理，他只需关心是否能得到想要的结果
    setSrc:function(src){
        this.myImg.setSrc('./loding.gif');
        this.imgObj.src = src;
    }
};

var proxyImg = new ProxyImg();
proxyImg.setSrc('https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2370699110,729535084&fm=27&gp=0.jpg');