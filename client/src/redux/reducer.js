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
    ORDER_BY
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
    messages: [],
    productsFiltered: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_PRODUCTS:
            return ({
                ...state,
                products: [...action.payload],
                productsFiltered: [...action.payload]
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
            case ORDER_BY:
         if (action.payload === "A-Z") {
          return {
            ...state,
            productsFiltered: [...state.products].sort((prev, next) => {
              if (prev.name > next.name) return 1;
              if (prev.name < next.name) return -1;
              return 0;
            }),
          };
        }
         if (action.payload === "Z-A") {
          return {
            ...state,
            productsFiltered: [...state.products].sort((prev, next) => {
              if (prev.name > next.name) return -1;
              if (prev.name < next.name) return 1;
              return 0;
            }),
          };
        }
        if (action.payload === "M") {
            return {
              ...state,
              productsFiltered: [...state.products].filter((p) => 
                p.genre === "Mens"
              )
              
            };
          }
          if (action.payload === "F") {
            return {
              ...state,
              productsFiltered: [...state.products].filter((p) => 
                p.genre === "Womens"
              )
              
            };
          }
          if (action.payload === "U") {
            return {
              ...state,
              productsFiltered: [...state.products].filter((p) => 
                p.genre === "Unisex"
              )
              
            };
          }
          if (action.payload === "Gucci") {
            return {
              ...state,
              productsFiltered: [...state.products].filter((p) => 
                p.brand.name === "Gucci"
              )
              
            };
          }
          if (action.payload === "Nike") {
            return {
              ...state,
              productsFiltered: [...state.products].filter((p) => 
              p.brand.name === "Nike"
              )
              
            };
          }
          if (action.payload === "Adidas") {
            return {
              ...state,
              productsFiltered: [...state.products].filter((p) => 
              p.brand.name === "Adidas"
              )
              
            };
          }
          if (action.payload === "Caps") {
            return {
              ...state,
              productsFiltered: [...state.products].filter((p) => 
              p.category[0].name === "Caps"
              )
              
            };
          }
          if (action.payload === "T-shirts") {
            return {
              ...state,
              productsFiltered: [...state.products].filter((p) => 
              p.category[0].name === "T-shirts"
              )
              
            };
          }

        default: return state;
    }
};

export default reducer;