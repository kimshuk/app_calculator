var memory = "0";
var current = "0";
var operation = 0;
MAXLENGTH = 15;

//function to input numbers on display section
//LF START
function display (dig) {
    //check if the user input is too long
    if (current.length > MAXLENGTH) {
        current = "Please have digits shorter than 10 digits";      //notify to have input shorter than 10
        //check if prev input is 0, if yes, replace it with next input
    } else if ( (eval(current) == 0)) {     //if input on screen is 0, replace it with next input
        current = dig;
    } else {        //if prev input on the screen is not 0, then add to prev
        current += dig;
    }
    $('#output').html(current);     //display the input on the screen
}
//LF END
function fixInput() {
    current = "" + parseFloat($('#output').html());
    if (current.indexOf("NaN") != -1) {
        current = "I don't understand your input";
    }
    $("#output").html(current);
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
//LF START
function operate(op) {
    switch (op) {
        case (op.indexOf("&times;") >= 0):      //find if user entered is "*"
            operation = 1;                      //mark it as 1
            break;
        case (op.indexOf("&divide;") >= 0):     //find if user entered is "/"
            operation = 2;                      //mark it as 2
            break;
        case (op.indexOf("&plus;") >= 0):       //find if user entered is "+"
            operation = 3;                      //mark it as 3
            break;
        case (op.indexOf("&minus;") >= 0):      //find if user entered is "-"
            operation = 4;                      //mark it as 4
            break;
        default:
            console.log("what is this?");       //foolproof message: throws an error message on console
            break;
    }
    memory = current;   //store current value to memory
    current = "";       //reset current value
    $('#output').html(current);     //display the input operator on the screen
}
//LF END
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
    operation = 0;      //after calculation, reset operation to 0
    memory = "0";       //after calculation, reset num stored in memory to 0
    current = current + "";     //forces num stored in current to string
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
                // fixInput();
                break;
        }
    });
});


