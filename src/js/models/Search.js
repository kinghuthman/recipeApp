import axios from "axios";

export default class Search {
    constructor(query) {
        this.query = query;
    }
    // read the query from the object itself
    async getResults() {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = 'c8a3f1f90f90b51208e6cf952a644db1'

        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`)
            // console.log(res)
            // save the recipes in the object
            this.result = res.data.recipes;
            // console.log(this.result)
        } catch (error) {
            alert(error)
        }
    }
}