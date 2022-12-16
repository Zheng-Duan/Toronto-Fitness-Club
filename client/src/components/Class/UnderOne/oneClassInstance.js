import React, {useEffect, useState} from 'react'
import { Button, Card } from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import { UserState } from '../../../context/Context';
import classData from '../../../service/classData';


const SingleInstance = ({i, studioname, classInstance, setClassInstance}) => {

    const {user, setUser, userProfile, setUserProfile} = UserState();

    const [a, setA] = useState(1);

    const enroll = event => {
        classData.enrollClassInstance({
            classname: classInstance[i].type.name,
            start_time: classInstance[i].type.start_time,
            start_date: classInstance[i].time
        }, studioname)
        .then((response) => {
            // members: Instance.members.concat({username: user.username})
            classInstance[i].members = response.data.members
            setClassInstance(classInstance)
            setA(a-1)
  
        })
        .catch(e => {alert(JSON.stringify(e.response.data))})
        event.preventDefault();
      }
    
      const cancel = event => {

        classData.cancelClassInstance({
            classname: classInstance[i].type.name,
            start_time: classInstance[i].type.start_time,
            start_date: classInstance[i].time
        }, studioname)
        .then((response) => {
            // members: Instance.members.filter(member => member.username !== user.username)
            classInstance[i].members = response.data.members
            setClassInstance(classInstance)
            setA(a+1)
        })
        .catch(e => {alert(JSON.stringify(e.response.data))})
        event.preventDefault();
      }

  return (
    <div className=''>
      <Card>
        <Card.Body><br/>
          <Card.Title>&ensp;&ensp;{classInstance[i]?.type.name} --{classInstance[i]?.type.coach}</Card.Title><br/>
          <Card.Subtitle  style={{paddingBottom:10}}>
            <span>&ensp;&ensp;On {classInstance[i]?.time} </span> <br/><br/>
            <span>&ensp;&ensp;{classInstance[i]?.type.start_time} -- {classInstance[i]?.type.end_time}</span> <br/><br/>
            <div>&ensp;&ensp;Spots Available: {classInstance[i]?.capacity - classInstance[i]?.members.length}</div><br/>
          </Card.Subtitle>
          <div>
          {(user && classInstance[i]?.members.some(member=>member.username===user.username)) ? (
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
                onClick={enroll}
                disabled={!user || userProfile.plan === null || (classInstance[i]?.capacity <= classInstance[i]?.members.length)}
              >
                Enroll
              </Button>
          )}
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default SingleInstance