import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail, getopenDetail, addToCart, favoriteProduct, deleteFromFavorites } from '../../redux/actions';
import emptyHeart from '../../icons/emptyHeart.svg'
import heartFill from '../../icons/heartFill.svg'
// import { userContext } from '../../App'

const Card = (p) => {
    const dispatch = useDispatch()
    const favorite = useSelector(state => state.favoritesId)
    const [main, setMain] = React.useState(false)

    function handleMain(boolean) {
        if(main === false) {
            setMain(true)
            
        }
        if(main === true) {
            setMain(false)
        
        }
    }

    const handleOnClickDetail = (id) => {
        dispatch(getProductDetail(id))
        dispatch(getopenDetail(id))
    }
    const handleFavorite = (product) => {
       
        dispatch(favoriteProduct(product))
    }
    const handleRemove = (id) => {
        dispatch(deleteFromFavorites(id))
    }
    React.useEffect(() => {
    }, [favorite])

    return (

        <div
            className='w-fit  my-8 h-fit overflow-hidden rounded border-2 position-relative shadow-xl shadow-slate-400 p-3 m-2 flex flex-col items-center justify-between  '
            key={p.id}
            
        >
                
             {
              favorite.includes(p.id) ? (
                 <div style={{ width: 'fit-content', height:'fit-content', display: 'flex', right:'3%', top:'3%', position:'absolute', zIndex:10}}>
                    <button onClick={() => handleRemove(p.id)} style={{width:'fit-content', height:'fit-content'}}>
                       <img alt='favorite button' src={heartFill} style={{width: '1.5em', height:'1.5em'}}/>
                    </button>
                </div>
                ):(
                    <div style={{ width: 'fit-content', height: 'fit-content', display: 'flex', position:'absolute', right:'3%', top:'3%',zIndex:10}}>
                        <button onClick={() => handleFavorite(p)} style={{width:'fit-content', height:'fit-content'}}>
                            <img alt='favorite button' src={emptyHeart} style={{width: '1.5em', height:'1.5em'}}/>
                        </button>
                    </div>
                )
            }  
            <button onMouseEnter={() => handleMain()} onMouseLeave={() => handleMain()} className='transparent p-auto w-40 h-36 hover:h-60 hover:transition-all ease-in-out duration-700' onClick={() => handleOnClickDetail(p.id)}>
                <div className='w-40 h-40 p-auto flex justify-center'>
                { 
                    p.image.length !== 0  &&  
                        <img
                            className="w-36 h-36 object-contain object-center hover:transition-all ease-in-out duration-500 hover:w-40  hover:h-40 "
                            src={p.image[0]}
                            alt='porduct pic'
                        />    
                }
                </div>
                {
                    main === true && 
                    <div>
                        <div className="mono font-bold text-sm m-auto h-fit text-slate-600 uppercase">
                            {p.name}
                        </div>
                        <div className="text-sm italic m-auto text-slate-400">
                            {p.brand}
                        </div>
                        <div className="h-fit w-fit text-base mr-4 text-slate-600 font-bold inline-flex align-middle p-auto">
                            ${p.price} USD
                        </div>
                    </div>
                }
            </button>
           
           
        </div>
    )


}
export default Card
