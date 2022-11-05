import axios from 'axios'

import {
    GET_PRODUCTS,
    PRODUCT_DETAIL,
    CLEAR_DETAIL,
    PRODUCT_UPDATE,
    POST_PRODUCT,
    SEARCH,
    GET_CATEGORIES,
    GET_BRANDS,
    GET_ADMINS,
    GET_USERS,
    GET_PROFILE,
    UPDATE_USER_ADM,
    POST_USER,
    GET_MESSAGES,
    POST_MESSAGE,
    ORDER_BY,
    OPEN_DETAIL,
    FILTER,
    RESET_FILTERS,
    LOGIN
} from './types'

import { logInWithEmailandPassword, logOut, CreateuserwithEandP } from '../firebase/auth'
// -------- Products ----------
export function getProducts() {
    return async function (dispatch) {
        const allData = await axios.get('/products')
        return dispatch({ type: GET_PRODUCTS, payload: allData.data })
    }
}

export function getProductDetail(id) {
    return async function (dispatch) {
        const productDetail = await axios.get(`/products/${id}`)
        return dispatch({
            type: PRODUCT_DETAIL,
            payload: productDetail.data,
        })
    }
}

export function getopenDetail(id) {
    return { type: OPEN_DETAIL, payload: id }
}

export function clearDetail() {
    return { type: CLEAR_DETAIL, payload: [] }
}

export function createProduct(payload) {
    console.log(payload)
    return async function (dispatch) {
        let json = await axios.post('/products', payload)
        console.log(json.data)
        return dispatch({
            type: POST_PRODUCT,
            payload: json.data,
        })
    }
}

export function updateProduct(id, payload) {
    // console.log('SOY EL ID: ', id, 'SOY EL PAYLOAD: ', payload)
    return async function (dispatch) {
        const json = await axios.put(`/products/${id}`, payload)
        return dispatch({ type: PRODUCT_UPDATE, payload: json.payload })
    }
}

export function search(query) {
    return async function (dispatch) {
        const results = await axios.get(`/products?name=${query}`)
        return dispatch({
            type: SEARCH,
            payload: { query: query, data: results.data },
        })
    }
}

export function getCategories() {
    return async function (dispatch) {
        const allData = await axios.get('/category')
        return dispatch({ type: GET_CATEGORIES, payload: allData.data })
    }
}

export function createCategories(payload) {
    return async function () {
        let json = await axios.post('/category', payload)
        return json
    }
}

export function getBrands() {
    return async function (dispatch) {
        const allData = await axios.get('/brand')
        return dispatch({ type: GET_BRANDS, payload: allData.data })
    }
}

export function createBrands(payload) {
    return async function () {
        let json = await axios.post('/brand', payload)
        return json
    }
}

// ------- Filtros y ordenamiento ---------

export function orderBy(order) {
    return function (dispatch) {
        dispatch({ type: ORDER_BY, payload: order })
    }
}

export function filter(fil) {
    return function (dispatch) {
        dispatch({ type: FILTER, payload: fil })
    }
}
export function resetFilter(fil) {
    return function (dispatch) {
        dispatch({ type: RESET_FILTERS, payload: fil })
    }
}

// ------- Users ---------

export function getAdmins() { // Obtener todos los Admins
    return async function (dispatch) {
        let json = await axios.get('/users/admins')
        return dispatch({
            type: GET_ADMINS,
            payload: json.data,
        })
    }
}

export function getUsers() { // Obtener todos los Users
    return async function (dispatch) {
        let json = await axios.get('/users')
        return dispatch({
            type: GET_USERS,
            payload: json.data,
        })
    }
}

export function getprofile(id) { // Visualizar perfil de un User
    return async function (dispatch) {
        let json = await axios.get(`/users/${id}`)
        return dispatch({
            type: GET_PROFILE,
            payload: json.data,
        })
    }
}

export function LogInAction(data) {
    return (dispatch) => {
     try {
         let userCredental = logInWithEmailandPassword(data)
         return dispatch({
             type: LOGIN,
             payload: userCredental
         })
     } catch (error) {
         throw new Error(error)
     }
    }
 }
 export function logOutAction() {
     return async(dispatch) => {
         try {
             await logOut()
             return dispatch({
                 type: LOGIN,
                 payload: {}
             })
         } catch (error) {
             throw new Error(error.code)
         }
     } 
 }
 
 export function SignUpwithPasswwordAndEmail(data) {
     return async(dispatch) =>{
         try {
             let  newUser = await CreateuserwithEandP(data)
             dispatch({
                 type: LOGIN,
                 payload: newUser
             })
 
         } catch (error) {
          throw new Error(error)   
         }
     }
 }

export function editUser(id, payload) { // Para que un User actualice su perfil

}

export function editUserAdmin(id, payload) { // Para que un admin actualice el perfil de un User
    return async function (dispatch) {
        let json = await axios.put(`/users/admin/${id}`, payload)
        return dispatch({
            type: UPDATE_USER_ADM,
            payload: json.data,
        })
    }
}

export function createUser(payload) { // Crear Usuario
    return async function (dispatch) {
        let json = await axios.post('/users/register', payload)
        return dispatch({
            type: POST_USER,
            payload: json,
        })
    }
}

// ------- Help Us Mail --------

export function getMessages() {
    // Obtener los mensajes de Help us to improve
    return async function (dispatch) {
        let json = await axios.get('/messages') // http://localhost:3001/messages
        return dispatch({
            type: GET_MESSAGES,
            payload: json.data,
        })
    }
}

export function createMessage(data) {
    //crear un mensaje en el buzón de HelpUsToImprove
    // console.log('SOY LA DATA DE LA ACTION: ', data)
    return async function (dispatch) {
        let response = await axios.post('/messages/send', data) // http://localhost:3001/messages/send
        return dispatch({
            type: POST_MESSAGE,
            payload: response,
        })
    }
}
