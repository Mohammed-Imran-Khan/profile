# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




import React, { useState } from 'react';
import { imageAndRawData } from '../api/api';

function ImageAndRawData() {
    const [formInput, setFormInput] = useState({
        email: "",
        password: "",
        files: []
    });
    
    console.log("formInput", formInput);
    
    const handleInputChange = (field_name, value) => {
        if (field_name === "files") {
            setFormInput({
                ...formInput,
                files: [...value]
            });
        } else {
            setFormInput({
                ...formInput,
                [field_name]: value
            });
        }
    };

    const handleBtnClick = async () => {
        const formData = new FormData();
        
        <!-- formInput.files.forEach(file => {
            formData.append("file", file);
        }); -->

        formData.append("files", formInput.files);
        formData.append("email", formInput.email);
        formData.append("password", formInput.password);
        
        const result = await imageAndRawData(formData);
        console.log(result);
    };

    return (
        <>
            <div className='d-flex flex-column gap-3 justify-content-center'>
                <div>
                    <input
                        type="text"
                        className='form-control'
                        value={formInput.email}
                        name="email"
                        onChange={({ target }) => { handleInputChange(target.name, target.value) }}
                        placeholder='Enter Email'
                    />
                </div>
                <div>
                    <input
                        type="text"
                        className='form-control'
                        value={formInput.password}
                        name="password"
                        onChange={({ target }) => { handleInputChange(target.name, target.value) }}
                        placeholder='Enter Password'
                    />
                </div>
                <div>
                    <input
                        type="file"
                        multiple
                        className='form-control'
                        name="files"
                        onChange={({ target }) => { handleInputChange(target.name, target.files) }}
                    />
                </div>
                <div>
                    <button className='btn btn-outline-primary' onClick={handleBtnClick}>Click</button>
                </div>
                <div>
                    <h6>email: <strong>{formInput.email}</strong></h6>
                    <h6>password: <strong>{formInput.password}</strong></h6>
                    <h6>files: <strong>{formInput.files.length > 0 ? formInput.files.map(file => file.name).join(", ") : ""}</strong></h6>
                </div>
            </div>
        </>
    );
}

export default ImageAndRawData;





export const imageAndRawData = async(payload)=>{
    try{
        const response = await axios.post('/image/image-raw',payload,
            {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        return response.data
    }
    catch(err){
        return err
    }
}

<!-- export const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            const extension = path.extname(file.originalname);
            const filename = `${file.fieldname}-${Date.now()}${extension}`;
            cb(null, filename);
        }
    })
}); -->

<!-- export const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            const extension = path.extname(file.originalname);
            const filename = `${file.fieldname}-${Date.now()}${extension}`;
            cb(null, filename);
        }
    })
}); -->



