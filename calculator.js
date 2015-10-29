/**
 * Created by ericjohnson on 10/27/15.
 */


var calculator = function (callback) {
    var self = this;
    var c = (typeof callback == 'function') ? callback : function (type, value) {
        //an example of what the callback function has inside of it
        //scope is the calculator
        //type is teh type of callback that has happened
        // type {'calculated','itemAdded','error'}
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
            v = self.createItem(val);
        } else {
            v = new number(val);
        }

        if (v.val === undefined) {
            throw(new Error("Calculator addItem Error, value passed in " + val + " is not a valued argument"));
        }

        var lastItem = new calculatorItem();
        var newItem;

        var n1 = (self.arr.length > 0) ? self.arr[0] : new calculatorItem();

        if (self.arr.length > 0) {
            lastItem = self.arr[self.arr.length - 1];
        }
        console.log(lastItem);
        //we check if the last item inserted was a number and if it is we update the value by adding the numbers together as strings
        if (v.isNumber && lastItem.isNumber) {
            lastItem.val = lastItem.val + "" + v.val;
            self.c.call(self, 'itemAdded', lastItem.val, lastItem);
        } else if (v.isEqualSign) {
            if (self.arr.length == 1) {
                if (n1.isCalculation) {
                    self.arr.push(n1.operator, n1.num2);
                }
            }

            //equal was last item added
            if (self.arr.length == 2) {
                if (n1.isNumber) {
                    self.arr.push(n1);
                } else if (n1.isCalculation) {
                    self.arr.push(n1);
                }
            }

            if (self.arr.length == 3) {
                var calc1 = new calculation(self.arr[0], self.arr[1], self.arr[2]);
                self.arr = [calc1, calc1.operator, calc1.num2];
                self.c.call(self, 'calculated', calc1.val, calc1);
            }

        } else {
            //new value is either not a number or the previous item wasn't a number
            if (lastItem.isOperator && v.isOperator) {
                //both the last and new items are operators in this scenario dont do anything
                return;
            }

            if (self.operatorAlreadyExists && v.isOperator) {
                if (self.arr.length == 3) {
                    var calc1 = new calculation(self.arr[0], self.arr[1], self.arr[2]);
                    self.c.call(self, 'calculated', calc1.val, calc1);

                    self.arr = [calc1, v];
                }
            } else {
                //when there isnt already an operator
                //push either operator or number to the end of the array
                if (self.arr.length === 0 && v.isOperator) {
                    self.arr.push(new number("0"));
                }
                self.arr.push(v);
                self.c.call(self, 'itemAdded', v.val, v);
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

    self.createItem = function (operator) {

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
            case '=':
                r = new equalSign();
                break;
        }

        return r;
    }

    self.clear = function () {
        self.arr.pop();
        self.c.call(self, 'C');
    }

    self.allClear = function () {
        self.arr = [];
        self.c.call(self, 'AC');
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

    Object.defineProperty(self, "isEqualSign",
        {
            get: function () {
                return self instanceof equalSign;
            }
        });

    Object.defineProperty(self, "isCalculation",
        {
            get: function () {
                return self instanceof calculation;
            }
        });

    Object.defineProperty(self, "val", {
        get: function () {

            //handle calculation object
            if (typeof val == 'function') {
                return val();
            } else {
                return val;
            }
        },
        set: function (nV) {
            val = nV;
        }
    });

    self.val = value;
}

var calculation = function (num1, op, num2) {
    var self = this;

    self.num1 = num1;
    self.num2 = num2;
    self.operator = op;

    calculatorItem.call(self, function () {
        var calculatedValue = op.calculate(num1, num2);
        return calculatedValue;
    });

    self.calculate = function () {
        return op.calculate(num1, self.val);
    }
}

calculation.prototype = Object.create(calculatorItem.prototype);
calculation.prototype.constructor = calculatorItem;

var number = function (num, callback) {
    var self = this;

    var val = null;

    if (typeof $ === "undefined") {
        throw(new Error("jQuery is needed to do any calculations"));
        return false;
    }

    calculatorItem.call(self, parseFloat(num));

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
    var num1Value = num1;
    var num2Value = num2;
    //this allows us to handle straight js primitive numbers and our number object
    if (typeof num1 == "number") {
        num1Value = new Number(num1);
    }
    //this allows us to handle straight js primitive numbers and our number object
    if (typeof num2 == "number") {
        num2Value = new Number(num2);
    }

    var r1;
    var r2;

    if (num1Value instanceof calculation) {
        r1 = num1Value.val;
    } else {
        r1 = parseFloat(num1Value.val);
    }
    if (num2Value instanceof calculation) {
        r2 = num2Value.val;
    } else {
        r2 = parseFloat(num2Value.val);
    }

    return [r1, r2];
}

var plus = function () {
    var self = this;
    operator.call(self, "+");

    self.calculate = function (num1, num2) {
        var values = operator.prototype.calculate.call(this, num1, num2);

        return values[0] + values[1];
    }
}

var subtract = function () {
    var self = this;
    operator.call(self, "-");

    self.calculate = function (num1, num2) {
        var values = operator.prototype.calculate.call(this, num1, num2);


        return values[0] - values[1];
    }
}

var multiple = function () {
    var self = this;
    operator.call(self, "x");

    self.calculate = function (num1, num2) {
        var values = operator.prototype.calculate.call(this, num1, num2);
        return values[0] * values[1];
    }
}

var divide = function () {
    var self = this;
    operator.call(self, "/");

    self.calculate = function (num1, num2) {
        var values = operator.prototype.calculate.call(this, num1, num2);
        return values[0] / values[1];
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

var equalSign = function () {
    var self = this;
    calculatorItem.call(self, "=");

    self.calculate = function (arr, calc) {

        var lastItem = arr[arr.length - 1];
        var r;

        //if no operator then the length should only be 1, else error out
        if (!calc.operatorAlreadyExists && calc.length == 1) {
            return arr[0];
        } else if (!calc.operatorAlreadyExists && calc.length > 1) {
            return new Error("Equal Sign, unable to calculate result. Unexpected calculator item length");
        }

        console.log("lastItem.isOperator : ", arr[arr.length - 2]);

        if (lastItem.isOperator) {
            //use the item before the operator and use it for both sides of the equation
            r = new number(lastItem.calculate(arr[arr.length - 2], arr[arr.length - 2]));
        } else {
            r = calc.do(arr);
        }

        return r;
    }
}