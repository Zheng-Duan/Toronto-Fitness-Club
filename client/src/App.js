import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from './components/Home';
import Login from './components/User';
import Profile from './components/User/profile';
import Plans from './components/MemberShip/plans';
import APIContext, { useAPIContext } from './Contexts/APIContext';
import Studios from './components/Studios';
import StudioDetails from './components/Studios/StudioDetails';
import AllClassInstance from './components/Class/All/allClassInstance';
import AllClassInstanceOfOne from './components/Class/UnderOne/oneAllClassInstance';
import UserHistoryInstance from './components/User/userHistoryClass';
import UserHistoryPayment from './components/User/userHistoryPayment';
import Signup from './components/User/register';
import Register from './components/Register';

function App() {
  const studios = (
    <APIContext.Provider value={useAPIContext()}>
      <Studios />
    </APIContext.Provider>
  )
  return (
    <BrowserRouter>
        <Layout/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/payment' element={<UserHistoryPayment/>}/>
          <Route path='/history/class' element={<UserHistoryInstance/>}/>
          <Route path='/membership' element={<Plans/>}/>
          <Route path='/class' element={<AllClassInstance/>}/>
          <Route path='/class/:studioname' element={<AllClassInstanceOfOne/>}/>
          <Route path='/studio' element={studios} />
          <Route path='/studio/:name' element={<StudioDetails/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
