import React, { useState, useEffect } from "react";
import { UserState } from "../../context/Context";
import UserData from "../../service/userData";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Image,
} from "react-bootstrap";
import "./profile.css";

const Profile = () => {
  const { user, setUser, userProfile, setUserProfile, userNextPayment, setUserNextPayment } = UserState();

  const initialProfileState = userProfile
    ? {
        username: userProfile.username,
        password: "",
        password2: "",
        first_name: userProfile.first_name,
        last_name: userProfile.last_name,
        email: userProfile.email,
        phone_number: userProfile.phone_number,
      }
    : {
        username: "",
        password: "",
        password2: "",
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
      };

  const initialCardState = {
    number: "",
    CVV: "",
    type: "DEBIT",
  };

  const [profileState, setProfileState] = useState(initialProfileState);
  const [cardState, setCardState] = useState(initialCardState);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const signOut = (event) => {
    setUser(null);
    setUserProfile(null);
    navigate("/");
    event.preventDefault();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileState({ ...profileState, [name]: value });
  };

  const updateProfile = (event) => {
    UserData.updateProfile(profileState)
      .then((response) => {
        setUserProfile({
          ...userProfile,
          username: response.data.username,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          phone_number: response.data.phone_number,
          avatar: response.data.avatar,
        });
      })
      .catch((e) => {
        alert(JSON.stringify(e.response.data));
      });

    event.preventDefault();
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const updateAvatar = (event) => {
    const formData = new FormData();
    formData.append("avatar", selectedFile);
    UserData.updateAvatar(formData)
      .then((response) => {
        setUserProfile({
          ...userProfile,
          avatar: response.data.avatar,
        });
      })
      .catch((e) => {
        alert("You can only upload images");
      });
    event.preventDefault();
  };

  const handleCardChange = (event) => {
    const { name, value } = event.target;
    setCardState({ ...cardState, [name]: value });
  };

  const updateCard = (event) => {
    UserData.addCard({ card: cardState })
      .then((response) => {
        setUserProfile({
          ...userProfile,
          card: response.data.card,
        });
      })
      .catch((e) => {
        alert(JSON.stringify(e.response.data));
      });
    event.preventDefault();
  };

  const removeCard = (event) => {
    UserData.removeCard()
      .then(() => {
        setUserProfile({
          ...userProfile,
          card: null,
        });
        setCardState(initialCardState);
      })
      .catch((e) => {
        alert(alert(JSON.stringify(e.response.data)));
      });
    event.preventDefault();
  };

  return (
    <>
      <div className="row">
        <div className="col-xl quarter-card">
          <Row>
            <Col>
              <div className="avatar-div">
                {!userProfile || userProfile.avatar===null ?<><img src={"/images/default_avatar.jpg"} alt="Pic"/></>:<img src={userProfile.avatar} alt="Pic"/>}
              </div>

              <form>
                <Form.Group>
                  <div id="change-avatar-div">
                    <Form.Control
                      id="avatar"
                      className="avatar form-control-sm"
                      type="file"
                      placeholder="avatar"
                      onChange={handleFileChange}
                      name="avatar"
                    />
                  </div>
                </Form.Group>
                <div className="submit"  align="center">
                  <Button variant="danger" onClick={updateAvatar}>Change Avatar</Button>
                </div>
              </form>
            <form><div className="submit mt-4"  align="center">
        <Button variant="outline-dark" onClick={signOut}>Sign Out</Button>
      </div></form>
              

            </Col>
            <Col className="col-8">
              <div className="user-info">
                <ListGroup variant="flush">
                  <ListGroupItem>
                    Username: &ensp;&ensp;{userProfile?.username}
                  </ListGroupItem>
                  <ListGroupItem>
                    First name: &ensp;&ensp; {userProfile?.first_name}
                  </ListGroupItem>
                  <ListGroupItem>
                    Last name: &ensp;&ensp; {userProfile?.last_name}
                  </ListGroupItem>
                  <ListGroupItem>
                    Email: &ensp;&ensp; {userProfile?.email}
                  </ListGroupItem>
                  <ListGroupItem>
                    Phone Number: &ensp;&ensp; {userProfile?.phone_number}
                  </ListGroupItem>
                </ListGroup>
                <br/> 
                <Row>
                  {userProfile?.plan ? (
                    <div>
                    <div>Next payment on {userNextPayment?.next_payment}  ${userNextPayment?.price}</div>
                    <div>Paid for {userProfile?.plan?.name}</div>
                    <br/>
                    <p> Note: membership is valid until one day before next payment</p>
                    <p> Cancel subscription will disenroll the classes after</p>
                    </div>
                  ):(
                    <div>No plan, No paymeny</div> 
                  )}
                  
                
                  <Link to={'/payment'}> <Button className="w-100 mb-3" variant="outline-danger">view payment history</Button></Link>
                  <Link to={'/history/class'}> <Button className="w-100" variant="outline-danger">view class history</Button></Link>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        <div class="col-xl quarter-card ">
          <div className="w-50 mx-auto mt-5">
            <form className="form1">
              <Form.Group className="mb-2 row">
                <label className="col-3">Username:</label>

                <Form.Control
                  id="username"
                  className="username col"
                  type="text"
                  placeholder="Username"
                  onChange={handleInputChange}
                  name="username"
                  value={profileState.username}
                />
              </Form.Group>
              <Form.Group className="mb-2 row">
                <label className="col-3">Password:</label>
                <Form.Control
                  id="password"
                  className="password col"
                  type="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                  name="password"
                  value={profileState.password}
                />
              </Form.Group>
              <Form.Group className="mb-2 row">
                <label className="col-3">Confirm Password:</label>
                <Form.Control
                  id="password2"
                  className="password col"
                  type="password"
                  placeholder="Password2"
                  onChange={handleInputChange}
                  name="password2"
                  value={profileState.password2}
                />
              </Form.Group>
              <Form.Group className="mb-2 row">
                <label className="col-3">First Name:</label>
                <Form.Control
                  id="first_name"
                  className="username col"
                  type="text"
                  placeholder="first_name"
                  onChange={handleInputChange}
                  name="first_name"
                  value={profileState.first_name}
                />
              </Form.Group>
              <Form.Group className="mb-2 row">
                <label className="col-3">Last Name: </label>
                <Form.Control
                  id="last_name"
                  className="username col"
                  type="text"
                  placeholder="last_name"
                  onChange={handleInputChange}
                  name="last_name"
                  value={profileState.last_name}
                />
              </Form.Group>
              <Form.Group className="mb-2 row">
                <label className="col-3">Email:</label>
                <Form.Control
                  id="email"
                  className="email col"
                  type="email"
                  placeholder="email"
                  onChange={handleInputChange}
                  name="email"
                  value={profileState.email}
                />
              </Form.Group>
              <Form.Group className="mb-3 row">
                <label className="col-3">Phone Number:</label>
                <Form.Control
                  id="phone_number"
                  className="phone_number col"
                  type="text"
                  placeholder="phone_number"
                  onChange={handleInputChange}
                  name="phone_number"
                  value={profileState.phone_number}
                />
              </Form.Group>

              <div className="submit"  align="center">
                <Button variant="outline-danger" onClick={updateProfile}>Edit Profile</Button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl quarter-card">
          <div className="card-information  bottom-div">
            {userProfile && userProfile.card === null ? (
              <>You have't attached a card. please add a card</>
            ) : (
              <>
                <p>
                  Card on profile: &ensp;&ensp;{userProfile?.card.number}                 
                </p>
                <p>
                  Card Type: &ensp;&ensp;&ensp;&ensp; &ensp; {userProfile?.card.type}
                </p>
              </>
            )}
          </div>
          <div className="edit-card-div  bottom-div">
          <form>
            <div className="submit"  align="right">
              <Button variant="outline-danger" onClick={removeCard}>Remove Card</Button>
            </div>
            <br/><br/><br/>

            <Form.Group className="row">
              <label className="col-3">Card Number</label>
              <Form.Control
                id="number"
                className="number col"
                type="text"
                placeholder="Card Number"
                onChange={handleCardChange}
                name="number"
                value={cardState.number}
              />
            </Form.Group>

            <Form.Group className="row">
            <label className="col-3">CVV</label>
              <Form.Control
                id="CVV"
                className="CVV col"
                type="text"
                placeholder="CVV"
                onChange={handleCardChange}
                name="CVV"
                value={cardState.CVV}
              />
            </Form.Group>

            <Form.Group className="row">
            <label className="col-3">Card Type</label>
              <select
                id="type"
                className="type form-control col"
                type="select"
                placeholder="Card Type"
                onChange={handleCardChange}
                name="type"
                value={cardState.type}
              >
                <option>CREDIT</option>
                <option>DEBIT</option>
              </select>
            </Form.Group>

            <div className="submit"  align="center">
              <Button className="mt-4" variant="outline-danger" onClick={updateCard}>Change Card</Button>
            </div>
          </form></div>
        </div>
      </div>
    </>
  );
};

export default Profile;
