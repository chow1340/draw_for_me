
import React from "react";
import {Form, Label, Group, Text, Control, Button} from 'react-bootstrap'
import axios from 'axios'
import { useForm } from "react-hook-form";



const LogIn = () => {
  const { handleSubmit, register, watch, errors } = useForm(); 
  const onSubmit = data => {
    axios.post(
      '/api/user/logIn',
      data,
    )
    .then(res => {
        console.log(`Axios Call completed: ${JSON.stringify(res)}`)
    })
    .catch(err => {
      console.log(`Axios Call Error: ${JSON.stringify(err)}`)
    });

    console.log(data);
  }
  

  return (
    <div class="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form role="form">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
            name = "email" type="email" placeholder="Enter email" 
            ref={register({
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address"
              }})}
            />
            {errors.email && errors.email.message}

            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
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
      
    </div>
    );
};

export default LogIn