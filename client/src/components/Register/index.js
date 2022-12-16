import React from "react";
import { useState } from "react";
import axios from 'axios';

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
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [avatar, setAvatar] = useState("");

    // const testObject = {
    //     username: "username",
    //     password: "password",
    //     password2: "password",
    //     first_name: "firstName",
    //     last_name: "lastName",
    //     email: "email",
    //     phone_number: "123456",
    //     avatar:null,
    // }

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("http://localhost:8000/accounts/register/", {
                method: "POST",
                body: JSON.stringify({
                    "username": username,
                    "password": password,
                    "password2": password,
                    "first_name": firstName,
                    "last_name": lastName,
                    "email": email,
                    "phone_number": phoneNumber,
                    "avatar":null,
                }),
            });
            let resJson = await res.json();
            if (res.status === 200) {
                setUserName("");
                setEmail("");
                console.log("User created successfully");
            } else {
                console.log("Some error occured",res.status);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            Register page
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input type="text" value={username} name="username" onChange={(e) => setUserName(e.target.value)}
                    />
                    <br />
                    {console.log("name",username)}
                    <label>Password</label>
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                    <br />

                    <label>Password2</label>
                    <input type="password" name="password2"  />
                    <br />

                    <label>First Name</label>
                    <input type="text" name="first_name" onChange={(e) => setFirstName(e.target.value)}/>
                    <br />

                    <label>Last Name</label>
                    <input type="text" name="last_name" onChange={(e) => setLastName(e.target.value)}/>
                    <br />

                    <label>Email</label>
                    <input type="text" name="email" onChange={(e) => setEmail(e.target.value)}/>
                    <br />

                    <label>Phone Number</label>
                    <input type="text" name="phone_number" onChange={(e) => setPhoneNumber(e.target.value)}/>
                    <br />

                    {/* <label>Avatar</label>
                    <input type="file" accept="image/*" name="avatar" onChange={(e) => setAvatar(e.target.value)}/>
                    <br /> */}

                    <Button type="submit">Register</Button>
                </form>
            </div>
        </>
    );
};

export default Register;