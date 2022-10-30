import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Chart from '../HomaPage/Chart'
import st from './Product.module.css'
import {productData} from '../../../dummyData.js'
import { getProductDetail } from '../../../redux/actions'

export default function Product() {

    const {productId} = useParams(); //usar el mismo nombre de variable que en la ruta principal
    const dispatch = useDispatch()
    let Product = useSelector(state => state.details);

    useEffect(() =>{
        dispatch(getProductDetail(productId));
    }, [getProductDetail]);

    let props = {};

    console.log('SOY EL PRODUCT: ', Product)

    Product ? Product.map( obj => {props = {
        id: obj._id,
        name: obj.name,
        brand: obj.brand.name,
        category: obj.category[0].name,
        color: obj.color,
        genre: obj.genre,
        description: obj.description,
        price: obj.price,
        stock: obj.stock,
        size: obj.size,
        active: String(obj.active)
    }}) : console.log('Algo esta pasando')

    console.log('SOY LAS PROPS: ', props)

    return (
    <div className={st.product}>
        <h1 className={st.productTitle}>Product</h1>
        
        <div className={st.productInfo}>
            <div className={st.productInfoTop}>
                <div className={st.productInfoHeader}>
                    <span className={st.productName}>{props.name}</span>
                    <img src="https://i.pinimg.com/originals/84/43/70/8443707e7ccb844b7c3fc92294d2cfb3.jpg" alt="T-Shirt" className={st.productImage}/>
                </div>
                <div className={st.productInfoDetails}>
                    
                    <div className={st.productInfoItem}>
                        <span className={st.productInfoKey}>ID:</span>
                        <span className={st.productInfoValue}>{props.id}</span>
                    </div>
                    <div className={st.productInfoItem}>
                        <span className={st.productInfoKey}>Brand:</span>
                        <span className={st.productInfoValue}>{props.brand}</span>
                    </div>
                    <div className={st.productInfoItem}>
                        <span className={st.productInfoKey}>Category:</span>
                        <span className={st.productInfoValue}>{props.category}</span>
                    </div>
                    <div className={st.productInfoItem}>
                        <span className={st.productInfoKey}>Color:</span>
                        <span className={st.productInfoValue}>{props.color}</span>
                    </div>
                    <div className={st.productInfoItem}>
                        <span className={st.productInfoKey}>Genre:</span>
                        <span className={st.productInfoValue}>{props.genre}</span>
                    </div>
                    <div className={st.productInfoItem}>
                        <span className={st.productInfoKey}>Description:</span>
                        <span className={st.productInfoValue}>{props.description}</span>
                    </div>
                    <div className={st.productInfoItem}>
                        <span className={st.productInfoKey}>Price:</span>
                        <span className={st.productInfoValue}>USD {props.price}</span>
                    </div>
                    <div className={st.productInfoItem}>
                        <span className={st.productInfoKey}>Total Stock:</span>
                        <span className={st.productInfoValue}>{props.stock}</span>
                    </div>
                    <div className={st.productInfoItem}>
                        <span className={st.productInfoKey}>Available Sisez:</span>
                        <span className={st.productInfoValue}>S, M, L</span>
                    </div>
                    <div className={st.productInfoItem}>
                        <span className={st.productInfoKey}>Active:</span>
                        <span className={st.productInfoValue}>{props.active}</span>
                    </div>
                    <div className={st.productInfoItem}>
                        <Link to={'/adminview/product/edit/' + props.id}>
                            <button className={st.productEditButton}>Edit</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={st.productInfoBottom}>
                <Chart className={st.productTopChart} data={productData} dataKey='Sales' title='Sales performance' grid/>
            </div>
        </div>
    </div>
    )
};
