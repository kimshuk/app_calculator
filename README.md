# Version 0.5

## Description
Version 1 takes the layout and basic button click functionality built in the 2 previous versions and then ties in the calculation functionality. This version works toward more OOP understandings
by taking the inputs from the calculator and inserting them into objects and then those objects into an array.

## Getting Started
> - What branch do you have your latest changes on?
    - **I don't know** - talk with an instructor
    - **not master**
        - Create pull request form current branch to master
        - Merge pull request on master
        - Go to Pull Latest Changes
    - **master** - Go to Pull Latest Changes
> - Pull Latest Changes
        - `git checkout master`
        - `git pull origin master`
> - Create the new feature branch
    - `git checkout -b v1`
> - Work on the scope defined <a href="https://github.com/Learning-Fuze/calculator/tree/v1#scope">Below</a>
> - Add files to git
    - `git add .`
> - Commit files (Group files together)
    - `git commit -m "calculator v1 - Your Name"`
    - **Replace "Your Name" with your first and last name**
> - Send to gitHub (Push)
    - `git push origin v1`
> - Create pull request
    - Pull request should be made from v1 to **your repository's/teams** master branch


## Scope
> - JS Functionality
    - Add values from the buttons clicked into plain object that has the following properties
        - type - equal to one of these types "number","operator","equalSign"
        - value - equal to the value of the button
    - Add object into an global array variable
    - Process calculation based on objects in array
> - Calculator Logic Examples with outputted values found <a href="https://docs.google.com/spreadsheets/d/1HRpRqdyQrax5vgwrVatcOxSxly6GHXXfZuzc0lb9Tfg/pubhtml#">here</a>
