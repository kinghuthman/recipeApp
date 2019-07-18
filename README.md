# recipeApp

// development tools should be saved as devDependencies
// lowercase for file name, uppercase for models

---

---

BUILDING SEARCH CONTROLLER

---

Search model created, using a class, we create a new object each time we query a search. This class has a method called getResults which is an async/await function that returns a promise. This promise containts the data that we query.

As of now on our controller/index.js file we have our Search controller, our Search controller has an async function called controlSearch. This function will interact/update the UI and model simultaneously. It will retrieve the query from the view, then add the search object to the state. Following that the UI will be prepared for the result and we will search for the recipes using the getResults method from the search object that was added to the state. After the promise is returned the UI will then be updated with the result.
