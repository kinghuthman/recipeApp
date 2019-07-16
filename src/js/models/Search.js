import axios from "axios";

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = 'c8a3f1f90f90b51208e6cf952a644db1'

        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`)
            // console.log(res)
            this.result = res.data.recipes;
            // console.log(this.result)
        } catch (error) {
            alert(error)
        }
    }
}