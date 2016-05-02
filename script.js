var numArray = [];
var numObj = {};
var multiDigit = "";
// var operator = "";
var index = 0;
MAXLENGTH = 15;

//function to input numbers on display section
function display (dig) {
    //check if the user input is too long
    if (multiDigit.length >= MAXLENGTH) {
        multiDigit = "Please put less than 15 digits";
    } else if ( multiDigit == "0") {
        multiDigit = dig;
    } else {
        multiDigit += dig;
    }
    $('#output').html(multiDigit);     //display the input on the screen
}

//function for C and CE
function clear() {
    multiDigit = 0;
    numObj = {};
    $('#output').html(multiDigit);
}

function allClear() {
    multiDigit = 0;
    numArray = [];
    $('#output').html(multiDigit);
}

//function for decimal point
function dec() {
    if (multiDigit.length == 0) {
        multiDigit = "0.";
    } else {
        if (multiDigit.indexOf(".") == -1) {
            multiDigit += ".";
        }
    }
    $('#output').html(multiDigit);
}


//function to respond operators (+, -, /, *)
function operate(op) {
    numObj = {      //put value into object's key
        value: parseFloat(multiDigit),
        type: op
    };
    numArray.push(numObj);
    multiDigit = "";
    $('#output').html(operator);     //display the input operator on the screen
}
//function to calculate (press "=")
function calculate() {
    var result = 0;

    numObj = {
        value: parseFloat(multiDigit)
    };
    numArray.push(numObj);

    for(var i=0; i<numArray.length - 1; i++) {
        switch (numArray[i].type) {
            case "*":      //find if user entered is "*"
                result = parseFloat(numArray[i].value) * parseFloat(numArray[i + 1].value);
                break;
            case "/":     //find if user entered is "/"
                if (numArray[i+1].value == 0) {
                    result = "error";
                } else {
                    result = parseFloat(numArray[i].value) / parseFloat(numArray[i + 1].value);
                }
                break;
            case "+":       //find if user entered is "+"
                result = parseFloat(numArray[i].value) + parseFloat(numArray[i + 1].value);
                break;
            case "-":      //find if user entered is "-"
                result = parseFloat(numArray[i].value) - parseFloat(numArray[i + 1].value);
                break;
            default:
                console.log("what is this?");       //foolproof message: throws an error message on console
                break;
        }
        numArray[i+1].value = result;
    }
    multiDigit = numArray[numArray.length - 1].value;
    numArray = [];
    $('#output').html(result);
}

$(document).ready(function(){

    $("button").on('click', function() {
        var val = $(this).text();
        console.log("btn clicked: ", val);

        if ((val == "-") || (val == "/") || (val == "+") || (val == "*")) {
            operate(val);
        } else if (val == "=") {
            calculate();
        } else if (val == "C") {
            clear();
        } else if (val == "CE") {
            allClear();
        } else  if (val != NaN) {
            display(val);
        } else if (val = ".") {
            dec();
        }
    });
});


