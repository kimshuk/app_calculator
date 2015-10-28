/**
 * Created by ericjohnson on 10/27/15.
 */


var calculator = function () {
    var self = this;

    self.arr = [];

    if (!$) {
        return new Error("jQuery isn't loaded, please load jQuery before attempting to use the calculate object");
    }

    self.addNumber = function (num) {
        if (num.constructor != 'number') {
            return new Error("Parameter is not a number that was passed into addNumber method");
        }


    }

    self.add = function(val){
        var v = null;
        if(typeof val == 'number'){
            v = new number(val);
        }else{
            v = new operator(val);
        }

        self.arr.push(v);
    }

    return self;
}

var number = function (num, callback) {
    var self = this;

    self.num = num;

    self.displayElm = $('<div>', {
        class: "num"
    });

    if(callback && typeof callback == 'function'){
        self.displayElm.on('click', callback);
    }
}

var operator = function(){
    var self = this;



    return self;
}