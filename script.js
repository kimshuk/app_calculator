

function callback(type, value, item) {
    switch (value) {
        case undefined:
            $('#output').html("");
            break;
        default:
            $('#output').html(value);
            break;
    }
}

//OOP
var my_calculator = new calculator(callback);

$(document).ready(function(){

    $("button").on('click', function() {
        var val = $(this).text();
        console.log("btn clicked: ", val);

        switch (val) {
            case 'C':
                my_calculator.clear();
                break;
            case 'CE':
                my_calculator.allClear();
                break;
            default:
                console.log("what");
                my_calculator.addItem(val);
                break;
        }
    });
});


