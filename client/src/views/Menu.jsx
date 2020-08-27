import React from 'react';
import Home from './Home';
import Register from './Register';
import Example from './Example';
import LogIn from './LogIn'
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
function Menu(){
    return(
        <Router>
        <div>
        {/* <Route path="/" exact component={Home} /> */}
            
        <Navbar bg="w" variant="light">
            <Navbar.Brand href="#home">Draw For Me</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Nav.Link ><Link to="example">E</Link></Nav.Link>
            <Nav.Link ><Link to="register">Create User</Link></Nav.Link>
            <Nav.Link ><Link to="logIn">Log In</Link></Nav.Link>
            </Nav>
            <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-primary">Search</Button>
            </Form>
        </Navbar>
        </div>
        
        <Route path="/register" exact component={Register} />
        <Route path="/logIn" exact component={LogIn} />
        <Route path="/example" exact component = {Example} />
        </Router>
    );
}

export default Menu