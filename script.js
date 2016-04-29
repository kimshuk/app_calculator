var numArray = ['',''];
var memory = "0";
var current = "0";
var operator = "";
var index = 0;
MAXLENGTH = 15;

//function to input numbers on display section
//LF START
function display (dig) {
    //check if the user input is too long
    if (numArray[index].length > MAXLENGTH) {
        numArray[index] = "Please have digits shorter than 15 digits";      //notify to have input shorter than 10
        //check if prev input is 0, if yes, replace it with next input
    } else if (numArray[index] == 0) {
        numArray[index] = dig;
    } else {
        numArray[index] += dig;
    }
    $('#output').html(numArray[index]);     //display the input on the screen
}
//LF END
// function fixInput() {
//     current = "" + parseFloat($('#output').html());
//     if (current.indexOf("NaN") != -1) {
//         current = "I don't understand your input";
//     }
//     $("#output").html(current);
// }

//function for C and CE
function clear() {
    index = 0;
    numArray[1] = 0;
    $('#output').html(numArray[index]);
}

function allClear() {
    index = 0;
    numArray[0] = 0;
    numArray[1] = 0;
    $('#output').html(current);
}

//function to respond operators (+, -, /, *)
//LF START
function operate(op) {
    operator = op;
    $('#output').html(operator);     //display the input operator on the screen
    index++;
}
//LF END
//function to calculate (press "=")
function calculate() {
    var result = 0;
    switch (operator) {
        case "*":      //find if user entered is "*"
            result = parseInt(numArray[0]) * parseInt(numArray[1]);
            break;
        case "/":     //find if user entered is "/"
            result = parseInt(numArray[0]) / parseInt(numArray[1]);
            break;
        case "+":       //find if user entered is "+"
            result = parseInt(numArray[0]) + parseInt(numArray[1]);
            break;
        case "-":      //find if user entered is "-"
            result = parseInt(numArray[0]) - parseInt(numArray[1]);
            break;
        default:
            console.log("what is this?");       //foolproof message: throws an error message on console
            break;
    }
    numArray[0] = 0;
    numArray[1] = 0;
    $('#output').html(result);
}

$(document).ready(function(){

    $("button").on('click', function() {
        var val = $(this).text();
        console.log("btn clicked: ", val);

        switch (val) {
            case "-":
            case "/":
            case "*":
            case "+":
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


