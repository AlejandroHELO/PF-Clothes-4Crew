import {
    GET_PRODUCTS,
    PRODUCT_DETAIL,
    PRODUCT_UPDATE,
    GET_CATEGORIES,
    GET_BRANDS
} from './types';

const initialState = {
    products: [],
    details: [],
    categories: [],
    brands: []
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
                details: action.payload
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
        default:
            return state;
    }

}

export default reducer;