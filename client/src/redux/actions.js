import axios from 'axios';

import {
    GET_PRODUCTS,
    PRODUCT_DETAIL,
    PRODUCT_UPDATE,
    GET_CATEGORIES,
    GET_BRANDS
} from './types';

export function getProducts() {
    return async function (dispatch) {
        const allData = await axios.get('/products')
        return dispatch({ type: GET_PRODUCTS, payload: allData.data })
    }
};

export function getProductDetail(id) {
    return async function (dispatch) {
        const productDetail = await axios.get(`/products/${id}`)
        return dispatch({ type: PRODUCT_DETAIL, payload: productDetail.data })
    }
};

export function createProduct(payload) {
    return async function () {
        let json = await axios.post('/products', payload)
        return json;
    }
};

export function updateProduct(payload) {
    return async function (dispatch) {
        const update = await axios.put(`/products`, payload)
        return dispatch({ type: PRODUCT_UPDATE, payload: update.payload })
    }
};

export function getCategories() {
    return async function (dispatch) {
        const allData = await axios.get('/category')
        return dispatch({ type: GET_CATEGORIES, payload: allData.data })
    }
};

export function createCategories(payload) {
    return async function () {
        let json = await axios.post('/category', payload)
        return json;
    }
};

export function getBrands() {
    return async function (dispatch) {
        const allData = await axios.get('/brand')
        return dispatch({ type: GET_BRANDS, payload: allData.data })
    }
};

export function createBrands(payload) {
    return async function () {
        let json = await axios.post('/brand', payload)
        return json;
    }
};