import React, { useState, useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Clou from '../../ImageCloudinary/ImageCloudinary'
import st from './ProductEdit.module.css'
import { updateProduct, getCategories, getBrands, getColors } from '../../../redux/actions'


export default function ProductEdit({changePage, editMode}) {
    // console.log('HOLA SOY LAS PROPS: ', props)

    const dispatch = useDispatch() 

    const productInfo = useSelector((state) => state.details);
    const categories = useSelector((state) => state.categories);
    const brands = useSelector((state) => state.brands);
    const colors = useSelector((state) => state.colors);
    // console.log('HOLA SOY EL PRODUCTO: ', productInfo)

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getBrands())
        dispatch(getColors())
    },[]);

    let info = {}

    if(productInfo.brand && productInfo.category && productInfo.size){
        info = {
        id: productInfo._id,
        name: productInfo.name,
        brand: productInfo.brand.name,
        category: productInfo.category[0].name,
        color: productInfo.color,
        genre: productInfo.genre,
        description: productInfo.description,
        price: productInfo.price,
        stock: productInfo.stock,
        size: productInfo.size,
        sizeXS: productInfo.size[0].stock,
        sizeS: productInfo.size[1].stock,
        sizeM: productInfo.size[2].stock,
        sizeL: productInfo.size[3].stock,
        sizeXL: productInfo.size[4].stock,
        image: productInfo.image,
        active: productInfo.active,
        featured: productInfo.featured,
        }

    } else console.log('Algo esta pasando')
    // console.log('SOY LA INFOOO: ', info)

    const [input, setInput] = useState({})

    const [nav, setNav] = useState(false)

    useEffect(()=>{
        productInfo.size?
        setInput({    
            ...productInfo,
            sizeXS: {size: "XS", stock: productInfo.size[0].stock},
            sizeS: {size: "S", stock: productInfo.size[1].stock},
            sizeM: {size: "M", stock: productInfo.size[2].stock},
            sizeL: {size: "L", stock: productInfo.size[3].stock},
            sizeXL: {size: "XL", stock: productInfo.size[4].stock}
        })
        : console.log('Algo esta pasando en el useEffect')
    }, [productInfo])

    // console.log('SOY EL INPUT: ', input)

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    const handleChangeCategoryAndBrand = (e) => {
        if (e.target.name === "brand"){
            const objBrand = brands.filter((br) => br.name === e.target.value)
            setInput({
                ...input,
                [e.target.name]: objBrand[0]
            })
        } else if (e.target.name === "category"){
            const objCateg = categories.filter((cat) => cat.name === e.target.value)
            setInput({
                ...input,
                [e.target.name]: objCateg
            })
        }
    }

    const handleChangeSize = (e) =>{

        if (e.target.name === "sizeXS"){
            setInput({
                ...input,
                sizeXS: {size: "XS", stock: Number(e.target.value)},
                size: [{size: "XS", stock: Number(e.target.value)}, input.sizeS, input.sizeM, input.sizeL, input.sizeXL],
                stock: Number(e.target.value) + input.sizeS.stock + input.sizeM.stock + input.sizeL.stock + input.sizeXL.stock
            })
        } else if (e.target.name === "sizeS") {
            setInput({
                ...input,
                sizeS: {size: "S", stock: Number(e.target.value)},
                size: [input.sizeXS, {size: "S", stock: Number(e.target.value)}, input.sizeM, input.sizeL, input.sizeXL],
                stock: input.sizeXS.stock + Number(e.target.value) + input.sizeM.stock + input.sizeL.stock + input.sizeXL.stock
            })
        } else if (e.target.name === "sizeM") {
            setInput({
                ...input,
                sizeM: {size: "M", stock: Number(e.target.value)},
                size: [input.sizeXS, input.sizeS, {size: "M", stock: Number(e.target.value)}, input.sizeL, input.sizeXL],
                stock: input.sizeXS.stock + input.sizeS.stock + Number(e.target.value) + input.sizeL.stock + input.sizeXL.stock
            })
        } else if (e.target.name === "sizeL") {
            setInput({
                ...input,
                sizeL: {size: "L", stock: Number(e.target.value)},
                size: [input.sizeXS, input.sizeS, input.sizeM, {size: "L", stock: Number(e.target.value)}, input.sizeXL],
                stock: input.sizeXS.stock + input.sizeS.stock + input.sizeM.stock + Number(e.target.value) + input.sizeXL.stock
            })
        } else if (e.target.name === "sizeXL") {
            setInput({
                ...input,
                sizeXL: {size: "XL", stock: Number(e.target.value)},
                size: [input.sizeXS, input.sizeS, input.sizeM, input.sizeL, {size: "XL", stock: Number(e.target.value)}],
                stock: input.sizeXS.stock + input.sizeS.stock + input.sizeM.stock + input.sizeL.stock + Number(e.target.value)
            })
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault()

        if (e.target.name === 'update') {
            dispatch(updateProduct(info.id, input))
            console.log('SOY EL INPUT FINAL: ', input)
            setNav(true)
        }
        //window.location.reload(true)
 
    }


    return (
        <div className={st.productUpdate}>
            <span className={st.productUpdateTitle}>Edit</span>
            <form onSubmit={handleUpdate} className={st.productUpdateForm}>
                <div className={st.productUpdateLeft}>
                    <div className={st.productUpdateItem}>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder={info.name}
                            className={st.productUpdateInput}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className={st.productUpdateItem}>
                        <label>Brand</label>
                        <select
                        name="brand"
                        defaultValue=""
                        className={st.productUpdateInput}
                        onChange={(e) => handleChangeCategoryAndBrand(e)}
                        >
                        <option hidden value=""> {info.brand} </option> 
                        {brands && brands.map(brand => (
                            <option name={brand.name} value={brand.name} key={brand.name}>{brand.name}</option>  
                            )) 
                        }
                        </select>
                    </div>
                    <div className={st.productUpdateItem}>
                        <label>Category</label>
                        <select
                        name="category"
                        defaultValue=""
                        className={st.productUpdateInput}
                        onChange={(e) => handleChangeCategoryAndBrand(e)}
                        >
                        <option hidden value=""> {info.category} </option>
                        {categories && categories.map(cat => (
                            <option name={cat.name} value={cat.name} key={cat.name}>{cat.name}</option> 
                            )) 
                        }
                        </select>
                    </div>
                    <div className={st.productUpdateItem}>
                        <label>Color</label>
                        <select
                        name="color"
                        defaultValue=""
                        className={st.productUpdateInput}
                        onChange={(e) => handleChange(e)}
                        >
                        <option hidden value=""> {info.color} </option>
                        {colors && colors.map(col => (
                            <option name={col.name} value={col.name} key={col.name}>{col.name}</option> 
                            )) 
                        }
                        </select>
                    </div>
                    <div className={st.productUpdateItem}>
                        <label>Gender</label>
                        <select
                            name="genre"
                            defaultValue=""
                            className={st.productUpdateInput}
                            onChange={(e) => handleChange(e)}
                        >
                            <option hidden value="">
                                {info.genre}
                            </option>
                            <option name="Mens" value="Mens">
                                Mens
                            </option>
                            <option name="Womens" value="Womens">
                                Womens
                            </option>
                            <option name="Unisex" value="Unisex">
                                Unisex
                            </option>
                        </select>
                    </div>
                    <div className={st.productUpdateItem}>
                        <label>Description</label>
                        <input
                            type="text"
                            name="description"
                            placeholder={info.description}
                            className={st.productUpdateInput}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className={st.productUpdateItem}>
                        <label>Price</label>
                        <input
                            type="number"
                            name="price"
                            placeholder={info.price}
                            className={st.productUpdateInput}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className={st.productUpdateItem}>
                        <label>Stock Sizes XS</label>
                        <input
                            type="number"
                            name="sizeXS"
                            placeholder={info.sizeXS}
                            onChange={(e) => handleChangeSize(e)}
                            className={st.productUpdateInput}
                        />
                        <label>Stock Sizes S</label>
                        <input
                            type="number"
                            name="sizeS"
                            placeholder={info.sizeS}
                            onChange={(e) => handleChangeSize(e)}
                            className={st.productUpdateInput}
                        />
                        <label>Stock Sizes M</label>
                        <input
                            type="number"
                            name="sizeM"
                            placeholder={info.sizeM}
                            onChange={(e) => handleChangeSize(e)}
                            className={st.productUpdateInput}
                        />
                        <label>Stock Sizes L</label>
                        <input
                            type="number"
                            name="sizeL"
                            placeholder={info.sizeL}
                            onChange={(e) => handleChangeSize(e)}
                            className={st.productUpdateInput}
                        />
                        <label>Stock Sizes XL</label>
                        <input
                            type="number"
                            name="sizeXL"
                            placeholder={info.sizeXL}
                            onChange={(e) => handleChangeSize(e)}
                            className={st.productUpdateInput}
                        />
                    </div>
                    <div className={st.productUpdateItem}>
                        <label>Active</label>
                        <select
                            name="active"
                            defaultValue=""
                            className={st.productUpdateInput}
                            onChange={(e) => handleChange(e)}
                        >
                            <option hidden value="">
                                {String(info.active)}
                            </option>
                            <option name="true" value="true">
                                Active
                            </option>
                            <option name="false" value="false">
                                Disabled
                            </option>
                        </select>
                    </div>
                    <div className={st.productUpdateItem}>
                        <label>Featured</label>
                        <select
                            name="featured"
                            defaultValue=""
                            onChange={(e) => handleChange(e)}
                            className={st.productUpdateInput}
                        >
                            <option hidden value="">
                                {String(info.featured)}
                            </option>
                            <option name="true" value="true">
                                True
                            </option>
                            <option name="false" value="false">
                                False
                            </option>
                        </select>
                    </div>
                    <div className={st.productUpdateItem}>
                        <div className={st.productUpdateUpload}>
                            <img
                                className={st.productUpdateImg}
                                src={info.image}
                                alt="Product Img"
                            />
                            <label htmlFor="file">
                                <Clou
                                    setEditInput={setInput}
                                    editInput={input}
                                /> 
                            </label>
                            <input
                                name="image"
                                type="file"
                                id="file"
                                style={{ display: 'none' }}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>

                    <button
                        name="update"
                        onClick={handleUpdate}
                        className={st.productUpdateBotton}
                    >
                        Update
                    </button>

                    <button
                        onClick={changePage}
                        // className={st.productUpdateBotton}
                    >
                        Back
                    </button>
                </div>
            </form>

            {nav ? <Navigate to={'/adminView/products/'} /> : null}
        </div>
    )
}
