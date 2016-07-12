function calc_constructor() {
    var self = this; //save scope
    self.num_array = [""]; //array to store
    self.operator = '';//variable to store operator
    self.index = 0;//index for array
    self.result = null;//variable to store result

    /**
     * When button is pressed, find if this is operator, clear, all clear, decimal, or number
     */
    self.button_pressed = function (val) {
        switch (val) {
            case "+":
            case "-":
            case "/":
            case "*":
                self.operator_clicked(val);
                break;
            case "=":
                self.evaluate_array();
                break;
            case "C":
                self.clear_entry();
                break;
            case "CE":
                self.clear_all();
                break;
            default:
                self.number_clicked(val);
                break;
        }
    };

    /**
     * display function
     * @param val
     */
    self.display = function (val) {
        $('#output').html(val);
    };

    /**
     * number clicked function
     * @param val
     */
    self.number_clicked = function (val) {
        self.num_array[self.index] += val;  //store number to num_array
        self.display(self.num_array[self.index]);   //display stored num_array
    };

    /**
     * decimal clicked function
     */
    self.decimal_clicked = function () {
        //checks num_array and locates decimal. If decimal present, return
        if(self.num_array[self.index].indexOf('.') != -1) {
            return;
        }
        //if user presses decimal first, insert 0 before decimal
        else if (self.num_array[self.index] === '') {
            self.num_array[self.index] += 0;
        }

        self.num_array[self.index] += val;  //store decimal
        self.display(self.num_array[self.index]);   //display input
    };


    /**
     *  operator clicked function
     */
    self.operator_clicked = function (val) {

        // check if operator has been set before
        if( self.operator !== "") {
            self.operator = val;    //replace previous operator to new one
            console.log("Operator replaced");
        } else {
            self.operator = val;
            self.index++;   // increase index
            self.num_array[self.index] = "";//reset current num_array
        }
        self.display(val);//display operator
    };
    /**
     * equal function
     * Calculate when "=" is pressed
     */
    self.evaluate_array = function () {

        // if user presses enter when array is empty, don't evaluate array
        if (self.num_array[0] == "" || self.num_array[1] == "") {
            console.log("enter first");
            return;
        }
        // check operator for what arithmetic function
        if (self.operator == "+") {
            self.result = parseFloat(self.num_array[0]) + parseFloat(self.num_array[1]);
        } else if (self.operator == "-") {
            self.result = parseFloat(self.num_array[0]) - parseFloat(self.num_array[1]);
        } else if (self.operator == "*") {
            self.result = parseFloat(self.num_array[0]) * parseFloat(self.num_array[1]);
        } else if (self.operator == "/") {
            if (self.num_array[1] == "0") {
                return "Invalid";
            } else {
                self.result = parseFloat(self.num_array[0]) / parseFloat(self.num_array[1]);
            }
        }

        self.num_array = [self.result];   // store result to num_array
        self.index = 0;                 // set index back to 0
        self.operator = "";
        console.log("self.result: ", self.result);
        self.display(self.result);   // display result
        return self.result;             // return result

    };
    /**
     * clear entry function
     */
    self.clear_entry = function () {
        self.num_array[self.index] = "0";   // reset num_array with current index
        self.display(self.num_array[self.index]);   // display 0
    };
    /**
     * clear all function
     */
    self.clear_all = function () {
        self.num_array = [""];    // reset whole num_array
        self.operator = "";     // reset operator
        self.index = 0;         // reset index to 0
        self.display("0");// display 0
    };
    /**
     * button pressed function
     * @param keyCode
     * @returns key_chart or 'Invalid'
     */

    self.keyboard_pressed = function (keyCode) {
        //keyboard code object
        var keyChart = {
            48: 0,
            49: 1,
            50: 2,
            51: 3,
            52: 4,
            53: 5,
            54: 6,
            55: 7,
            56: 8,
            57: 9,
            46: '.',
            43: '+',
            45: '-',
            42: 'x',
            47: '÷',
            13: '=',
            99: 'C'
        };


        // check if key_chart is defined
        if (keyChart[keyCode] != undefined) {
            return keyChart[keyCode];
        } else {
            return 'Invalid';
        }
    }
}
/**
 * document ready area
 */
$(document).ready(function() {
    // calculator instantiation
    var calc = new calc_constructor();

    // click handler
    $('button').click(function () {
        calc.button_pressed($(this).text());
    });

    //keyboard input handler
    $(window).on('keypress', function (e) {
        calc.button_pressed(keyboard_press(e.keyCode));
    });

});
