# recipeApp

// development tools should be saved as devDependencies
// lowercase for file name, uppercase for models

---

---

BUILDING SEARCH CONTROLLER

---

Search model created, using a class, we create a new object each time we query a search. This class has a method called getResults which is an async/await function that returns a promise. This promise containts the data that we query.

As of now on our controller/index.js file we have our Search controller, our Search controller has an async function called controlSearch. This function will interact/update the UI and model simultaneously. It will retrieve the query from the view, then add the search object to the state. Following that the UI will be prepared for the result and we will search for the recipes using the getResults method from the search object that was added to the state. After the promise is returned the UI will then be updated with the result.

---

---

BUILDING SEARCH VIEW

---

Created base file to hold all dom elements.

getInput function retrieves the value that is entered into the search field and the result is now assigned to the query variable in the controlSearch function.

renderResults prints the results onto the UI.
It is better to have a function for each separate task, therefore created a function simply for printing a recipe to the UI.

renderRecipe prints each individual recipe by rendering the dynamic data from the api. The function contains a variable that contains the markup that will be printed. This markup needs to be rendered into the results list, therefore it's added to the elements object in our base file. The markup is a new recipe element and always want the new element to be placed at the end of the list. Using insertAdjacentHTML 'beforeend' each new recipe is rendered after the one previous to it as the forEach method in the renderResults method loops through the array of recipes.

Created two functions to clear the search input field and also the results when searching for new recipes.

Looking to clean up the title of a recipe. The limitRecipeTitle function uses an if statement to check if a title's character is over the limit. If so the title is put through a reduce function after being split into a subarray, once so, if the accumulator plus the length of the current word in the title is less than the limit, push the current word into the newTitle array. Then the accumulator is updated by adding the length of the current word to the current accumulator.
Once the statement is complete the newTitle is returned with ..., cleaning up the UI.

---

---

RENDER AJAX SPINNER

---

Created a renderLoader function in the base file. It consists of an html div that has spinner. Using the insertAdjacentHTML method, the spinner renders as a child element of a parent element that will be passed in to the renderLoader as an argument.

Needed to create a method to clear the spinner after the results have rendered to the page. To delete an element, have to go up the parentElement, and then back down again and remove the child.

---

---

IMPLEMENTING SEARCH RESULTS PAGINATION

---

FIRST STEP is to change the render results function, as that function is called whenever we search for a recipe. The render results function not only recieves recipes but will now receive the page that is going to be displayed and the amount of results per page. A slice method is called on recipes to extract a certain amount of results. (start, end)

SECOND STEP is to render these buttons actually on the interface. To properly do so, the page one is on and how many pages there actually are, is passed into the renderButtons function. To find out how many pages there are, divide the number of results by the results that are displayed per page. Use an if/else statement to decide what buttons to render depending on what page one is on.

The if/else statement would use duplicate code so created a function createButton that will only return the markup of the buttons that is needed. The markup contains dynamic data that will alter the buttons UI to match the results and what is expected from the user. Data is plugged into the button containing the number of the page where one wants to move whenever a button is clicked.

THIRD STEP will be to attach some event handlers to the buttons that will change the page and render results.
Data attributes will help figure out what pages to go to.

Event delegation will be needed as there isn't anywhere to attach the event listeners if the pagination buttons are not yet there when the page is loaded.
The concept is to attach the listener to an element that is already there, and then try to figure out where the event happened and then take action based on that.

class resultspages is the element that is already avaiable at load, and that is where the event handler is placed. Use the closest method to select the entire button instead of the icon or text within the button itself in order to trigger the event listener.

All that is left is to use the renderResults method in the controller and call it but specifying the page this time. Previous functions are also used to clearout the results.

---

---

BUILDING THE RECIPE MODEL

---

Each recipe is identified by an ID, and based on that ID, it is possible to make ajax calls to get the rest of the data for the recipe.

Made the ajax call using the getRecipe method within the Recipe object/class. The recipe class takes in an ID and then uses the getRecipe method to get that specific recipe. From there, all of the information about that recipe/id is returned as a promise. Then we can save whatever properties/information we need to the object, using the 'this' keyword.

Adding the cooking time and amount of servings methods to the Recipe model as well.

Assuming there needs to be 15 mins for every 3 ingredients. Calculate how many 15 minute periods there is. Number of ingredients divided by 3 and then rounded up to the highest integer = periods. The time is periods multiplied by 15.

---

---

BUILDING THE RECIPE CONTROLLER

---

