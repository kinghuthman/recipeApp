export default class Likes {
    constructor() {
        this.likes = [];
    }
    addLike(id, title, author, img) {
        const like = {
            id,
            title,
            author,
            img
        };
        this.likes.push(like);

        // Persist data in localStorage
        this.persistData();

        return like;
    }
    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);

        // Persist data in localStorage
        this.persistData();
    }
    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }
    getNumLikes() {
        return this.likes.length;
    }
    persistData() {
        // going to call the item being set likes, can save strings, going to convert that array into a string
        localStorage.setItem('likes', JSON.stringify(this.likes))
    }
    readStorage() {
        // json.parse lives inside a json object
        // will return null if there's nothing there
        const storage = JSON.parse(localStorage.getItem('likes'))
        // restore likes from the local storage
        if (storage) this.likes = storage;
    }
}