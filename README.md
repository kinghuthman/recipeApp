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

---

---
