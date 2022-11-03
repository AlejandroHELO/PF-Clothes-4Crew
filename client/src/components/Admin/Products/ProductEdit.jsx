import React, { useState, useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import Clou from "../../ImageCloudinary/ImageCloudinary";
import { DriveFolderUpload } from '@mui/icons-material'
import st from './ProductEdit.module.css'
import { updateProduct, getCategories, getBrands } from '../../../redux/actions'

export default function ProductEdit(productInfo) {
    console.log('HOLA SOY LAS PROPS: ', productInfo)
    const dispatch = useDispatch() 

    const categories = useSelector((state) => state.categories);
    const brands = useSelector((state) => state.brands);

    useEffect(() => {
        if (!categories.length || !brands.length) {
            dispatch(getCategories())
            dispatch(getBrands())
        }
    },[categories, brands]);

    let info = {}

    productInfo.image?
        info = {
        id: productInfo._id,
        name: productInfo.name,
        brand: productInfo.brand,
        category: productInfo.category,
        color: productInfo.color,
        genre: productInfo.genre,
        description: productInfo.description,
        price: productInfo.price,
        stock: productInfo.stock,
        size: productInfo.size,
        image: productInfo.image,
        active: productInfo.active,
        featured: productInfo.featured,
        }
    : console.log('Algo esta pasando')
    console.log('SOY LA INFOOO: ', info)

    const [input, setInput] = useState({
        name: info.name,
        brand: info.brand,
        category: info.category,
        color: info.color,
        genre: info.genre,
        description: info.description,
        price: info.price,
        sizeXS: {size: "XS", stock: info.size[0].stock},
        sizeS: {size: "S", stock: info.size[1].stock},
        sizeM: {size: "M", stock: info.size[2].stock},
        sizeL: {size: "L", stock: info.size[3].stock},
        sizeXL: {size: "XL", stock: info.size[4].stock},
        size: info.size,
        stock: info.stock,
        image: info.image,
        active: info.active,
        featured: info.featured,
    })

    // console.log('SOY EL INPUT: ', input)

    const [nav, setNav] = useState(false)

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
                        <option hidden value=""> {info.brand.name} </option> 
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
                        <option hidden value=""> {info.category[0].name} </option>
                        {categories && categories.map(cat => (
                            <option name={cat.name} value={cat.name} key={cat.name}>{cat.name}</option> 
                            )) 
                        }
                        </select>
                    </div>
                    <div className={st.productUpdateItem}>
                        <label>Color</label>
                        <input
                            type="text"
                            name="color"
                            placeholder={info.color}
                            className={st.productUpdateInput}
                            onChange={(e) => handleChange(e)}
                        />
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
                            placeholder={info.size[0].stock}
                            onChange={(e) => handleChangeSize(e)}
                            className={st.productUpdateInput}
                        />
                        <label>Stock Sizes S</label>
                        <input
                            type="number"
                            name="sizeS"
                            placeholder={info.size[1].stock}
                            onChange={(e) => handleChangeSize(e)}
                            className={st.productUpdateInput}
                        />
                        <label>Stock Sizes M</label>
                        <input
                            type="number"
                            name="sizeM"
                            placeholder={info.size[2].stock}
                            onChange={(e) => handleChangeSize(e)}
                            className={st.productUpdateInput}
                        />
                        <label>Stock Sizes L</label>
                        <input
                            type="number"
                            name="sizeL"
                            placeholder={info.size[3].stock}
                            onChange={(e) => handleChangeSize(e)}
                            className={st.productUpdateInput}
                        />
                        <label>Stock Sizes XL</label>
                        <input
                            type="number"
                            name="sizeXL"
                            placeholder={info.size[4].stock}
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
                            className={st.productUpdateInput}
                            onChange={(e) => handleChange(e)}
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
                                <DriveFolderUpload
                                    className={st.productUpdateIcon}
                                />
                                {/* <Clou
                                    seteditinput={setInput}
                                    editinput={input}
                                />  */}
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
                </div>
            </form>
            {nav ? <Navigate to={'/adminView/products'} /> : null}
        </div>
    )
}
