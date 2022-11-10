import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import st from './NewProduct.module.css'
import { createProduct, getCategories, getBrands, getColors } from '../../../redux/actions'
import Clou from '../../ImageCloudinary/ImageCloudinary'

export default function NewProduct() {
    const dispatch = useDispatch()

    const categories = useSelector((state) => state.categories);
    const brands = useSelector((state) => state.brands);
    const colors = useSelector((state) => state.colors);

    // console.log('SOY LAS BRANDS: ',brands)
    // console.log('SOY LAS CATEGORIES: ',categories)

    useEffect(() => {
        if (!categories.length || !brands.length || !colors) {
            dispatch(getCategories())
            dispatch(getBrands())
            dispatch(getColors())
        }
    },[categories, brands, colors]);

    const [input, setInput] = useState({
        name: '',
        brand: {},
        category: [],
        color: '',
        genre: '',
        description: '',
        price: '',
        sizeXS: {size: "XS", stock: 0},
        sizeS: {size: "S", stock: 0},
        sizeM: {size: "M", stock: 0},
        sizeL: {size: "L", stock: 0},
        sizeXL: {size: "XL", stock: 0},
        size: [],
        stock: 0,
        image: [],
        active: true,
        featured: false,
    })

    // setInput({
    //     ...input,
    //     size: [input.sizeXS, input.sizeS, input.sizeM, input.sizeL, input.sizeXL],
    //     stock: input.sizeXS.stock + input.sizeS.stock + input.sizeM.stock + input.sizeL.stock + input.sizeXL.stock
    // })

    const [nav, setNav] = useState(false)

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeCategBrandColor = (e) => {
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

    const handleCreate = (e) => {
        e.preventDefault()
        
        if (e.target.name === 'create') {
            // setInput({
            //     ...input,
            //     size: [input.sizeXS, input.sizeS, input.sizeM, input.sizeL, input.sizeXL],
            //     stock: input.sizeXS.stock + input.sizeS.stock + input.sizeM.stock + input.sizeL.stock + input.sizeXL.stock
            // })

            dispatch(createProduct(input))
            console.log('SOY EL INPUT FINAL: ', input)
            // window.location.reload(true)
        }
        setNav(true)
    }


    return (
        <div className={st.newUser}>
            <h1 className={st.newUserTitle}>New Product</h1>
            <form /* onSubmit={handleCreate} */ className={st.newUserForm}>
                <div className={st.newUserItem}>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Product name"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className={st.newUserItem}>
                    <label>Brand</label>
                    <select
                        name="brand"
                        defaultValue=""
                        className={st.productUpdateInput}
                        onChange={(e) => handleChangeCategBrandColor(e)}
                    >
                        <option hidden value="">
                            Select a brand
                        </option>
                        {brands && brands.map(brand => (
                            <option name={brand.name} value={brand.name} key={brand.name}>{brand.name}</option>  
                            )) 
                        }
                    </select>
                </div>
                <div className={st.newUserItem}>
                    <label>Category</label>
                    <select
                        name="category"
                        defaultValue=""
                        className={st.productUpdateInput}
                        onChange={(e) => handleChangeCategBrandColor(e)}
                    >
                        <option hidden value="">
                            Select a category
                        </option>
                        {categories && categories.map(cat => (
                            <option name={cat.name} value={cat.name} key={cat.name}>{cat.name}</option> 
                            )) 
                        }
                    </select>
                </div>
                <div className={st.newUserItem}>
                    <label>Color</label>
                    <select
                        name="color"
                        defaultValue=""
                        className={st.productUpdateInput}
                        onChange={(e) => handleChange(e)}
                        >
                        <option hidden value=""> 
                            Select a color 
                        </option>
                        {colors && colors.map(col => (
                            <option name={col.name} value={col.name} key={col.name}>
                                {col.name}
                            </option> 
                            )) 
                        }
                    </select>
                </div>
                <div className={st.newUserItem}>
                    <label>Gender</label>
                    <select
                        name="genre"
                        defaultValue=""
                        onChange={(e) => handleChange(e)}
                    >
                        <option hidden value="">
                            Select a gender
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
                <div className={st.newUserItem}>
                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        placeholder="Product description"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className={st.newUserItem}>
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Product price"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className={st.newUserItem}>
                    <label>Sizes XS</label>
                    <input
                        type="number"
                        name="sizeXS"
                        placeholder="stock"
                        onChange={(e) => handleChangeSize(e)}
                    />
                    <label>Sizes S</label>
                    <input
                        type="number"
                        name="sizeS"
                        placeholder="stock"
                        onChange={(e) => handleChangeSize(e)}
                    />
                    <label>Sizes M</label>
                    <input
                        type="number"
                        name="sizeM"
                        placeholder="stock"
                        onChange={(e) => handleChangeSize(e)}
                    />
                    <label>Sizes L</label>
                    <input
                        type="number"
                        name="sizeL"
                        placeholder="stock"
                        onChange={(e) => handleChangeSize(e)}
                    />
                    <label>Sizes XL</label>
                    <input
                        type="number"
                        name="sizeXL"
                        placeholder="stock"
                        onChange={(e) => handleChangeSize(e)}
                    />
                </div>
                <div className={st.newUserItem}>
                    <label>Active</label>
                    <select
                        name="active"
                        defaultValue=""
                        className={st.productUpdateInput}
                        onChange={(e) => handleChange(e)}
                    >
                        <option hidden value="">
                            Select a status
                        </option>
                        <option name="true" value="true">
                            Active
                        </option>
                        <option name="false" value="false">
                            Disabled
                        </option>
                    </select>
                </div>
                <div className={st.newUserItem}>
                    <label>Featured</label>
                    <select
                        name="featured"
                        defaultValue=""
                        className={st.productUpdateInput}
                        onChange={(e) => handleChange(e)}
                    >
                        <option hidden value="">
                            Select an option
                        </option>
                        <option name="true" value="true">
                            True
                        </option>
                        <option name="false" value="false">
                            False
                        </option>
                    </select>
                </div>
                <div className={st.newUserItem}>
                    <label>Image</label>
                    <div className={st.userUpdateUpload}>
                        {/* <img
                            className={st.productUpdateImg}
                            src={input.image}
                            alt="Product Img"
                        /> */}
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

                <button name="create" onClick={handleCreate} className={st.createNewUser} >
                    Create
                </button>
            </form>
            {nav ? <Navigate to={'/adminView/products'} /> : null}
        </div>
    )
};
