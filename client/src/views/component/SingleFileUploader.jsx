import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {Form, Button} from 'react-bootstrap';
const SingleFileUploader = (props) => {
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
    return(
        <div class="container">
            <Form>
                <Form.Label>
                    Select a file
                </Form.Label>
                <Form.Control 
                name = "file" type="file" onChange={(e)=>handleFileChange(e)}
                />
            </Form>
            <Button onClick={(e)=>handleUpload(e)}>
                Upload
            </Button>
        </div>
    );
}

export default SingleFileUploader