import React, {useEffect} from 'react'
import { Button, Card } from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import userData from '../../service/userData';
import planData from '../../service/planData';
import { UserState } from '../../context/Context';


const SinglePlan = ({plan}) => {

  const {user, setUser, userProfile, setUserProfile} = UserState();

  const subscribe = event => {
    planData.subscriptPlan({
        name: plan.name
    })
    .then((response) => {
      setUserProfile({
          ...userProfile,
          plan: response.data.plan,
      });
    })
    .catch(e => {alert(JSON.stringify(e.response.data))})
    event.preventDefault();
  }

  const cancel = event => {
    planData.cancelPlan()
    .then(() => {
      setUserProfile({
          ...userProfile,
          plan: null,
      });
    })
    .catch(e => {alert(JSON.stringify(e.response.data))})
    event.preventDefault();
  }

  return (
    <div className='plans'>
      <Card>
        <Card.Body><br/>
          <Card.Title>&ensp;&ensp;{plan.name}</Card.Title><br/>
          <Card.Subtitle  style={{paddingBottom:10}}>
            <span>&ensp;&ensp;Price: ${plan.price}</span> <br/><br/>
            <div>&ensp;&ensp;Subscription: {plan.period}</div><br/>
          </Card.Subtitle>
          <Card.Text>&ensp;&ensp;{plan.description}</Card.Text><br/>
          <div>
            {(userProfile && userProfile.plan && (userProfile.plan.name === plan.name)) ? (
              <Button
                variant= "light"
                size= "lg"
                onClick={cancel}
              >
                Cancel
              </Button>
            ) : (
              <Button className="w-100"
                variant="danger"
                size="lg"
                onClick={subscribe}
                disabled={!user || userProfile.card === null}
              >
                Subscribe
              </Button>
          )}
        </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default SinglePlan