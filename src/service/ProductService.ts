import axios from "axios";
import {AxiosInstance} from "axios";

export class ProductService {

    // base_url: string | undefined = process.env.REACT_APP_API_PATH;
    base_url: string | undefined = "http://localhost:8090";
    service: AxiosInstance;

    constructor() {
        let service: AxiosInstance = axios.create({
            baseURL: this.base_url
        });
        this.service = service;
    }

    getProductList() {
        let url = this.base_url + "/api/v1/product";
        return axios.get(url);
    }

    getProductGrid(productId : number) {
        let url = this.base_url + "/api/v1/product/"+productId;
        return axios.get(url);
    }

    productCal(productId : number , count : number) {
        let url = this.base_url + "/api/v1/product/calculator/"+productId+"?qty="+count;
        return axios.get(url);
    }
}

export default new ProductService();
