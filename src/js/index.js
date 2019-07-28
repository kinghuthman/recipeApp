import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
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
const state = {}
window.state = state
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
        // highlight selected recipe
        if (state.search) searchView.highlightSelected(id)
        // create new recipe
        state.recipe = new Recipe(id);

        try {
            // get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            // calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            // render recipe
            clearLoader();
            recipeView.clearRecipe();
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));

        } catch (error) {
            console.log(error)
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

/**
 * LIST CONTROLLER
 */
const controlList = () => {
    // Create a new list IF there in none yet
    if (!state.list) state.list = new List();

    // Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // Handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.list.deleteItem(id);

        // Delete from UI
        listView.deleteItem(id);

        // Handle the count update
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        console.log(val)
        state.list.updateCount(id, val);
    }
});

/**
 * LIKE CONTROLLER
 */

const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id

    // User has not yet liked current recipe
    if (!state.likes.isLiked(currentID)) {
        // Add like to the state
        const newLike = state.likes.addLike(currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img)
        // Toggle the like button
        likesView.toggleLikeBtn(true);

        // Add like to UI list
        likesView.renderLike(newLike);


        // User has liked the current recipe
    } else {
        // Remove like from the state
        state.likes.deleteLike(currentID)
        // Toggle the like button
        likesView.toggleLikeBtn(false);

        // Remove like from UI list
        likesView.deleteLike(currentID);


    }
    likesView.toggleLikeMenu(state.likes.getNumLikes())
}

// Restore like recipes on page loads
window.addEventListener('load', () => {
    state.likes = new Likes();
    // Restore Likes
    state.likes.readStorage();

    // Toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like))
});


// handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    // matches used similarly to querySelector, * means any child
    // btn decrease or any child element
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
            // decrease button is clicked
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);

        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // Add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // Like Controller
        controlLike();
    }
});