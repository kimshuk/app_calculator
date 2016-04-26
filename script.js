
var first_number_entered = null;
var second_number_entered = null;
var canClick = false;
var FKeyPad = document.keypad;

function calculator (user_digit_input) {
    if (canClick) {
        FKeyPad.ReadOut.value = user_digit_input;
        canClick = false;
        return;
    } else {
        if (FKeyPad.ReadOut.value == "0") {
            FKeyPad.ReadOut.value = user_digit_input;
        } else {
            FKeyPad.ReadOut.value += user_digit_input;

        }
    }


}

function button_pressed () {
    $("button").click(function() {
        $(this).text();

    });
}

$(document).ready(function(){

    $("button").click(function() {
        $(this).text();

    });

});


