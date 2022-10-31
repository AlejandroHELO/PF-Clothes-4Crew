import React, {useState} from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
// import Clou from "../../ImageCloudinary/ImageCloudinary";
import { DriveFolderUpload } from '@mui/icons-material'
import st from './ProductEdit.module.css'
import { updateProduct } from '../../../redux/actions'

export default function ProductEdit(props) {
  // console.log('HOLA SOY PROPS', props)
  const dispatch = useDispatch()

  const [input, setInput] = useState({
    id: props._id,
    name: props.name,
    brand: props.brand,
    category: props.category,
    color: props.color,
    genre: props.genre,
    description: props.description,
    price: props.price,
    stock: props.stock,
    size: props.size,
    image: props.image,
    active: String(props.active)
  })

  console.log('SOY EL INPUT: ', input)

  const handleChange = (e) => {
    e.preventDefault();
    setInput((prev) => ({ 
    ...prev, 
    [e.target.name]: e.target.value,
  }))}

  const handleUpdate = (e) => {
    e.preventDefault()
    // console.log(e.target.name)
    if (e.target.name === 'update'){
      dispatch(updateProduct(props.id, input))
      //window.location.reload(true)
      setNav(true)
    }
  };

  const [nav, setNav] = useState(false)

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
            placeholder={props.name} 
            className={st.productUpdateInput}
            onChange={(e) => handleChange(e)}/>
          </div>
          <div className={st.productUpdateItem}>
            <label>Brand</label>
            <input 
            type="email"
            name="brand"
            placeholder={props.brand} 
            className={st.productUpdateInput}
            onChange={(e) => handleChange(e)}/>
          </div>
          <div className={st.productUpdateItem}>
            <label>Category</label>
            <input 
            type="text"
            name="category"
            placeholder={props.category} 
            className={st.productUpdateInput}
            onChange={(e) => handleChange(e)}/>
          </div>
          <div className={st.productUpdateItem}>
            <label>Color</label>
            <input 
            type="text"
            name="color"
            placeholder={props.color} 
            className={st.productUpdateInput}
            onChange={(e) => handleChange(e)}/>
          </div>
          <div className={st.productUpdateItem}>
            <label>Gender</label>
            <select name="genre" defaultValue="" className={st.productUpdateInput} onChange={(e) => handleChange(e)}>
              <option hidden value="">Select a gender</option>
              <option name="men" value="men">Male</option>
              <option name="women" value="women">Women</option>
              <option name="unisex" value="unisex">Unisex</option>
            </select>
          </div>
          <div className={st.productUpdateItem}>
            <label>Description</label>
            <input 
            type="text"
            name="description"
            placeholder="Insert a description"
            className={st.productUpdateInput}
            onChange={(e) => handleChange(e)}/>
          </div>
          <div className={st.productUpdateItem}>
            <label>Price</label>
            <input 
            type="number"
            name="price"
            placeholder={props.price}
            className={st.productUpdateInput}
            onChange={(e) => handleChange(e)}/>
          </div>
          <div className={st.productUpdateItem}>
            <label>Stock</label>
            <input 
            type="number"
            name="stock"
            placeholder={props.stock}
            className={st.productUpdateInput}
            onChange={(e) => handleChange(e)}/>
          </div>
          <div className={st.productUpdateItem}>
            <label>Sizes</label>
            <input 
            type="text"
            name="size"
            placeholder="Sizes available"
            className={st.productUpdateInput}
            onChange={(e) => handleChange(e)}/>
          </div>
          <div className={st.productUpdateItem}>
            <label>Active</label>
            <select name="active" defaultValue="" className={st.productUpdateInput} onChange={(e) => handleChange(e)}>
              <option hidden value="">Select a status</option>
              <option name="true" value="true">Active</option>
              <option name="false" value="false">Disabled</option>
            </select>
          </div>
          <div className={st.productUpdateItem}>
            <div className={st.productUpdateUpload}>
              <img className={st.productUpdateImg} src={props.image} alt="Product Img" />
              <label for="file">
                <DriveFolderUpload className={st.productUpdateIcon}/>
                {/* <Clou
                    seteditinput={setInput}
                    editinput={input}
                />  */}
              </label>
              <input name="image" type="file" id='file' style={{display: "none"}} onChange={(e) => handleChange(e)}/>
            </div>
          </div>
          
          <button name='update' onClick={handleUpdate} className={st.productUpdateBotton}>Update</button>
        </div>
      </form>
      { nav? <Navigate to={'/adminView/products'} /> : null}
    </div>
  )
};