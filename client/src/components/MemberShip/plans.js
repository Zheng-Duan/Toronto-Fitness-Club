import React, { useState, useEffect } from 'react';
import { UserState } from '../../context/Context';
import SinglePlan from './singlePlan';
import './plans.css'

const Plans = () => {

    const {plans, setPlans} = UserState();



    return (
      <div className='productContainer'>
        {plans.map((plan) => {
            return <>
            <div className='single-plan'><SinglePlan plan={plan} key={plan.name}/></div>
            </>
          })}
      </div>
    )
}

export default Plans