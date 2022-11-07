import React, { useState, useEffect } from 'react'
import { CloudinaryContext, Image } from 'cloudinary-react'
import { fetchPhotos, openUploadWidget } from '../../CloudinaryService.js'
import { DriveFolderUpload } from '@mui/icons-material'

export default function Clou({ editInput, setEditInput, setError=false, validationError }) {

  const beginUpload = async tag => {
    const uploadOptions = {
      cloudName: "alehl",
      tags: [tag, 'anImage'],
      uploadPreset: "upload"
    };
    await openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        console.log('SOY EL EVENT', photos.event)
        if (photos.event === 'success') {
          console.log('SOY LA FOTO', photos)
          setEditInput({ ...editInput, image: [...editInput.image, photos.info.secure_url] })
          if(setError){
            setError(validationError({ ...editInput, image: photos.info.secure_url }))
          }
        }
      } else {
      }})
  }

  useEffect(() => {
    fetchPhotos("image", editInput.image);
  }, [])

  return (
    <CloudinaryContext cloudName="alehl">
      <div >
        <button onClick={() => beginUpload("image")}> <DriveFolderUpload style={{ "cursor": "pointer", "fontSize": "35px !important"}} /> </button>
      </div>
    </CloudinaryContext>
  )

  // const [image, setImage] = useState("")

  // const [loading, setLoading] = useState(false)

  // const uploadImage = async (e) => {
  //     const files = e.target.files;
  //     const data = new FormData();
  //     data.append("file", files[0]);
  //     data.append("upload_preset", "Clothes4Crew")
  //     setLoading(true);
  //     const res = await fetch(
  //         "https://api.cloudinary.com/v1_1/alehl/image/upload",
  //         {
  //             method: "POST",
  //             body: data
  //         }
  //     )
  //     const file = await res.json()
  //     console.log(res)
  //     setImage(file.secure_url)
  //     console.log('URL: ', file.secure_url)
  //     setLoading(false)
  // }

  // return (
  //     <form action="">
  //         <label htmlFor="file">
  //         <DriveFolderUpload
  //             style={{cursor: "pointer", fontSize: "35px !important"}}
  //             />
  //         {/* <Clou
  //             seteditinput={setInput}
  //             editinput={input}
  //         />  */}
  //         </label>
  //         <input
  //             name="image"
  //             type="file"
  //             id="file"
  //             style={{ display: 'none' }}
  //             onChange={uploadImage}
  //         />
  //     </form>
  // )
}