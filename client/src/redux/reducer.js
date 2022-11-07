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
    BRAND_ELECT,    
    GET_USERSADDRESS,
    POST_ADDRESS,
    GET_CARTDB,
    GET_PRODUCTSADMIN

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

    brandFilteredMemory: [],
    resultFilterCombinado1: [],
    filtersElect: [],
    brandElect: "",
    searchName: "",

    userLogged: {},
    address:'',
    cartDb:''

}



const reducer = (state = initialState, action) => {
    console.log(state)
    switch (action.type) {
        case GET_PRODUCTS:
            const result=action.payload.filter(f=>f.active===true)
            return {
                ...state,
                products: [...result],
                productsFiltered: [...result],
                brandFilteredMemory: [...result],
                brandElect: "",
                filtersElect: [],
            }
        case GET_PRODUCTSADMIN:
            return {
                ...state,
                products: [...action.payload],
                productsFiltered: [...action.payload],
                brandFilteredMemory: [...action.payload],
                brandElect: "",
                filtersElect: [],
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



        //filtro que funciona en el front sin hacer el pedido al back
        case SEARCH:

            let filterNames = state.productsFiltered.filter((e) => {
                return (e.name.toUpperCase().includes(action.payload.toUpperCase()))
            });

            return {
                ...state,
                productsFiltered: filterNames,
                searchName: action.payload,
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
            console.log('order by en reducer productsFiltered', state.productsFiltered)
            if (action.payload === 'A-Z' || action.payload === 'Z-A') {
                console.log('estoy en reducer A-Z')
                let n = 0;
                const ordenV = (action.payload === 'A-Z')
                    ?
                    (state.productsFiltered.sort((a, b) => { return (((a.name.trim() > b.name.trim()) ? 1 : (a.name.trim() < b.name.trim()) ? -1 : 0)) }))
                    :
                    (state.productsFiltered.sort((a, b) => { return ((a.name.trim() < b.name.trim()) ? 1 : ((a.name.trim() > b.name.trim()) ? -1 : 0)) }))
                //es necesario realizar un cambio, para que me muestre la lista ordenada al renderizar la página, agrego una nueva propiedad idd 
                const ordenVCid = ordenV.map((e) => { return ({ ...e, idd: n++ }) })
                return {
                    ...state,
                    currentOrder: action.payload,
                    productsFiltered: ordenVCid,
                    brandFilteredMemory: ordenVCid,
                }
            }

            if (action.payload === 'priceAsc') {
                console.log('estoy en reducer priceAsc')
                let n = 0;
                const ordenV = state.productsFiltered.sort((prev, next) => {
                    return prev.price - next.price
                })
                const ordenVCid = ordenV.map((e) => { return ({ ...e, idd: n++ }) })
                return {
                    ...state,
                    currentOrder: action.payload,
                    productsFiltered: ordenVCid,
                    brandFilteredMemory: ordenVCid,

                }
            }
            if (action.payload === 'priceDesc') {
                console.log('estoy en reducer priceDesc')
                let n = 0;
                const ordenV = state.productsFiltered.sort((prev, next) => {
                    return next.price - prev.price
                })
                const ordenVCid = ordenV.map((e) => { return ({ ...e, idd: n++ }) })
                return {
                    ...state,
                    currentOrder: action.payload,
                    productsFiltered: ordenVCid,
                    brandFilteredMemory: ordenVCid,
                }
            }
            return state


        case FILTER:
            let n = 0

            let brandFilter = action.payload.filter((f) => f.filters === "brand")

            if (brandFilter.length > 0) {
                const brandFilterName = state.products.filter((product) => product.brand.name === brandFilter[0].name)
                const brandFilterId = brandFilterName.map((e) => { return ({ ...e, idd: n++ }) })

                state.productsFiltered = brandFilterId
                state.brandFilteredMemory = brandFilterId //memory filter de brand
            }

            //arrays con los filtros
            let colorFilter = action.payload.filter((f) => f.filters === "color")
            let categoryFilter = action.payload.filter((f) => f.filters === "category")
            // let sizeFilter = action.payload.filter((f) => f.filters === "size")
            let genreFilter = action.payload.filter((f) => f.filters === "genre")
            console.log("en reducer filter color category size y genre", colorFilter, categoryFilter, genreFilter)
            // , sizeFilter
            //arrays con el nombre seleccionado en cada sección
            colorFilter = colorFilter.map((c) => c.name)
            categoryFilter = categoryFilter.map((c) => c.name)
            // sizeFilter = sizeFilter.map((s) => s.name)
            genreFilter = genreFilter.map((g) => g.name)
            console.log("en reducer arrays con names de las secciones", colorFilter, categoryFilter, genreFilter)
            // , sizeFilter
            //aplico los filtros names
            //si hay filtros en color le aplico el filtro, de lo contrario no lo aplico

            state.resultFilterCombinado1 = state.brandFilteredMemory

            if (colorFilter.length > 0) {
                state.resultFilterCombinado1 = [...colorFilter?.map((c) =>
                    state.brandFilteredMemory?.filter((e) => e.color === c))]
            }
            state.resultFilterCombinado1 = state.resultFilterCombinado1.flat()
            console.log("resultado de color en reducer 1", state.resultFilterCombinado1)

            // aplico filtro category si no está vacío
            if (categoryFilter.length > 0) {
                state.resultFilterCombinado1 = categoryFilter?.map((c) => state.resultFilterCombinado1?.filter((e) => e.category[0].name === c))
                state.resultFilterCombinado1 = state.resultFilterCombinado1.flat()
                console.log('resultado de categoryFilter', categoryFilter.lenght > 0)
            } else {
                state.resultFilterCombinado1 = state.resultFilterCombinado1.flat()
            }
            console.log('resultado de categoryFilter', categoryFilter.length)
            console.log("resultado de category en reducer 2", state.resultFilterCombinado1)
            //si size no está vacío aplico los filtros
            // const resultFilterCombinado3 = (sizeFilter.lenght !== 0)
            //     ?
            //     sizeFilter?.map((c) => resultFilterCombinado2?.filter((e) => e === c))
            //     :
            //     resultFilterCombinado2
            // console.log("resultado de color en size 3", resultFilterCombinado3)
            //si genre no está vacío aplico los filtros
            if (genreFilter.length > 0) {
                state.resultFilterCombinado1 = genreFilter?.map((c) => state.resultFilterCombinado1?.filter((e) => e.genre === c))
                state.resultFilterCombinado1 = state.resultFilterCombinado1.flat()
            } else {
                state.resultFilterCombinado1 = state.resultFilterCombinado1.flat()
            }

            console.log("resultado de genre en reducer 4", state.resultFilterCombinado1)
            //ya aplicados los filtros los guardo en el estado
            console.log('valor del resultado fuera de los ? 4', state.resultFilterCombinado1)
            console.log("estado en reducer", state)
            return {
                ...state,
                productsFiltered: state.resultFilterCombinado1,
                filtersElect: action.payload,
            }




        case RESET_FILTERS:
            return {
                ...state,
                searchResultsFiltered: [],
                searchResults: state.searchResults,
            }

        case BRAND_ELECT:
            return {
                ...state,
                brandElect: action.payload,
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
