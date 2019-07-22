import Search from './models/Search';
import Recipe from './models/Recipe'
import * as searchView from './views/searchView';
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
    console.log(query)

    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);


        // 4) Search for the recipe 
        /* getResults is an async function which returns a promise, therefore we have to await the promise */
        await state.search.getResults();

        // 5) Render results on the UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    // prevent the page from reloading
    e.preventDefault();
    controlSearch();
})

elements.searchResPages.addEventListener('click', e => {
    // only interested in classes with the 'btn-inline'
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        // retrieves the property that was setup in the createButton function's dataset
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
})

/**
 * RECIPE CONTROLLER
 */
const r = new Recipe(46956);
r.getRecipe()
console.log(r)