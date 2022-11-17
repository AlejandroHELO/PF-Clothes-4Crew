import {
    POST_DBCART,
    GET_PRODUCTS,
    PRODUCT_DETAIL,
    CLEAR_DETAIL,
    PRODUCT_UPDATE,
    POST_PRODUCT,
    GET_REVIEWS,
    REVIEWS_FILTER,
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
    GET_COMMENTS,
    POST_COMMENT,
    ORDER_BY,
    OPEN_DETAIL,
    FILTER,
    RESET_FILTERS,
    LOGIN,
    GET_FAVORITES,
    REMOVE_FROM_FAVORITES,
    VIEW_CART,
    ADD_TO_CART,
    DELETE_FROM_CART,
    CART_EMPTY,
    GET_CART,
    BRAND_ELECT,
    GET_USERSADDRESS,
    POST_ADDRESS,
    GET_CARTDB,
    GET_PRODUCTS_ADMIN,
    POST_DBCARTD,
    POST_CREATE_PURCHASE,
    DELETE_CREATE_PURCHASE,
    GET_PURCHASES,
    GET_CREATE_PURCHASE,
    GET_PURCHASE_DETAIL,
    UPDATE_PURCHASE
} from './types'

const initialState = {
    products: [],
    details: [],
    openDetail: '',
    reviews: [],
    reviews_copy: [],
    filteredReviews: [],
    searchResults: [],
    searchResultsFiltered: [],
    currentOrder: '',
    currentFilter: '',
    categories: [],
    brands: [],
    colors: [],
    users: [],
    userDetail: [],
    userPut: '',
    admins: [],
    comments: [],
    productsFiltered: [],
    favorites: [],
    favoritesId: [],
    brandFilteredMemory: [],
    resultFilterCombinado1: [],
    filtersElect: [],
    brandFilterName: "",
    searchName: "",
    selectedBrands: [],
    userLogged: {},
    address:'',
    cartDb:'',
    updatecartdb:'',
    createP:'',
    compras:'',
    purchases: [],
    purchaseDetail: [],
    purchasePut: ''
}