Inside the URL, the hash symbol and whatever comes after is called the the hash. Can make use of the fact that the hashses change whenever a different recipe is clicked by using the hash change event in javascript.

Hash change event is fired off each time that the hash in the URL changes to something else.

Added an event listener to the global object using hashchange. The controlRecipe function gets the id using the .hash property on windows.location which is the entire URL.

Using an if statement within the recipe controller to render a recipe if there is an ID. When a new recipe object is created, want to store that in the state.
As we are retrieving data, await is used and therefore the controlRecipe is now an async function.

Adding an event listener to the load event which will fire whenever the page is loaded. Currently nothing happens when an id is selected and the page is refreshed. The recipe goes away. Since controlRecipe is used on this load eventlistener and hashchange, going to add the same event listener, to the same event. Used forEach over an array containing the eventListeners.

---

---

BUILDING THE RECIPE MODEL PT. 2

---

\*

Read through a list of ingredients, and in each ingredient, separate the quanitity, the unit and the description of each ingredient.

\*

1.) Make all units the same across all the recipes

- parseIngredients will create a new array based on the old ones

  - create two arrays, one array will have the units as they appear in the ingredients and the second array will be written exactly as they should be.

    - initialize the current element to a variable and pass it through a lowercase method
    - loop through the array which holds the units as they appear, compare each unit to the element from the map method method, if they match, replace the element with the unit from the array holding the units with how they should be written by using the index of the current unit.
    - Arrays must match for this to work!!

      2.) Remove the parenthesis

          - googled a regex pattern to match the parenthesis combination and replaced with empty strings

      3.) Parse ingredients into count, unit and ingredient

          - as the map method is being used, must return the Ingredient which is accessed by newIngredient
          - Must prepare for all cases, number unit text, only the number and just the ingredient text and no unit, and sometimes no unit or number.
          1. ) Check if there is a unit in the string, if so, where. Start by convert the ingredient into an array.
          2. ) Find the index at where the unit is located. Used two methods, findIndex and includes, includes returns true or false if the element(unit) within the array is also in the array of units of how they should be. If it returns true, findIndex will then return the index of that element that matches and assign it to the unitIndex variable. unitIndex will be -1 if there is no match
          3. ) IF else statement checking the cases mentioned earlier.
          Practiced using eval on one of the cases that has a unit and its count has multiple numbers. eval will evaluate the string that was created as javascript code and execute it. For the other case that the ingredient contains a dash between the numbers, then replace the - with a + in order for the string to be evaluated.

---

---

BUILDING THE RECIPE VIEW

---

Created a recipeView file, with a variable that holds the markup with dynamic data

Created a query selector for the recipe div container in the base file. This queryselector is used in the recipeview to insert the recipe markup after the beginning of the div.

One thing about the markup is there's no knowledge about how many ingredients there is beforehand, so in the markup we run a map function on recipe.ingredients. Each element is passed through another function called createdIngredient which will create the markup for that ingredient with dynamic data as an array, and we avert this by joining them with a string.

The renderRecipe function is good to test. Pass in to controlRecipe, clearLoader, then renderRecipe and pass in state.recipe. To prepare the UI for changes renderloader and make sure to pass in parent so loader knows where to display itself. clearLoader will handle the rest.

Need to clear the recipe from the recipe view after selecting another recipe from the searchview.
clearRecipe will apply empty strings to the element that holds the recipe class in the recipe view.
Added more units of measurement to a new units array making use of the spread operator.

---

Added a library 'fractional' to handle fractions for the ingredients. Able to input integers and receive the numerator, denominator, also capable of many other functionalities.

formatCount will take in the count (reference parseIngredient count) and return a formatted string. This will be used in the createIngredient function. Once count is split by the decimal, int is the number and dec is the # after the decimal. Convert to strings with map and pass the strings into parseInt to convert into a number
if else statement with a few conditions to make sure that the right fraction if needed is returned.

---

---

SEARCH VIEW / RECIPE CONTROLLER

---

highlightSelected in the searchView will highlight the recipe that has been selected in the search results.
Takes in an id, then in the function use document.querySelector as it is an element that isn't there when the page is loaded. Able to pretty much use css selectors inside of the template literal, now able to select any links based on attributes, what is needed is href.
Hardcoded the class name where the new class will be attached. When adding a class to the classlist, no need for a . selector. Also changed the color of the active background for the results list as it was hard to notice.
Had an issue where selecting one result woould highlight but so would every other result when clicked. Had to remove all classes before adding one in the results list.

