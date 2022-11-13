import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail, getopenDetail, addToCart, favoriteProduct, deleteFromFavorites } from '../../redux/actions';
import emptyHeart from '../../icons/emptyHeart.svg'
import heartFill from '../../icons/heartFill.svg'
import { userContext } from '../../App'

const Card = (p) => {
    const dispatch = useDispatch()
    const favorite = useSelector(state => state.favoritesId)

    const handleOnClickDetail = (id) => {
        dispatch(getProductDetail(id))
        dispatch(getopenDetail(id))
    }
    const handleFavorite = (product) => {
        console.log(product)
        dispatch(favoriteProduct(product))
    }
    const handleRemove = (id) => {
        dispatch(deleteFromFavorites(id))
    }
    React.useEffect(() => {
    }, [favorite])

    return (

        <div
            className=" w-60 h-80 shadow-2xl m-2 flex flex-col items-center justify-between"
            key={p.id}
        >
             {
              favorite.includes(p.id) ? (
                 <div style={{ width: 'fit-content', display: 'flex', marginLeft: '70%', marginTop: '10%'}}>
            <button onClick={() => handleRemove(p.id)} style={{width:'fit-content'}}>
                       <img alt='favorite button' src={heartFill} style={{width: '1.5em'}}/>
                    </button>
         </div>
                ):(
                    <div style={{ width: 'fit-content', display: 'flex', marginLeft: '70%', marginTop: '10%'}}>
            <button onClick={() => handleFavorite(p)} style={{width:'fit-content'}}>
                        <img alt='favorite button' src={emptyHeart} style={{width: '1.5em'}}/>
                    </button>
            </div>
                )
            }  
            <button className='transparent' onClick={() => handleOnClickDetail(p.id)}>
                <div>
                    {p.image.length !== 0 ? (
                        <div>
                            {
                                <img
                                    className="w-36  hover:transition ease-in-out delay-750 duration-1000 hover:w-40  max-h-40 "
                                    src={p.image[0]}
                                    alt="image"
                                />
                            }
                        </div>
                    ) : (
                        null
                    )}
                </div>
            </button>
            <div className="my-2">
                <div className="mono font-bold text-sm mx-4 h-16 text-slate-600 uppercase">
                    {p.name}
                </div>
                <div className="text-xs italic m-1 text-slate-400">
                    {p.brand}
                </div>


                <div className="text-base m-1 text-slate-600 font-bold flex flex-row items-center justify-around">


                    <p className='w-32 h-8'>U$S {p.price}</p>

                    <p className='w-10 h-8'><button className='w-2 hover:transition ease-in-out delay-750 duration-1000 hover:w-11 '></button></p>

                </div>


            </div>
        </div >
    )


}
export default Card
