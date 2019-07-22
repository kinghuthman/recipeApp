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
