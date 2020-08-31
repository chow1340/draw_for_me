
import React, {useState} from "react";
import {Form, Label, Group, Text, Control, Button, Alert, Row} from 'react-bootstrap'
import axios from 'axios'
import { useForm } from "react-hook-form";


const LogIn = () => {
    const { handleSubmit, register, watch, errors } = useForm();
    const [errorMessage, setErrorMessage] = useState();
    const [hasError, setHasError] = useState(false);
    const onSubmit = data => {
        axios.post(
        '/api/auth/login',
        data,
        )
        .then(res => {
            setErrorMessage(res.data);
            setHasError(false);
            console.log(`Axios Call completed: ${JSON.stringify(res)}`)
        })
        .catch(err => {
            // console.log(err.response);
            setErrorMessage(err.response.data);
            setHasError(true);
            console.log(err.response.data);
            console.log(`Axios Call Error: ${JSON.stringify(err.response)}`)
        });

        console.log(data);
    }
  
    function AlertMessage() {
        if (hasError && errorMessage) {
           return(
            <Alert variant="danger">
                {errorMessage}
            </Alert>
           );
        } else if (!hasError && errorMessage){
            return (
            <Alert variant="success">
                {errorMessage}
            </Alert>
            );
        }
    }

  return (
    <div class="container">
        <form onSubmit={handleSubmit(onSubmit)}>
            <Form role="form">
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                name = "username" type="username" placeholder="Enter Username" 
                ref={register({
                required: "Required"
                })}
                />
                {errors.username && errors.username.message}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                name="password" type="password" placeholder="Password" 
                ref={register({
                })}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Log In
            </Button>
            </Form>
        </form>
        <div className = "alertMessage">
            {AlertMessage()}
        </div>      
    </div>
    );
};

export default LogIn