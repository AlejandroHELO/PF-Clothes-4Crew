import axios from 'axios';

import {
    GET_PRODUCTS,
    PRODUCT_DETAIL,
    CLEAR_DETAIL,
    PRODUCT_UPDATE,
    SEARCH,
    GET_CATEGORIES,
    GET_BRANDS,
    GET_ADMINS,
    GET_USERS,
    GET_PROFILE,
    UPDATE_USER_ADM,
    GET_MESSAGES,
    POST_MESSAGE,
    ORDER_BY,
    FILTER,
} from './types';

// -------- Products ----------
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

export function clearDetail() {
    return {type: CLEAR_DETAIL, payload: []}
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

export function search(query) {
    return async function (dispatch) {
        const results = await axios.get(`/products?name=${query}`)
        console.log(query, results.data)
        return dispatch({ type: SEARCH, payload: results.data })
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
export function orderBy(order) {
    return function (dispatch) {
      dispatch({ type: ORDER_BY, payload: order });
    };
  }
export function filter(order) {
    return function (dispatch) {
      dispatch({ type: FILTER, payload: order });
    };
  }

// ------- Users ---------

export function getAdmins (){   // Obtener todos los Admins
    return async function(dispatch){
        let json = await axios.get("/users/admins");
        return dispatch({
            type: GET_ADMINS,
            payload: json.data
        })
    }
};

export function getUsers (){ // Obtener todos los Users
    return async function (dispatch){
        let json = await axios.get("/users");
        return dispatch({
            type: GET_USERS,
            payload: json.data
        })
    }
};

export function getprofile (id){ // Visualizar perfil de un User
    return async function (dispatch){
        let json = await axios.get(`/users/${id}`);
        return dispatch({
            type: GET_PROFILE,
            payload: json.data
        })
    }
};

export function editUser (id, payload){ // Para que un User actualice su perfil
    
};

export function editUserAdmin (id, payload){ // Para que un admin actualice el perfil de un User
    return async function (dispatch){
        let json = await axios.put(`/users/admin/${id}`, payload);
        return dispatch({
            type: UPDATE_USER_ADM,
            payload: json.data
        })
    }
};


// ------- Help Us Mail --------

export function getMessages(){ // Obtener los mensajes de Help us to improve
    return async function (dispatch){
        let json = await axios.get("/messages"); // http://localhost:3001/messages
        return dispatch({
            type: GET_MESSAGES,
            payload: json.data
        })
    }
};

export function createMessage(data){ //crear un mensaje en el buzón de HelpUsToImprove
    // console.log('SOY LA DATA DE LA ACTION: ', data)
    return async function (dispatch){
        let response = await axios.post("/messages/send", data); // http://localhost:3001/messages/send
        return dispatch({
            type: POST_MESSAGE,
            payload: response
        })
    }
};