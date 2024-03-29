import axios from 'axios'

import {
    POST_DBCART,
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
    GET_COLORS,
    GET_ADMINS,
    GET_USERS,
    GET_PROFILE,
    GET_CURRENT_USER,
    UPDATE_USER,
    UPDATE_USER_ADM,
    POST_USER,
    GET_COMMENTS,
    POST_COMMENT,
    ORDER_BY,
    OPEN_DETAIL,
    CREATE_P_REVIEW,
    GET_REVIEWS,
    REVIEWS_FILTER,
    FILTER,
    RESET_FILTERS,
    LOGIN,
    VIEW_CART,
    ADD_TO_CART,
    DELETE_FROM_CART,
    CART_EMPTY,
    GET_FAVORITES,
    GET_PRODUCTS_ADMIN,
    REMOVE_FROM_FAVORITES,
    GET_CART,
    BRAND_ELECT,
    GET_CARTDB,
    POST_CREATE_PURCHASE,
    GET_PURCHASES,
    GET_CREATE_PURCHASE,
    GET_PURCHASE_DETAIL,
    UPDATE_PURCHASE,
    VIEW_CHAT_BOT,
    OPEN_MENU_MOVIL_FILTERS,

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

export function getProductsAdmin() {
    return async function (dispatch) {
        const allData = await axios.get('/products')
        return dispatch({ type: GET_PRODUCTS_ADMIN, payload: allData.data })
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
    return async function (dispatch) {
        let json = await axios.post('/products', payload)
        return dispatch({
            type: POST_PRODUCT,
            payload: json.data,
        })
    }
}

export function getPReviews() {
    return async function (dispatch) {
        const allData = await axios.get('/reviews')
        return dispatch({ type: GET_REVIEWS, payload: allData.data })
    }
}

export function createProductReview(payload) {
    return async function (dispatch) {
        let json = await axios.post('/reviews', payload)
        return dispatch({
            type: CREATE_P_REVIEW,
            payload: json.data
        })
    }
}

export function reviewsFilter(payload) {
    return { type: REVIEWS_FILTER, payload: payload }
}

export function updateProduct(id, payload) {
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

export function getColors() {
    return async function (dispatch) {
        const json = await axios.get('/colors')
        return dispatch({ type: GET_COLORS, payload: json.data })
    }
}

// ------- Filtros y ordenamiento ---------


export function getOpenFilterMovil(value) {
    return { type: OPEN_MENU_MOVIL_FILTERS, payload: value }
}

export function orderBy(order) {
    return ({ type: ORDER_BY, payload: order })
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

export function getAdmins(token) { // Obtener todos los Admins
    return async function (dispatch) {
        const config = {
            headers: {
                "Authorization": "Bearer " + await token()
            }
        }

        let json = await axios.get('/users/admin', config)
        return dispatch({
            type: GET_ADMINS,
            payload: json.data,
        })
    }
}

export function getUsers(token, id) { // Obtener todos los Users
    return async function (dispatch) {
        const config = {
            headers: {
                "Authorization": "Bearer " + await token()
            }
        }

        let json = await axios.get(`/users?id=${id}`, config)
        return dispatch({
            type: GET_USERS,
            payload: json.data,
        })
    }
}

export function getUsersAddress(id) { // Obtener la address de un user
    return async function (dispatch) {
        let json = await axios.get('/address?id=' + id)
        return dispatch({
            type: GET_USERSADDRESS,
            payload: json.data,
        })
    }
}

export function getCurrentUser(token, user) { // Obtener la info del user loggeado
    // console.log(user)
    return async function (dispatch) {

        const config = {
            headers: {
                "Authorization": "Bearer " + await token()
            }
        }

        let json = await axios.post(`/users/${user.email}`, user, config)
        return dispatch({
            type: GET_CURRENT_USER,
            payload: json.data,
        })
    }
}

export function getUser(token, id) { // Visualizar perfil de un User
    return async function (dispatch) {

        const config = {
            headers: {
                "Authorization": "Bearer " + await token()
            }
        }

        let json = await axios.get(`/users/find/${id}`, config)
        return dispatch({
            type: GET_PROFILE,
            payload: json.data,
        })
    }
}

export function LogInAction(data) {
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
}

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
            const result = await axios.post('/users/register', data)
            dispatch({
                type: LOGIN,
                payload: result.data
            })

        } catch (error) {
            throw new Error(error)
        }
    }
}

export function editUser(token, id, payload) { // Para que un User actualice su perfil
    return async function (dispatch) {
        const config = {
            headers: {
                "Authorization": "Bearer " + await token()
            }
        }

        let json = await axios.put(`/users/${id}`, payload, config)
        return dispatch({
            type: UPDATE_USER,
            payload: json.data,
        })
    }
}

export function editUserAdmin(token, id, payload) { // Para que un admin actualice el perfil de un User
    return async function (dispatch) {
        const config = {
            headers: {
                "Authorization": "Bearer " + await token()
            }
        }

        let json = await axios.put(`/users/admin/${id}`, payload, config)
        return dispatch({
            type: UPDATE_USER_ADM,
            payload: json.data,
        })
    }
}

export function createUser(payload) { // Crear Usuario desde el admin
    return async function (dispatch) {
        let json = await axios.post('/users/register', payload)
        return dispatch({
            type: POST_USER,
            payload: json,
        })
    }
}

// ------- Help Us Mail --------

export function getComments() {
    // Obtener los mensajes de Help us to improve
    return async function (dispatch) {
        let json = await axios.get('/comments')
        return dispatch({
            type: GET_COMMENTS,
            payload: json.data,
        })
    }
}

export function postComment(data) {
    //crear un mensaje en el buzón de HelpUsToImprove

    return async function (dispatch) {
        let response = await axios.post('/comments/send', data)
        return dispatch({
            type: POST_COMMENT,
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

export const deleteFromCart = (product, props = '') => dispatch => {
    const cart = localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : [];

    const updatedCart = cart.filter(cartItem => cartItem.id !== product.id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    dispatch({
        type: DELETE_FROM_CART,
        payload: updatedCart,
    });

    dispatch(updatedCartDB(updatedCart, props._id))
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
        cart = [{ key: 1, id: 1, name: "No products", image: 'https://img.freepik.com/vector-gratis/ups-error-404-ilustracion-concepto-robot-roto_114360-5529.jpg?w=2000', price: 0, brand: '' }];
    }
    return {
        type: GET_CART,
        payload: cart
    }
}

export function updatedCartDB(data, userid) {
    return async function (dispatch) {
        let response = await axios.post('/cartupdate/' + userid, data)
        return dispatch({
            type: POST_DBCART,
            payload: response.data,
        })
    }
}

export function CreateAddress(data) {
    return async function (dispatch) {
        let response = await axios.post('/address', data)
        return dispatch({
            type: POST_ADDRESS,
            payload: response.data,
        })
    }
}

export function GetCart(id) {
    return async function (dispatch) {
        let response = await axios.get('/cart?userId=' + id)
        return dispatch({
            type: GET_CARTDB,
            payload: response.data,
        })
    }
}

export function CreatePurchase(data) { //Crear una compra
    return async function (dispatch) {
        try {
            let response = await axios.post('/purchase', data)
            return dispatch({
                type: POST_CREATE_PURCHASE,
                payload: response.data,
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}

export function getPurchases() { //Obtener todas las compras hechas
    return async function (dispatch) {
        let response = await axios.get('/purchase')
        return dispatch({
            type: GET_PURCHASES,
            payload: response.data,
        })
    }
}

export function GetPurchase(data) { //Obtener las compras de un user
    return async function (dispatch) {
        try {
            let response = await axios.get('/purchase?userId=', data)

            return dispatch({
                type: GET_CREATE_PURCHASE,
                payload: response.data,
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}

export function getPurchaseDetail(id) { //Obtener el detalle de una compra
    return async function (dispatch) {
        try {
            let response = await axios.get(`/purchase?purchaseId=${id}`)

            return dispatch({
                type: GET_PURCHASE_DETAIL,
                payload: response.data,
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}

export function updatePurchase(id, payload) { // Actualizar el estado de una compra
    return async function (dispatch) {
        try {
            let response = await axios.put(`/purchase/${id}`, payload)

            return dispatch({
                type: UPDATE_PURCHASE,
                payload: response.data,
            })

        } catch (error) {
            throw new Error(error)
        }
    }
}

// ------- Favorites ---------

export function favoriteProduct(product) {
    // return async function() {
    //     try {
    //         await axios.post('/favorites', {
    //             productId: productId,
    //             userId: userId
    //         })
    //     } catch (error) {
    //         throw new Error(error)
    //     }
    // }
    return async function (dispatch) {
        dispatch({
            type: GET_FAVORITES,
            payload: {
                product: product,
                id: product.id
            }
        })
    }
}

export function deleteFromFavorites(id) {
    return async function (dispatch) {
        dispatch({
            type: REMOVE_FROM_FAVORITES,
            payload: id
        })
    }
}

// ------- Chat Bot ---------
export function ViewChatBot(viewChat) {
    console.log('estoy en action de ViewChatBot', viewChat)
    return {
        type: VIEW_CHAT_BOT,
        payload: viewChat,
    }
}