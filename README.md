# Version 0.5

<<<<<<< HEAD
## Version 1
#### Description
Version 1 takes the layout and basic button click functionality built in the 2 previous versions and then ties in the calculation functionality. This version works toward more OOP understandings
by taking the inputs from the calculator and inserting them into objects and then those objects into an array.


- <a href="https://github.com/Learning-Fuze/calculator/tree/v1#getting-started">Getting Started</a>
- <a href="https://github.com/Learning-Fuze/calculator/tree/v1#scope">View Scope</a>

## Version 0.5
#### Description
=======
## Description
>>>>>>> 7fe50a66e77993779d6041045bc9c081d4207110
Version 0.5 adds in user functionality without needing to write the underneath logic of a calculator. With the introduction
to the calculator object the user can interact with the object to receive the values after calculation has been completed.

## Getting Started
> - What branch do you have your latest changes on?
    - **I don't know** - talk with an instructor
    - **not master**
        - Create pull request form current branch to master
        - Merge pull request on master
        - Go to Pull Latest Changes
    - **master** - Go to Pull Latest Changes
> - Pull Latest Changes
        - `git checkout v0.1`
> - Create the new feature branch
    - `git checkout -b v0.5`
> - Work on the scope defined <a href="https://github.com/Learning-Fuze/calculator/tree/v.5#scope">Below</a>
> - Add files to git
    - `git add .`
> - Commit files (Group files together)
    - `git commit -m "calculator v0.5 - Your Name"`
    - **Replace "Your Name" with your first and last name**
> - Send to gitHub (Push)
    - `git push origin v0.5`
> - Create pull request
    - Pull request should be made from v0.5 to **your repository's/teams** master branch

<<<<<<< HEAD
- <a href="https://github.com/Learning-Fuze/calculator/tree/v0.5#getting-started">Getting Started</a>
- <a href="https://github.com/Learning-Fuze/calculator/tree/v0.5#scope">View Scope</a>
=======

## Scope
> - Take layout from finished v0.1 and implement the following:
    - Insert a link to the following javascript files
        - jQuery's latest version
        - http://Learning-Fuze.github.io/calculator/calculator.js
    - JS Functionality
        - Declare and define a function that takes in 3 parameters
            - **Parameters**
                - type - will be a string equal to one of the following
                    - "itemAdded"
                    - "calculated"
                    - "error"
                - value - either a string or a number
                - item - **Only use for advanced functionality** Object of different types
            - Take the value and display in the correct layout area within the DOM
                - The display of the calculation will be up to each students interpretation of how a calculator should look. **If you need ideas
                look at your calculator on your phone.**
        - Create a new global variable **my_calculator** with the value defined as `new calculator(newFunc)` where newFunc is equal to the referenced function defined above
        - Add click handlers to all buttons in the DOM, when called they do the following
            - Defines a variable **val** equal to the value of the button pressed.
                - **Example : ** if "=" button was pressed then the value of the variable above would be a string "=";
            - Insert the following into the click handler function `my_calculator.addItem(val)`. Once this is called the function that was passed into the calculator object above will be called with parameters dependant on the value of the variable val
>>>>>>> 7fe50a66e77993779d6041045bc9c081d4207110

## Example

<<<<<<< HEAD
- <a href="https://github.com/Learning-Fuze/calculator/tree/v0.1#getting-started">Getting Started</a>
- <a href="https://github.com/Learning-Fuze/calculator/tree/v0.1#scope">View Scope</a>
- <a href="https://github.com/Learning-Fuze/calculator/tree/v0.1#design">View Design</a>
- <a href="https://github.com/Learning-Fuze/calculator/tree/v0.1#assignments---aka-criteria-for-success-on-this-version-of-the-project">View Assignments</a>
=======
#### <a href="http://Learning-Fuze.github.io/calculator/" target="_blank">View Demo</a>

#### Code Example
```
<script>
        //callback function defined
        function callback(type, value, item) {
            switch (value) {
                case undefined:
                    $('#display_area').html("");
                    break;
                default:
                    $('#display_area').html(value);
                    break;
            }
        }
        // my_calculator - creates a new calculator object
        var my_calculator = new calculator(callback);
        //after DOM load add click handlers to all buttons
        $(document).ready(function () {
            $('button').on('click', function () {
                var val = $(this).text();
                switch (val) {
                    case 'AC':
                        my_calculator.allClear();
                        break;
                    default:
                        my_calculator.addItem($(this).text());
                        break;
                }
            });
        })
    </script>
    <style>
        #display_area {
            width: 300px;
            height: 30px;
            background-color: #cccccc;
            font-weight: bold;
        }
    </style>
</head>
<body>
<div id="display_area"></div>
<div id="buttonContainer">
    <div>
        <button>1</button>
    </div>
    <div>
        <button>2</button>
    </div>
    <div>
        <button>+</button>
    </div>
    <div>
        <button>=</button>
    </div>
    <div>
        <button>AC</button>
    </div>
</div>
</body>
```
>>>>>>> 7fe50a66e77993779d6041045bc9c081d4207110
