var memory = "0";
var current = "0";
var operation = 0;
var MAXLENGTH = 10;

//function to input numbers on display section
function display (dig) {
    //check if the digit is too long
    if (current.length > MAXLENGTH) {
        current = "Please have digits shorter than 10 digits";
        //check if prev num is 0, if yes, replace with current input
    } else if ( (eval(current) == 0)) {
        current = dig;
    } else {        //if prev num is not 0, then add to prev
        current += dig;
    };
    $('#output').html(current);
}

//function for C and CE
function clear() {
    current = "0";
    $('#output').html(current);
}

function allClear() {
    current = "0";
    memory = "0";
    operation = 0;
    $('#output').html(current);
}

//function to respond operators (+, -, /, *)
function operate(op) {
    switch (op) {
        case (op.indexOf("&times;") == 1):
            operation = 1;
            break;
        case (op.indexOf("&divide;") == 1):
            operation = 2;
            break;
        case (op.indexOf("&plus;") == 1):
            operation = 3;
            break;
        case (op.indexOf("&minus;") == 1):
            operation = 4;
            break;
        default:
            console.log("what is this?");
            break;
    }
}

//function to calculate (press "=")
function calculate() {
    switch (operation) {
        case 1:
            current = eval(memory) * eval(current);
            break;
        case 2:
            if (current == 0) {
                current = "Cannot divide by 0";
            } else {
                current = eval(memory) / eval(current);
            }
            break;
        case 3:
            current = eval(memory) + eval(current);
            break;
        case 4:
            current = eval(memory) - eval(current);
            break;
        default:
            console.log("something wrong");
            break;
    }
}

$(document).ready(function(){

    $("button").on('click', function() {
        var val = $(this).text();
        console.log("btn clicked: ", val);

        switch (val) {
            case ('&minus;' || '&plus;' || '&divide;' || '&times;'):
                operate(val);
                break;
            case "=":
                calculate();
                break;
            case 'C':
                clear();
                break;
            case 'CE':
                allClear();
                break;
            default:
                display(val);
                break;
        }
    });
});

