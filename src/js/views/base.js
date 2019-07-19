// contains all of the elements selected from the DOM

export const elements = {
    searchInput: document.querySelector('.search__field'),
    searchForm: document.querySelector('.search'),
    searchResList: document.querySelector('.results__list'),
    searchRes: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages')
};

export const elementStrings = {
    loader: 'loader'
};

// passing the parent element to attach the loader as a child element of the parent
export const renderLoader = parent => {
    const loader = `
        <div class ="loader">
            <svg>
                <use href= "img/icons.svg#icon-cw"-></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    // up to the parent element then remove the child
    if (loader) loader.parentElement.removeChild(loader);
};