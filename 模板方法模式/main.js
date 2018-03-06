/*
 * @Author: linnanli 
 * @Description: 模板方法模式 
 * @Date: 2018-03-05 11:07:47 
 * @Last Modified by: linnanli
 * @Last Modified time: 2018-03-05 19:25:57
 */

//使用继承的模板方法模式
//init 方法封装子类的算法框架，作为一个算法的模板，指导之类按照何种顺序去执行哪些方法
 function Beverage() {
     
 }

Beverage.prototype = {
    constructor: Beverage,
    boilWater:function(){
        console.log('把水煮沸');
    },
    brew:function(){
        throw new Error('请重写brew方法');
    },
    pourIncup: function () {
        throw new Error('请重写pourIncup方法');
    },
    addCondiments: function () {
        throw new Error('请重写addCondiments方法');
    },
    init:function(){
        this.boilWater();
        this.brew();
        this.pourIncup();
        this.addCondiments();
    }
};

//定义子类
//按照父类的框架去重写方法
function Tea(){
    var arg = Array.prototype.slice.call(arguments);
    Beverage.apply(this, arg);
}
Tea.prototype = new Beverage();
Tea.prototype.constructor = Tea;
Tea.prototype.boilWater = function () {
    console.log('把水煮沸');
}
Tea.prototype.brew = function () {
        console.log('用沸水浸泡茶叶');
}
Tea.prototype.pourIncup = function () {
        console.log('把茶倒进杯子');
}
Tea.prototype.addCondiments = function () {
        console.log('加柠檬');
}

var tea = new Tea();
tea.init();
console.log(tea);


//更适用与javascript的模板方法模式
function Beverage2(options) {
    var boilWater = function(){
        console.log('把水煮沸');
    }

    var brew = options.brew || function () {
        throw new Error('请重写brew方法');
    }

    var pourIncup = options.pourIncup || function () {
        throw new Error('请重写pourIncup方法');
    }

    var addCondiments = options.addCondiments || function () {
        throw new Error('请重写addCondiments方法');
    }

    function F(){}
    F.prototype.init = function (params) {
        boilWater();
        brew();
        pourIncup();
        addCondiments();
    }

    return F;
}

var Tea = Beverage2({
    brew:function() {
        console.log('用沸水浸泡茶叶');
    },
    pourIncup: function () {
        console.log('把茶倒进杯子');
    },
    addCondiments:function() {
        console.log('加柠檬');
    }
});

var tea = new Tea();
tea.init();