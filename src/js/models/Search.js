import axios from "axios";
import {
    key,
    proxy
} from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    // read the query from the object itself
    async getResults() {


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