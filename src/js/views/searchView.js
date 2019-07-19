import {
    elements
} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};


export const clearResults = () => {
    elements.searchResList.innerHTML = '';
};

// recieve a recieve a recipe and the maximum length of the title
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        // return the results
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt=${recipe.title}>
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
        `;
    // always want new element to be placed at the end of the list
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// receives page so it can print the number of the page to the interface
// type is forward or previous button
// all we want to do from this function is to return the markup 
// html5 data attributes is used to store the page referenced as a property and accessed by an event listener 
const createButton = (page, type) => `
                    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
                        <svg class="search__icon">
                            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                        </svg>
                        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
                    </button>`

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if (page === 1 && pages > 1) {
        // Button to go to next page
        button = createButton(page, 'next')
    } else if (page < pages) {
        // Both buttons
        button = `${createButton(page, 'prev')}
        ${createButton(page, 'next')}`

    } else if (page === pages && pages > 1) {
        // Only button to go to prev page
        button = createButton(page, 'prev')
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', button)
};

// loops through the array of results and calls the renderRecipe on each recipe
// implemented a pagination system
export const renderResults = (recipes, page = 2, resultsPerPage = 10) => {
    // render results of current page
    const start = (page - 1) * resultsPerPage;
    const end = page * resultsPerPage;

    // need to loop through the array of recipes to print to the UI
    // slice will take the first 10 results
    recipes.slice(start, end).forEach(renderRecipe);

    // render pagination
    renderButtons(page, recipes.length, resultsPerPage)
};