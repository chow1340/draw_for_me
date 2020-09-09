
import React, {useState} from "react";
import {Form, Label, Group, Text, Control, Button, Alert, Row} from 'react-bootstrap'
import axios from 'axios'
import { useForm } from "react-hook-form";
import { connect, useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

const LogIn = () => {
    const dispatch = useDispatch();
    const { handleSubmit, register, watch, errors } = useForm();
    const [errorMessage, setErrorMessage] = useState();
    const [hasError, setHasError] = useState(false);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const onSubmit = data => {
        axios.post(
        '/api/auth/login',
        data,
        )
        .then(res => {
            setErrorMessage(res.data);
            setHasError(false);
            // setIsLoggedIn(true);
            window.location = "/user/" + data.username;
        })
        .catch(err => {
            console.log(err.response);
            setErrorMessage(err.response.data);
            setHasError(true);
        });
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
    <div id="logInComponent" class="container">
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* <Form role="form"> */}
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
            {/* </Form> */}
        </form>
        <div className = "alertMessage">
            {AlertMessage()}
        </div>    
        {/* <button onClick = {() => {
          
            dispatch({
                type: loginType.LOG_OUT
            })
        }}>
                log out
        </button>
        <button onClick = {() => {
           
            dispatch({
                type: loginType.LOG_IN
            })
        }}>
                log in
        </button> */}
    </div>
    );
    
};


export default LogIn;