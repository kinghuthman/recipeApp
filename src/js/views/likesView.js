import {
    elements
} from './base';
import {
    limitRecipeTitle
} from './searchView'
export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    // select the element where the icon is located then set the href attribute
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`)
    // icons.svg#icon-heart-outlined
};

export const toggleLikeMenu = numLikes => {
    // based on the number of likes will show the like menu
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
}

export const renderLike = like => {
    const markup = `
            <li>
                <a class="likes__link" href="#${like.id}">
                    <figure class="likes__fig">
                        <img src="${like.img}" alt="${like.title}">
                    </figure>
                    <div class="likes__data">
                        <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                        <p class="likes__author">${like.author}</p>
                    </div>
                </a>
            </li>
    `;
    elements.likesList.insertAdjacentHTML('beforeend', markup)
}

export const deleteLike = id => {
    // don't want to select all of the links just the one with the likes link class
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    //selecting the parent element as that includes the entire element and not just what's in it.
    // go up to parent, then remove child 
    if (el) el.parentElement.removeChild(el)
}