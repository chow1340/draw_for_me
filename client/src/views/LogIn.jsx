
import React from "react";
import {Form, Label, Group, Text, Control, Button} from 'react-bootstrap'
import axios from 'axios'
import { useForm } from "react-hook-form";



const LogIn = () => {
  const { handleSubmit, register, watch, errors } = useForm(); 
  const user = {
    "email" : "testemail",
    "password" : "123",
    "confirmPassword" : "123",
  }
  const onSubmit = data => {
    axios.post(
      '/api/user/add',
      user
    )
    .then(res => {
        console.log(`Axios Call completed: ${JSON.stringify(res)}`)
    })
    .catch(err => {
      console.log(`Axios Call Error: ${JSON.stringify(err)}`)
    });

    console.log(user);
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

export default LogIn