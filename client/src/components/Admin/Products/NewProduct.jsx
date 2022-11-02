import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import st from './NewProduct.module.css'
import { useDispatch } from 'react-redux'
import { DriveFolderUpload } from '@mui/icons-material'
import { createProduct } from '../../../redux/actions'

export default function NewProduct() {
    const dispatch = useDispatch()

    const [input, setInput] = useState({
        name: '',
        brand: '',
        category: '',
        color: '',
        genre: '',
        description: '',
        price: '',
        stock: '',
        size: '',
        image: '',
    })

    const [nav, setNav] = useState(false)

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    const handleCreate = (e) => {
        if (e.target.name === 'create') {
            dispatch(createProduct(input))
            //window.location.reload(true)
            setNav(true)
        }
    }

    return (
        <div className={st.newUser}>
            <h1 className={st.newUserTitle}>New Product</h1>
            <form onSubmit={handleCreate} className={st.newUserForm}>
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
                    <input
                        type="text"
                        name="brand"
                        placeholder="Product brand"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className={st.newUserItem}>
                    <label>Category</label>
                    <input
                        type="text"
                        name="category"
                        placeholder="Accesories, Pants, Shoes..."
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className={st.newUserItem}>
                    <label>Color</label>
                    <input
                        type="text"
                        name="color"
                        placeholder="Product color"
                        onChange={(e) => handleChange(e)}
                    />
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
                        <option name="men" value="men">
                            Male
                        </option>
                        <option name="women" value="women">
                            Women
                        </option>
                        <option name="unisex" value="unisex">
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
                    <label>Stock</label>
                    <input
                        type="number"
                        name="stock"
                        placeholder="Available stock"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className={st.newUserItem}>
                    <label>Sizes</label>
                    <input
                        type="text"
                        name="size"
                        placeholder="Available sizes"
                        onChange={(e) => handleChange(e)}
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
                    <label>Image</label>
                    <div className={st.userUpdateUpload}>
                        <img
                            className={st.userUpdateImg}
                            src=""
                            alt="Profile Pic"
                        />
                        <label for="file">
                            <DriveFolderUpload className={st.userUpdateIcon} />
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
                    name="create"
                    onClick={handleCreate}
                    className={st.createNewUser}
                >
                    Create
                </button>
            </form>
            {nav ? <Navigate to={'/adminView/products'} /> : null}
        </div>
    )
}
