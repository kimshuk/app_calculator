/**
 * Created by ericjohnson on 10/27/15.
 */


var calculator = function (callback) {
    var self = this;
    var c = (typeof callback == 'function') ? callback : function (type, value) {
        //an example of what the callback function has inside of it
        //scope is the calculator
        //type is teh type of callback that has happened
        // type {'calculation','itemAdded','error'}
        // value : value of the item that triggered the callback
    };

    self.arr = [];
    self.valueToDisplay = 0;

    if ($ == undefined) {
        return new Error("jQuery isn't loaded, please load jQuery before attempting to use the calculate object");
    }

    if (!c) {
        throw(new Error("Parameter passed into calculator wasnt a function"));
    }

    self.c = c;

    self.type = null;

    self.addItem = function (val) {
        var v = null;

        if (isNaN(parseFloat(val))) {
            v = self.createOperator(val);
        } else {
            v = new number(val);
        }

        var lastItem = new calculatorItem();

        if (self.arr.length > 1) {
            lastItem = self.arr[self.arr.length - 1];
        }
        //we check if the last item inserted was a number and if it is we update the value by adding the numbers together as strings
        if (lastItem.isNumber && v.isNumber) {
            lastItem.val = lastItem.val + "" + v.val;
        } else {
            //new value is either not a number or the previous item wasn't a number
            if (lastItem.isOperator && v.isOperator) {
                //both the last and new items are operators in this scenario dont do anything
                return;
            }

            if (self.operatorAlreadyExists && v.isOperator) {
                var newV = self.do();
                self.c.call(self, 'calculation', newV);
                if (newV.isNumber) {
                    self.arr = [newV, v];
                }
            } else {
                //first item trying to be added as an operator auto add 0 at the begining
                if (self.arr.length === 0 && v.isOperator) {
                    self.arr.push(new number("0"));
                }
                self.arr.push(v);
                self.c.call(self, 'itemAdded', v);
            }
        }
    }

    Object.defineProperty(self, "operatorAlreadyExists", {
        get: function () {
            var r = false;
            for (var index in self.arr) {
                if (self.arr[index] instanceof operator) {
                    r = true;
                    break;
                }
            }

            return r;
        }
    });

    self.createOperator = function (operator) {
        var r = new calculatorItem();
        switch (operator) {
            case '+':
                r = new plus();
                break;
            case '-':
                r = new subtract();
                break;
            case '/':
                r = new divide();
                break;
            case 'x':
                r = new multiple();
                break;
        }

        return r;
    }

    self.do = function (arr) {
        var values = arr;
        if (!values) {
            values = self.arr;
        }

        var r = new calculatorItem();

        for (var i = 0; i < values.length; i++) {
            var item = values[i];
            if (item.isOperator && values.length > 2) {
                r = new number(item.calculate(values[i - 1].val, values[i + 1].val));
                break;
            }
        }

        return r;
    }


    Object.defineProperty(self, "displayValue", {
        get: function () {
            return self.valueToDisplay;
        }
    });

    return self;
}

var calculatorItem = function (value) {
    var self = this;

    var val = null;

    Object.defineProperty(self, "isNumber",
        {
            get: function () {
                return self instanceof number;
            }
        });

    Object.defineProperty(self, "isOperator",
        {
            get: function () {
                return self instanceof operator;
            }
        });

    Object.defineProperty(self, "val", {
        get: function () {
            return val;
        },
        set: function (nV) {
            val = nV;
        }
    });

    self.val = value;
}

var number = function (num, callback) {
    var self = this;

    var val = null;

    if (typeof $ === "undefined") {
        throw(new Error("jQuery is needed to do any calulations"));
        return false;
    }

    calculatorItem.call(self, num);

    self.displayElm = $('<div>', {
        class: "num"
    });

    if (callback && typeof callback == 'function') {
        self.displayElm.on('click', callback);
    }
}

number.prototype = Object.create(calculatorItem.prototype);
number.prototype.constructor = calculatorItem;

var operator = function (str) {
    var self = this;

    calculatorItem.call(self, str);
}

operator.prototype = Object.create(calculatorItem.prototype);
operator.prototype.constructor = calculatorItem;

operator.prototype.priority = false;
operator.prototype.calculate = function (num1, num2) {
    var val = 0;
    return val;
}

var plus = function () {
    var self = this;
    operator.call(self, "+");

    self.calculate = function (num1, num2) {
        var n1 = parseFloat(num1);
        var n2 = parseFloat(num2);
        if (n1 == NaN || n2 == NaN) {
            return new Error("Plus operator Error, cant convert parameters into numbers");
        }
        return n1 + n2;
    }
}

var subtract = function () {
    var self = this;
    operator.call(self, "-");

    self.calculate = function (num1, num2) {
        var n1 = parseFloat(num1);
        var n2 = parseFloat(num2);
        if (n1 == NaN || n2 == NaN) {
            return new Error("Plus operator Error, cant convert parameters into numbers");
        }
        return n1 - n2;
    }
}

var multiple = function () {
    var self = this;
    operator.call(self, "x");

    self.calculate = function (num1, num2) {
        var n1 = parseFloat(num1);
        var n2 = parseFloat(num2);
        if (n1 == NaN || n2 == NaN) {
            return new Error("Plus operator Error, cant convert parameters into numbers");
        }
        return n1 * n2;
    }
}

var divide = function () {
    var self = this;
    operator.call(self, "/");

    self.calculate = function (num1, num2) {
        var n1 = parseFloat(num1);
        var n2 = parseFloat(num2);
        if (n1 == NaN || n2 == NaN) {
            return new Error("Plus operator Error, cant convert parameters into numbers");
        }
        return n1 / n2;
    }
}

plus.prototype = Object.create(operator.prototype);
plus.prototype.constructor = operator;

subtract.prototype = Object.create(operator.prototype);
subtract.prototype.constructor = operator;

multiple.prototype = Object.create(operator.prototype);
multiple.prototype.constructor = operator;

divide.prototype = Object.create(operator.prototype);
divide.prototype.constructor = operator;