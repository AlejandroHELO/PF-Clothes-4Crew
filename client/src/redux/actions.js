import axios from 'axios'

import {
    GET_USERSADDRESS,
    POST_ADDRESS,
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
    LOGIN,
    VIEW_CART,
    ADD_TO_CART,
    DELETE_FROM_CART,
    CART_EMPTY,

    GET_CART,
    BRAND_ELECT

    GET_CARTDB,

    CREATE_P_REVIEW

} from './types'

// <<<<<<< HEAD
// import { logInWithEmailandPassword, logOut, CreateuserwithEandP } from '../firebase/auth'
// =======

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

export function createProductReview(payload){
    return async function(dispatch){
        let json = await axios.post('/products/reviews', payload)
        return dispatch({
            type: CREATE_P_REVIEW,
            payload: json.data
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


//si hago el filtro en el front 
export function search(query) {
    return {
        type: SEARCH,
        payload: query,
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
    return({ type: ORDER_BY, payload: order })
    
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

export function brandElect(brand) {
    return function (dispatch) {
        dispatch({ type: BRAND_ELECT, payload: brand })
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

export function getUsersAddress(id) { // Obtener todos los Users
    return async function (dispatch) {
        let json = await axios.get('/address?id='+id)
        return dispatch({
            type: GET_USERSADDRESS,
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

// <<<<<<< HEAD
//      try {
//          let userCredental = logInWithEmailandPassword(data)
//          return dispatch({
//              type: LOGIN,
//              payload: userCredental
//          })
//      } catch (error) {
//          throw new Error(error)
//      }
//     }
//  }
//  export function logOutAction() {
//      return async(dispatch) => {
//          try {
//              await logOut()
//              return dispatch({
//                  type: LOGIN,
//                  payload: {}
//              })
//          } catch (error) {
//              throw new Error(error.code)
//          }
//      } 
//  }
 
//  export function SignUpwithPasswwordAndEmail(data) {
//      return async(dispatch) =>{
//          try {
//              let  newUser = await CreateuserwithEandP(data)
//              dispatch({
//                  type: LOGIN,
//                  payload: newUser
//              })
 
//          } catch (error) {
//           throw new Error(error)   
//          }
//      }
//  }

// export function editUser(id, payload) { // Para que un User actualice su perfil

// }

// =======
return (dispatch) => {
        try {

            return dispatch({
                type: LOGIN,
                payload: "userCredental"
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}
export function logOutAction() {
    return async (dispatch) => {
        try {

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
    return async (dispatch) => {
        try {


            dispatch({
                type: LOGIN,
                payload: "newUser"
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
// ------- Cart --------

export function getViewCart(viewCart) {
    return {
        type: VIEW_CART,
        payload: viewCart,
    }
}

export const addToCart = product => async dispatch => {
    //si el carrito ya existe en el almacenamiento local, utilícelo; de lo contrario, configúrelo en una matriz vacía
    const cart = localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : [];
    console.log('product//////////////en actions addToCart///', product)
    // comprobar si se duplica
    const duplicates = cart.filter(cartItem => cartItem.id === product.id);
    // si no hay duplicados, proceda
    if (duplicates.length === 0) {
        // preparar los datos del producto
        const productToAdd = {
            ...product,
            count: 1,
        };
        // agregar datos del producto al carrito
        cart.push(productToAdd);
        // agregar carro al local storage
        localStorage.setItem('cart', JSON.stringify(cart));
        // agregar carro a redux
        dispatch({
            type: ADD_TO_CART,
            payload: cart,
        });
    }
};

export const deleteFromCart = product => async dispatch => {
    const cart = localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : [];


    const updatedCart = cart.filter(cartItem => cartItem.id !== product.id);

    localStorage.setItem('cart', JSON.stringify(updatedCart));

    dispatch({
        type: DELETE_FROM_CART,
        payload: updatedCart,
    });
};

export const cartEmpty = () => {
    return {
        type: CART_EMPTY,
        payload: [{ key: 1, id: 1, name: "Don't products", image: 'https://img.freepik.com/vector-gratis/ups-error-404-ilustracion-concepto-robot-roto_114360-5529.jpg?w=2000', price: 0, brand: '' }]
    }
}

export const getCart = () => {
    let cart
    if (JSON.parse(localStorage.getItem('cart'))) {
        if (JSON.parse(localStorage.getItem('cart')).length !== 0) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

    } else {
        cart = [{ key: 1, id: 1, name: "Don't products", image: 'https://img.freepik.com/vector-gratis/ups-error-404-ilustracion-concepto-robot-roto_114360-5529.jpg?w=2000', price: 0, brand: '' }];
    }
    return {
        type: GET_CART,
        payload: cart
    }
}

export function CreateAddress(data) {
    return async function (dispatch) {
        let response = await axios.post('/address', data) // http://localhost:3001/messages/send
        return dispatch({
            type: POST_ADDRESS,
            payload: response.data,
        })
    }
}
export function GetCart(id) {
    return async function (dispatch) {
        let response = await axios.get('/cart?userId='+id) // http://localhost:3001/messages/send
        return dispatch({
            type: GET_CARTDB,
            payload: response.data,
        })
    }
}