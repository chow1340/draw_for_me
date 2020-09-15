
import React from "react";
import {Form, Label, Group, Text, Control, Button} from 'react-bootstrap'
import axios from 'axios'
import { useForm } from "react-hook-form";



const Register = () => {
  const { handleSubmit, register, watch, errors } = useForm(); 
  const onSubmit = data => {
    axios.post(
      '/api/auth/signup',
      data,
    )
    .then(res => {
        axios.post(
          '/api/auth/login',
          {
            username:data.username,
            password:data.password
          }
        ).catch(
          window.location="/error"
        )
    })
    .catch(err => {
        console.log(err.response);
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

          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control 
            name="username" type="username" placeholder="Username"
            ref={register({
              required: "Required",
              })}
            />
          </Form.Group>


          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
            name="password" type="password" placeholder="Password" 
            ref={register({
            })}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control name="confirmPassword" type="password" placeholder="Confirm Password"
            ref={register({
              validate: (value) => value === watch('password') || 
              <p>Passwords do not match</p>, 
            })} 
             />
             {errors.confirmPassword && errors.confirmPassword.message}
          </Form.Group>
          <Button variant="primary" type="submit">
            Create User
          </Button>
        </Form>
      </form>
      
    </div>
    );
};

export default Register