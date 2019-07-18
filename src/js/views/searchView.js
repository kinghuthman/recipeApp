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

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt=${recipe.title}>
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
        `;
    // always want new element to be placed at the end of the list
    elements.searchResList.insertAdjacentHTML('beforeend', markup)
};

// loops through the array of results and calls the renderRecipe on each
export const renderResults = recipes => {
    // need to loop through the array of recipes to print
    recipes.forEach(renderRecipe);
};