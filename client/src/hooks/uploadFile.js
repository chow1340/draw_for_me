import React,{useState, useEffect} from 'react';
import axios from 'axios';
const uploadFile = (props) => {
    const[file, setFile] = useState(); 
    
    const handleFileChange = e => {
        setFile(e.target.files[0])
    }

    const handleUpload = e =>{
        const formdata = new FormData();
        formdata.append('file', file);
        axios({
            url: props.api,
            method: "POST",
            data: formdata,
            headers: {
                'content-type' : 'multipart/form-data'
            }
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err.response.data);
        })
    }
}

export default SingleFileUploader