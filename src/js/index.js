import Search from './models/Search';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {

}

const controlSearch = async () => {
    // 1) Get query from the view
    const query = 'pizza' //TODO

    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query)

        // 3) Prepare UI for results

        // 4) Search for the recipe 
        /* getResults is an async function which returns a promise, therefore we have to await the promise */
        await state.search.getResults()

        // 5) Render results on the UI
        console.log(state.search.result)
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    // prevent the page from reloading
    e.preventDefault();
    controlSearch();
})