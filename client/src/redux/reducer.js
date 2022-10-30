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
    POST_MESSAGE
} from './types';

const initialState = {
    products: [],
    details: [],
    searchResults:[],
    categories: [],
    brands: [],
    users: [],
    userDetail: [],
    userPut: "",
    admins: [],
    messages: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_PRODUCTS:
            return ({
                ...state,
                products: [...action.payload]
            })

        case PRODUCT_DETAIL:
            return ({
                ...state,
                details: {...action.payload[0]}
            })
        case CLEAR_DETAIL:
            return({
                ...state,
                details: action.payload
            })
        
        case SEARCH:
            return({
                ...state,
                searchResults: action.payload
            })

        case GET_CATEGORIES:
            return ({
                ...state,
                categories: action.payload
            })

        case GET_BRANDS:
            return ({
                ...state,
                brands: action.payload
            })

        case GET_ADMINS:
            return ({
                ...state,
                admins: action.payload
            })

        case GET_USERS:
            return ({
                ...state,
                users: action.payload
            })

        case GET_PROFILE:
            return ({
                ...state,
                userDetail: action.payload
            })
        
        case UPDATE_USER_ADM:
            return ({
                ...state,
                userPut: action.payload
            })

        default: return state;
    }
};

export default reducer;