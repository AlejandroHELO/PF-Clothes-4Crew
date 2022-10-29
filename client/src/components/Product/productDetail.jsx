import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from  'react-router-dom';
import { clearDetail, getProductDetail } from '../../redux/actions';
import Navbar from '../navbar/navbar';


function ProductDetail() {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const product = useSelector((state) => state.details)   

    React.useEffect(() => {
        dispatch(getProductDetail(productId));
        return () => {
            dispatch(clearDetail());
        }
    }, [dispatch, productId])
    
    return( 
        <div>
            <Navbar></Navbar>
             {product ? (
                <div>
                    <img src={product.image} alt={product}/>
                    <h3>{product.price}</h3>
                    <h3>{product.name}</h3>
                    <h4>{product.category.name}</h4>
                    <h4>{product.brand.name}</h4>
                    <p>{product.description}</p>
                    <h4>Stock: {product.stock}</h4>
                    <h5>{product.genre}</h5>
                </div>
            ) : (
                'Loading...'
            )}
        </div>
    )
    
}


export default ProductDetail;