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
    GET_USERSADDRESS,
    POST_ADDRESS,
    GET_CARTDB
} from './types'

const initialState = {
    products: [],
    details: [],
    openDetail: '',
    searchResults: [],
    searchResultsFiltered: [],
    currentOrder: '',
    currentFilter: '',
    categories: [],
    brands: [],
    users: [],
    userDetail: [],
    userPut: '',
    admins: [],
    messages: [],
    productsFiltered: [],
    userLogged: {},
    address:'',
    cartDb:''
}



const reducer = (state = initialState, action) => {
    console.log(state)
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: [...action.payload],
                productsFiltered: [...action.payload],
            }

        case PRODUCT_DETAIL:
            return {
                ...state,
                details: { ...action.payload[0] },
            }

        case POST_PRODUCT:
            return {
                ...state,
            }

        case OPEN_DETAIL:
            return {
                ...state,
                openDetail: action.payload,
            }

        case CLEAR_DETAIL:
            return {
                ...state,
                details: action.payload,
            }

        case SEARCH:
            if (action.payload.query === 'all') {
                return {
                    ...state,
                    searchResults: state.products,
                }
            }
            const categoriesResults = state.products.filter((product) =>
                product.category[0].name
                    .toLowerCase()
                    .includes(action.payload.query)
            )
            const brandsResults = state.products.filter((product) =>
                product.brand.name.toLowerCase().includes(action.payload.query)
            )
            return {
                ...state,
                searchResults: [
                    ...action.payload.data,
                    ...categoriesResults,
                    ...brandsResults,
                ],
            }


        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            }


        case GET_BRANDS:
            return {
                ...state,
                brands: action.payload,
            }

        case GET_ADMINS:
            return {
                ...state,
                admins: action.payload,
            }

        case GET_USERS:
            return {
                ...state,
                users: action.payload,
            }

        case GET_PROFILE:
            return {
                ...state,
                userDetail: action.payload,
            }

        case UPDATE_USER_ADM:
            return {
                ...state,
                userPut: action.payload,
            }

        case ORDER_BY:
            if (action.payload === 'aZ') {
                return {
                    ...state,
                    currentOrder: action.payload,
                    searchResults: state.searchResults.sort((prev, next) => {
                        if (prev.name.toLowerCase() > next.name.toLowerCase())
                            return 1
                        if (prev.name.toLowerCase() < next.name.toLowerCase())
                            return -1
                        return 0
                    }),
                }
            }
            if (action.payload === 'zA') {
                return {
                    ...state,
                    currentOrder: action.payload,
                    searchResults: state.searchResults.sort((prev, next) => {
                        if (prev.name.toLowerCase() > next.name.toLowerCase())
                            return -1
                        if (prev.name.toLowerCase() < next.name.toLowerCase())
                            return 1
                        return 0
                    }),
                }
            }
            if (action.payload === 'priceAsc') {
                return {
                    ...state,
                    currentOrder: action.payload,
                    searchResults: state.searchResults.sort((prev, next) => {
                        return prev.price - next.price
                    }),
                }
            }
            if (action.payload === 'priceDesc') {
                return {
                    ...state,
                    currentOrder: action.payload,
                    searchResults: state.searchResults.sort((prev, next) => {
                        return next.price - prev.price
                    }),
                }
            }
            return state

        case FILTER:
            const categoryFilter = state.searchResults.filter(
                (product) => product.category[0].name === action.payload
            )
            const brandFilter = state.searchResults.filter(
                (product) => product.brand.name === action.payload
            )
            const genderFilter = state.searchResults.filter(
                (product) => product.genre === action.payload
            )
            return {
                ...state,
                searchResultsFiltered: [
                    ...categoryFilter,
                    ...brandFilter,
                    ...genderFilter,
                ],
            }
        case RESET_FILTERS:
            return {
                ...state,
                searchResultsFiltered: [],
                searchResults: state.searchResults,
            }

        // ------- Cart --------

        case VIEW_CART:
            return ({
                ...state,
                viewCart: action.payload
            })

        case ADD_TO_CART:
            return {
                ...state,
                cart: [...action.payload],
            };

        case DELETE_FROM_CART:
            return {
                ...state,
                cart: [...action.payload],
            };
        case CART_EMPTY:
            return {
                ...state,
                cart: action.payload

            }

        case GET_CART:
            return {
                ...state,
                cart: action.payload
            }
        case GET_USERSADDRESS:
            return{
                ...state,
                address:action.payload
            }
        case POST_ADDRESS:
            console.log(action.payload)
                return{
                    ...state,
                }        
        case GET_CARTDB:
                return{
                    ...state,
                    cartDb:action.payload
                }
        default:
            return state
    }
}



export default reducer