const reducer = (state = initialState, action) => {
   
    switch (action.type) {

        case GET_PURCHASES:
            return{
                ...state,
                purchases: action.payload
            }

        case GET_CREATE_PURCHASE:
            return {
                ...state,
                compras: action.payload
            }

        case DELETE_CREATE_PURCHASE:
            return {
                ...state,
                createP: action.payload
            }
        
        case POST_CREATE_PURCHASE:
            return {
                ...state,
                createP: action.payload
            }

        case GET_PURCHASE_DETAIL:
            return {
                ...state,
                purchaseDetail: action.payload
            }

        case UPDATE_PURCHASE:
            return {
                ...state,
                purchasePut: action.payload
            }

        case POST_DBCART:
            return {
                ...state,
                updatecartdb: action.payload
            }

        case POST_DBCARTD:
            return {
                ...state,
                updatecartdb: ''
            }

        case GET_PRODUCTS:
            const result = action.payload.filter(f => f.active === true)
            return {
                ...state,
                products: [...result],
                productsFiltered: [...result],
                brandFilteredMemory: [...result],
                brandElect: "",
                filtersElect: [],
            }

        case GET_PRODUCTS_ADMIN:
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
        case GET_REVIEWS:
            return ({
                ...state,
                reviews: action.payload,
                reviews_copy: action.payload
            })
        
        case REVIEWS_FILTER:
            const reviews = state.reviews_copy
            if(action.payload === 'All rates'){
                return({
                    ...state,
                    filteredReviews: reviews
                })
            }else if(action.payload === '5'){
                const filter = reviews.filter(r => r.score === 5)
                return({
                    ...state,
                    filteredReviews: filter
                })
            }else if(action.payload === '4'){
                const filter = reviews.filter(r => r.score === 4)
                return({
                    ...state,
                    filteredReviews: filter
                })
                
            }else if(action.payload === '3'){
                const filter = reviews.filter(r => r.score === 3)
                return({
                    ...state,
                    filteredReviews: filter
                })
            }else if(action.payload === '2'){
                const filter = reviews.filter(r => r.score === 2)
                return({
                    ...state,
                    filteredReviews: filter
                })
                
            }else if(action.payload === '1'){
                const filter = reviews.filter(r => r.score === 1)
                return({
                    ...state,
                    filteredReviews: filter
                })
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

        case GET_COLORS:
            return {
                ...state,
                colors: action.payload,
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

        case GET_CURRENT_USER:
            return {
                ...state,
                userLogged: action.payload,
            }

        case UPDATE_USER:
            return {
                ...state,
                userPut: action.payload,
            }

        case UPDATE_USER_ADM:
            return {
                ...state,
                userPut: action.payload,
            }

        case ORDER_BY:
            if (action.payload === 'A-Z' || action.payload === 'Z-A') {
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
            //Filtro de Brand
            let brandFilter = action.payload.filter((f) => f.filters === "brand")
            //si elijo All en brands me trae todos los productos, si elijo otra opción -> me filtra según esa opción de brand
            if (brandFilter.length > 0) {
                if (brandFilter[0].name === 'All') {
                    state.brandFilterName = state.products
                } else {
                    state.brandFilterName = state.products.filter((product) => product.brand.name === brandFilter[0].name)
                }

                const brandFilterId = state.brandFilterName.map((e) => { return ({ ...e, idd: n++ }) })

                state.productsFiltered = brandFilterId
                state.brandFilteredMemory = brandFilterId //memory filter de brand
            }

            //arrays con los filtros, de color, category y genre
            let colorFilter = action.payload.filter((f) => f.filters === "color")
            let categoryFilter = action.payload.filter((f) => f.filters === "category")
            // let sizeFilter = action.payload.filter((f) => f.filters === "size") //Los filtros de size decidí no usarlos
            let genreFilter = action.payload.filter((f) => f.filters === "genre")
          
            //arrays con el nombre seleccionado en cada sección
            colorFilter = colorFilter.map((c) => c.name)
            categoryFilter = categoryFilter.map((c) => c.name)
            // sizeFilter = sizeFilter.map((s) => s.name)
            genreFilter = genreFilter.map((g) => g.name)
           
            // , sizeFilter
            //aplico los filtros names
            //si hay filtros en color le aplico el filtro, de lo contrario no lo aplico

            state.resultFilterCombinado1 = state.brandFilteredMemory

            if (colorFilter.length > 0) {
                state.resultFilterCombinado1 = [...colorFilter?.map((c) =>
                    state.brandFilteredMemory?.filter((e) => e.color === c))]
            }
            state.resultFilterCombinado1 = state.resultFilterCombinado1.flat()
            

            // aplico filtro category si no está vacío
            if (categoryFilter.length > 0) {
                state.resultFilterCombinado1 = categoryFilter?.map((c) => state.resultFilterCombinado1?.filter((e) => e.category[0].name === c))
                state.resultFilterCombinado1 = state.resultFilterCombinado1.flat()
               
            } else {
                state.resultFilterCombinado1 = state.resultFilterCombinado1.flat()
            }
            //
            //si size no está vacío aplico los filtros
            // const resultFilterCombinado3 = (sizeFilter.lenght !== 0)
            //     ?
            //     sizeFilter?.map((c) => resultFilterCombinado2?.filter((e) => e === c))
            //     :
            //     resultFilterCombinado2
            //si genre no está vacío aplico los filtros
            if (genreFilter.length > 0) {
                state.resultFilterCombinado1 = genreFilter?.map((c) => state.resultFilterCombinado1?.filter((e) => e.genre === c))
                state.resultFilterCombinado1 = state.resultFilterCombinado1.flat()
            } else {
                state.resultFilterCombinado1 = state.resultFilterCombinado1.flat()
            }

           
            //ya aplicados los filtros los guardo en el estado

            return {
                ...state,
                productsFiltered: state.resultFilterCombinado1,
                filtersElect: action.payload,
            }

        case GET_FAVORITES: {
            // const favoritesProducts = []
            // action.payload?.map(p => {
            //     return favoritesProducts.push(p.id)
            // })
            return {
                ...state,
                favorites: state.favorites.concat(action.payload.product),
                favoritesId: state.favoritesId.concat(action.payload.id)
            }
        }

        case REMOVE_FROM_FAVORITES: {
            return {
                ...state,
                favorites: state.favorites.filter(p => p.id !== action.payload),
                favoritesId: state.favoritesId.filter(p => p !== action.payload)
            }
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
                selectedBrands: action.payload,
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
            }

        case DELETE_FROM_CART:
            return {
                ...state,
                cart: [...action.payload],
            }

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
            return {
                ...state,
                address: action.payload
            }

        case POST_ADDRESS:
            return {
                ...state,
            }

        case GET_CARTDB:
            return {
                ...state,
                cartDb: action.payload
            }

        case GET_COMMENTS:
            return {
                ...state,
                comments: action.payload
            }

        case POST_COMMENT:
            return {
                ...state,
            }

        default: return state
    }
}

export default reducer