---

---

Updating Recipe Servings

---

updateServings takes a type which is inc or dec. Used a ternary expression to update newServings. ingredient count is updated by calling a forEach method on the ingredients and then updating the count with the newServings equation.

Eventlistener added for the buttons. Element is already there at load time. This element has several other elements that cannot be misrepresented by this event listener and therefore .matches() will be used to properly select the correct class. If statement used to differentiate between the two types. Once model is updated then the view is with updateServingsIngredients(recipe)
updateServingsIngredients(recipe) takes in recipe from the state and plugs in the new data.

Able to update the data model with the new servings and ingredients.
Updating the view as well.

---

---

SHOPPING LIST MODEL

---

Want to represent the shopping list through an object, so used a class. Will be used as a blueprint to generate the list object in the controller.

All items will be added to an array.

Method addItem will take in the same input as an ingredient, since the list is a list of ingredients. They have the same structure.
Each of the items need to have a unique id so they can be identified later when it is time to update them. Will use an external package called uniqueID.

Blueprint will also have the ability to delete an item. method will receive the id of the item that needs to be deleted.

updateCount will update the count and use a es6 method find. find() will loop through all the elements in the items and then select the one that has the ID equal to the ID that we passed into the function.

---

---

SHOPPING LIST VIEW

---

Two methods, one to render the item and the other to delete the item from the UI.

Create markup variable within render function.
queryselect dom element that will render shopping list within base file.

Specify a data attribute equal to the id so that later elements can be selected based on the data attribute/id.

item.count will be applied for step as that is the change that happens when the arrow buttons in the number field is clicked.

Added a class so that the input can be selected and that value can be read for the newCount

Insert the markup using insertAdjacentHTML after each child within the parent so used beforeend

DELETE METHOD

The delete method, able to select the element by id as the id was attached within the markup thanks to the data attribute.

In order to remove that element with that id. Must go up to the parentElement then back down to the child removeChild(item)

---

---

SHOPPING LIST CONTROLLER

---

Added the add keyword to the recipe btn class, as this will be the class for the button that adds all the ingredients.
Need the event delegation, as all of the elements that need to be selected are not done by the time the page loads.

Added to the if else statement that handles recipe buttons, used the \* css selector for all of the child elements of an element for a button as it may have other elements inside of it when clicked and might not trigger the event.listener andneeds to be catched on the button itself. Will call the controlList function once the event is triggered.

For the controlList, the list controller.. The function will have an if else statement to produce the list as warranted.
For the step to add each ingredient to the list, step.recipe.ingredients is an array, going to loop over the array and then add a new element to the list. addItem method returns an item that will be stored in an item variable. Able to input this item into the renderItem method created in the listView.

Event delegation for the buttons in the shopping list in order to delete and update the count.
First thing is to try and read the ID of the element that has been clicked. Do this by using the method 'closest' on an event's target, in order to find the closest element with the shoppingitem class on it.
Then able to use dataset to grab the id, looking for the name that was given to attribute using dot notation.

To delete an item, using matches method to find if the target is similar to shoppingdelete or any of its child elements.
Going to delete it from state, using the deleteItem method on the list class and will also pass in the id that was obtained through the dataset.
Using an if statement to handle the delete button,

Added an else if to match the shopping count value to update the count in the state. It will read the data from the interface and update the count.

---

---

LIKE MODEL

---

this.likes will be an empty array
Added an addlike method that takes in sevaral properties.
Added a deleteLike method
Added an isLiked method that tests if the recipe has been liked by checking the array of recipes with the id of the recipe currently being viewed. This is done similar to the delete method, but will check if the index is different from -1. -1 means there array does not contain that id/recipe.

---

---

LIKES CONTROLLER

---

Added event listener for the likes button

controlLike is our controller for the likes. Using an if else statement to manage like a button and unliking a button.
If a user has not liked anything then a likes object will be created prior to the toggling of the likes button.
In order to add a like to the state must call addLike function and pass in several arguments that are retrieved from the state.

---

---

LIKES VIEW

---

Created a function to toggle the like button
Used setAttribute to change element class of button when toggled.
Currently have an error where isLiked is not defined as cannot read likes whenever the page is reloaded since there is no persitent data.
Made a new likes object prior to calling the likes controller in order to test the isLiked function

toggleLikesMenu takes in getNumofLikes to see if it should display the likes narkup created in the likesView. This is functional with the working of a ternary expression.

renderLike is markup that renders dynamic data with html

---

---
