function calc_constructor() {
    var self = this;
    self.num_array = [""];
    self.operator = '';
    self.index = 0;
    self.result = null;

    /********************** BUTTON PRESSED **********************/
    self.button_pressed = function (val) {
        switch (val) {
            case '+':
            case '-':
            case 'x':
            case '÷':
                self.operator_clicked(val);
                break;
            case '.':
                self.decimal_clicked(val);
                break;
            case '=':
                self.evaluate_array(val);
                break;
            case 'CE':
                self.clear_entry();
                break;
            case 'C':
                self.clear();
                break;
            // case 'xy':
            //     $('.display').html('^');
            //     self.exponent_clicked(val);
            //     break;
            default:
                self.number_clicked(val);
                break;
        }
    };

    /************************ DISPLAY *************************/
    self.display = function(val){
        $('.display').html(val);
    };
    /********************** NUMBER CLICKED **********************/
    self.number_clicked = function(num) {
        self.num_array[self.index] += num;
        console.log('num_array:',self.num_array);
        self.display(self.num_array[self.index]);
    };

    /********************** DECIMAL CLICKED **********************/
    self.decimal_clicked = function(val){
        /** Checks num_array and locates decimal. If decimal present, return **/
        if (self.num_array[self.index].indexOf('.') != '-1'){
            return;
        }
        /** If user presses decimal first insert 0 before decimal **/
        else if (self.num_array[self.index] === ""){
            self.num_array[self.index] += 0;
        }
        self.num_array[self.index] += val;
        self.display(self.num_array[self.index]);
    };

    /********************** OPERATOR CLICKED **********************/
    self.operator_clicked = function(val){
        self.operator = val;
        console.log('operator clicked:', self.operator);

        /** If num_array[0]&[1] have values and operator pressed, evaluate array **/
        if (typeof self.num_array[1] == 'string'){
            self.evaluate_array();
        }
        /** If operator already exists don't increase index **/
        if (self.operator !== ""){
            console.log('operator is present')
        }

        self.index++;
        self.num_array[self.index] = '';
        self.display(val);
    };

    // /********************** EXPONENT CLICKED **********************/
    // self.exponent_clicked = function(val){
    //     self.display(val);
    //     if (self.num_array[0] === "") {
    //         console.log('Please enter a number');
    //         return;
    //     }
    // };

    /********************** CALCULATE **********************/
    self.evaluate_array = function() {
        /** If user presses enter when array is empty, don't evaluate array **/
        if (self.num_array[0] === "" || self.num_array[1] === "") {
            console.log('Cannot evaluate.');
            return;
        }
        /** If user presses enter after array is evaluated, repeat operation **/



        if (self.operator == "+"){
            self.result = parseFloat(self.num_array[0]) + parseFloat(self.num_array[1]);
        }
        else if (self.operator == "-"){
            self.result = parseFloat(self.num_array[0]) - parseFloat(self.num_array[1]);
        }
        else if (self.operator == "x"){
            self.result = parseFloat(self.num_array[0]) * parseFloat(self.num_array[1]);
        }
        else if (self.operator == '÷'){
            if (self.num_array[1] == "0"){
                self.display('Error');
            }
            else {
                self.result = parseFloat(self.num_array[0]) / parseFloat(self.num_array[1]);
            }
        }
        self.num_array=[self.result];
        self.index = 0;
        self.display(self.result);
        return self.result;
    };

    /********************** CLEAR ENTRY **********************/
    self.clear_entry = function(){
        self.num_array[self.index] = '';
        $('.display').html(" ");
        console.log(self.num_array, self.operator);
    };

    /********************** CLEAR ALL **********************/
    self.clear = function(){
        self.num_array = [''];
        self.operator = '';
        self.index = 0;
        $('.display').html("");
        console.log(self.num_array, self.operator);
    }
}

/********************** KEYBOARD PRESS **********************/
function keyboard_press(keyCode) {
    var key_chart = {
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

    if (key_chart[keyCode] != undefined) {
        return key_chart[keyCode];
    }
    else {
        return 'Invalid'
    }
}

$(document).ready(function() {
    /** Calculator instantiation **/
    var calc = new calc_constructor();

    /** Click handler **/
    $('button').click(function() {
        calc.button_pressed($(this).text());
    });

    /** Keyboard Input **/
    $(window).on('keypress', function(e) {
        calc.button_pressed(keyboard_press(e.keyCode));
    });

});

