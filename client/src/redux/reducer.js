import {
    GET_PRODUCTS,
    PRODUCT_DETAIL,
    PRODUCT_UPDATE,
    GET_CATEGORIES
} from './types';

const initialState = {
    products: [],
    details: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_PRODUCTS:
            return({
                ...state,
                products: [...action.payload]
            })
        case PRODUCT_DETAIL:
            return({
                ...state,
                details: action.payload
            })
    }

}

export default reducer;