import axios from 'axios';
import { PRODUCT_SERVER } from '../components/utils/misc';
import { 
    GET_PRODUCTS_BY_ARRIVAL,
    GET_PRODUCTS_BY_SELL
} from './type';

export function getProductsByArrival(){
// By Arrival
// /articles?sortBy=createdAt&order=desc&limit=4
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
                    .then(response => response.data);

    return {
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: request
    }
}

export function getProductsBySell(){
// By SALE
// /api/product/articles?sortBy=createdAt&order=desc&limit=4
// /api/product/articles?sortBy=sold&order=desc&limit=100&skip=5
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
                    .then(response => response.data);

    return {
        type: GET_PRODUCTS_BY_SELL,
        payload: request
    }
    
}