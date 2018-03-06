/*
 * @Author: linnanli 
 * @Date: 2018-03-06 22:59:15 
 * @Last Modified by: linnanli
 * @Last Modified time: 2018-03-06 23:30:14
 * @Dscription: des 
*/

function Chain(fn){
    this.fn = fn;
    this.successor = null;
}
Chain.prototype = {
    setSuccessor:function (successor) {
        return this.successor = successor;
    },
    passRequest:function(){
        var status = this.fn.apply(this,arguments);
        if (status === 'success'){
            return this.next.apply(this,arguments);
        }
        return status;
    },
    next:function(){
        return this.successor && this.passRequest.apply(this.successor, arguments);
    }
};

var chain1 = new Chain(function(){
    console.log('chain1');
    return 'success';
});

var chain2 = new Chain(function () {
    var _this = this,
        timer = null;
    console.log('chain2');
    timer = setTimeout(function(){
        // _this.next();
        clearTimeout(timer);
    });
});

var chain3 = new Chain(function () {
    console.log('chain3');
    return 'success';
});

debugger
chain1.setSuccessor(chain2).setSuccessor(chain3);
chain1.passRequest();


