import uniqid from 'uniqid';

export default class List {
    // don't need anything to pass into constructor when initializing a new list
    constructor() {
        // will take all items
        this.items = [];
    }
    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }
    deleteItem(id) {
        // based on the id want to find the position of the item that matches id
        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index, 1);
    }
    updateCount(id, newCount) {
        // find returns the element itself
        // count of item = newCount
        this.items.find(el => el.id === id).count = newCount;
    }
}