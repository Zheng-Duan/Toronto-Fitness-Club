import React, { createContext, useContext, useReducer, useState, useEffect } from 'react'
import UserData from '../service/userData';
import PlanData from '../service/planData';
import ClassData from '../service/classData';

const User = createContext();
const Retrieve_User_From_LcoalStorage = JSON.parse(localStorage.getItem('user') || 'null');
const Retrieve_User_Profile_From_LcoalStorage = JSON.parse(localStorage.getItem('userProfile') || 'null');

const Context = ({children}) => {

    const [user, setUser] = useState(Retrieve_User_From_LcoalStorage);
    const [userProfile, setUserProfile] = useState(Retrieve_User_Profile_From_LcoalStorage);
    // const [userCard, setUserCard] = useState(userProfile? userProfile.card : null);
    // const [userPlan, setUserPlan] = useState(userProfile? userProfile.plan: null);

    useEffect(() => {
      localStorage.setItem('user', JSON.stringify(user));
      if(user) loadUserProfile();
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    }, [user] )

    useEffect(() => {
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    }, [userProfile] )

    const loadUserProfile = event => {
        UserData.getProfile()
        .then((response) => {
            setUserProfile(response.data);
        })
        .catch(e => {console.log(e)})
    }

    const [plans, setPlans] = useState([]);

    useEffect(() => {
        PlanData.getPlans()
        .then((response) => {
          setPlans(response.data.results);
        })
        .catch(e => {console.log(e)})
      }, [] )

    const [userNextPayment, setUserNextPayment] = useState();
    useEffect(() => {
      if(user !== null && userProfile.plan !== null) {
          PlanData.viewNextPayment()
        .then((response) => {
          setUserNextPayment(response.data);
        })
        .catch(e => {console.log(e)})
      }
    }, [userProfile] )

    const [classInstance, setClassInstance] = useState([]);

    useEffect(() => {
        ClassData.getAllClassInstance()
        .then((response) => {
          setClassInstance(response.data.results);
        })
        .catch(e => {console.log(e)})
      }, [] )

  return (
    <User.Provider value={{user, setUser, userProfile, setUserProfile, plans, setPlans, classInstance, setClassInstance, userNextPayment, setUserNextPayment}}>
    {children}
    </User.Provider>
  )
}

export default Context

export const UserState = () => {
    return useContext(User);
}