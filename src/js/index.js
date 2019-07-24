import Search from './models/Search';
import Recipe from './models/Recipe'
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {
    elements,
    renderLoader,
    clearLoader
} from './views/base';


/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {

}
/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
    // 1) Get query from the view
    const query = searchView.getInput()

    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);


        // 4) Search for the recipe 
        /* getResults is an async function which returns a promise, therefore we have to await the promise */
        try {
            await state.search.getResults();

            // 5) Render results on the UI
            clearLoader();
            searchView.renderResults(state.search.result);

        } catch (error) {
            alert('Something went wrong with the search');
            clearLoader();
        }

    }
}

elements.searchForm.addEventListener('submit', e => {
    // prevent the page from reloading
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    // only interested in classes with the 'btn-inline'
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        // retrieves the property that was setup in the createButton function's dataset
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
    // get the hash/id from the URL, replace  removes the #
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        // prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe)
        // create new recipe
        state.recipe = new Recipe(id);

        try {
            // get recipe data and parse ingredients
            await state.recipe.getRecipe();
            console.log(state.recipe.ingredients)
            state.recipe.parseIngredients();
            // calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            // render recipe
            clearLoader();
            recipeView.clearRecipe();
            recipeView.renderRecipe(state.recipe);

        } catch (error) {
            alert('Error processing recipe');
        }

    }
}

// global event listener
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe)

// put the two eventListeners into an array.
// loop over with forEach where each element is an event
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));