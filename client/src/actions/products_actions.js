import axios from 'axios';
import { PRODUCT_SERVER } from '../components/utils/misc';
import { 
    GET_PRODUCTS_BY_ARRIVAL,
    GET_PRODUCTS_BY_SELL,
    GET_BRANDS,
    ADD_BRANDS,
    GET_WOODS,
    ADD_WOODS,
    GET_PRODUCTS_TO_SHOP,
    ADD_PRODUCT,
    CLEAR_PRODUCT,
    GET_PRODUCTS_DETAIL,
    CLEAR_PRODUCTS_DETAIL
} from './type';


export function getProductDetail(id){
    const request = axios.get(`${PRODUCT_SERVER}/article_by_id?id=${id}&type=single`)
                    .then(response => { 
                        return response.data[0]
                    });
    return {
        type: GET_PRODUCTS_DETAIL,
        payload: request

    }
}

export function clearProductDetail(){
    return {
        type: CLEAR_PRODUCTS_DETAIL,
        payload: ''
    }
}


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

export function getProductsToShop(skip, limit, filters=[], previousState=[]){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${PRODUCT_SERVER}/shop`, data)
                    .then(response => {
                        let newState = [
                            ...previousState,
                            ...response.data.articles
                        ];

                        return {
                            size: response.data.size,
                            articles: newState
                        }
                    });
    return {
        type: GET_PRODUCTS_TO_SHOP,
        payload: request
    }

}

export function addProduct(dataToSubmit){
    const request = axios.post(`${PRODUCT_SERVER}/article`, dataToSubmit)
                    .then(response => response.data);
    return {
        type: ADD_PRODUCT,
        payload: request
    }
}

export function clearProduct(){
    return {
        type: CLEAR_PRODUCT,
        payload: ''
    }
}

/////////////////////////////
//////    Categories
/////////////////////////////

export function getBrands(){

    const request = axios.get(`${PRODUCT_SERVER}/brands`)
                    .then(response => response.data );

    return {
        type: GET_BRANDS,
        payload: request
    }
}

export function addBrand(dataToSubmit, existingBrands){

    const request = axios.post(`${PRODUCT_SERVER}/brand`,dataToSubmit)
                    .then(response => {
                        // catch error such as server's down
                        let brands = [
                            ...existingBrands,
                            response.data.brand
                        ];
                        return {
                            success: response.data.success,
                            brands
                        }
                    });
    return {
        type: ADD_BRANDS,
        payload: request
    }
}


/////////////////////////////
//////    Woods
/////////////////////////////

export function getWoods(){
    
    const request = axios.get(`${PRODUCT_SERVER}/woods`)
    .then(response => response.data );

    return {
    type: GET_WOODS,
    payload: request
    }
}

export function addWood(dataToSubmit, existingWoods){

    const request = axios.post(`${PRODUCT_SERVER}/wood`,dataToSubmit)
                    .then(response => {
                        // catch error such as server's down
                        let woods = [
                            ...existingWoods,
                            response.data.wood
                        ];
                        return {
                            success: response.data.success,
                            woods
                        }
                    });
    return {
        type: ADD_WOODS,
        payload: request
    }
}