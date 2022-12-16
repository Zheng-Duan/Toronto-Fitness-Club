import React, { useState} from "react";
import UserData from "../../service/userData";
import {useNavigate} from 'react-router-dom';

import {
  Form,
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Image,
} from "react-bootstrap";

const Register = () => {


    const initialRegisterState = {
        username: "",
        password: "",
        password2: "",
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
    };

    const [registerState, setRegisterState] = useState(initialRegisterState);

    const navigate = useNavigate();


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRegisterState({ ...registerState, [name]: value });
    };
    
    const updateUser = (event) => {
        if (registerState.password === "") {
            alert('password is required');
        }else {
            UserData.signUpNewUser(registerState)
            .then((res) => {
                navigate('/login')
            })
            .catch((e) => {
                alert(JSON.stringify(e.response.data));
            });
        }
        event.preventDefault();
    };
  

  return (
    <>
    <div >
      <div className=" w-25 mx-auto mt-5" ><br/><br/>
        <h3 align="center">Register Your Account Today!</h3>
        <form >

          <Form.Group className="row mb-3 mt-5">
            <Form.Label className="col-4">Username</Form.Label>
          <Form.Control className="col" type="text" name="username" placeholder="Username" 
            onChange={handleInputChange} value={registerState.username}/>
    
          </Form.Group>
          
          <Form.Group className="row mb-3" >
            <Form.Label className="col-4">Password</Form.Label>
            <Form.Control className="col" type="password" name="password" placeholder="Password" 
            onChange={handleInputChange} value={registerState.password}/>
          </Form.Group>
      
          <Form.Group className="row mb-3" >
            <Form.Label className="col-4">Password2</Form.Label>
            <Form.Control className="col" type="password" name="password2" placeholder="Password Again" 
              onChange={handleInputChange} value={registerState.password2}/>
              </Form.Group>
          
          
              <Form.Group className="row mb-3" >
          <Form.Label className="col-4">First Name</Form.Label>
          <Form.Control className="col" type="text" name="first_name" placeholder="First Name" 
            onChange={handleInputChange} value={registerState.first_name}/></Form.Group>
          

          <Form.Group className="row mb-3" >
          <Form.Label className="col-4">Last Name</Form.Label>
          <Form.Control className="col" type="text" name="last_name" placeholder="Last Name" 
            onChange={handleInputChange} value={registerState.last_name}/></Form.Group>
        
        <Form.Group className="row mb-3" >
          <Form.Label className="col-4">Email</Form.Label>
          <Form.Control className="col" type="text" name="email" placeholder="Email" 
            onChange={handleInputChange} value={registerState.email}/></Form.Group>
          

          <Form.Group className="row mb-3" >
          <Form.Label className="col-4">Phone Number</Form.Label>
          <Form.Control className="col" type="text" name="phone_number" placeholder="Phone" 
            onChange={handleInputChange} value={registerState.phone_number}/></Form.Group><br/>
    
          <Button className="w-100" variant="danger" type="submit" onClick={updateUser}>Register</Button>
        </form>
      </div></div>
    </>
  );
};

export default Register;