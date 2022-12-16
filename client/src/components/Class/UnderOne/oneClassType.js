import React, {useEffect, useState} from 'react'
import { Button, Card } from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import { UserState } from '../../../context/Context';
import classData from '../../../service/classData';


const SingleType = ({type, studioname, classInstance, setClassInstance}) => {

    const {user, setUser, userProfile, setUserProfile} = UserState();

    const [a, setA] = useState(1);

    const [Instance, setInstance] = useState(type);

    useEffect(() => {
        setInstance(type);
    }, [type]);

    const enroll = event => {
        classData.enrollClassType({
            classname: Instance.name,
            start_time: Instance.start_time,
        }, studioname)
        .then((response) => {
            let newList = response.data.classInstance
            const date = new Date().toISOString().slice(0, 10)
            // newList = newList.filter(item => item.time >= date)
            newList = newList.filter(item => {
                return classInstance.some(term => item.time.includes(term.time) && term.type.name === Instance.name)
            })
            setClassInstance(classInstance.map(item => {
                const item2 = newList.find(item3 => item3.time === item.time);
                return (item2 && item.type.name === Instance.name && item.type.start_time === Instance.start_time) ? {...item, members: item2.members} : item;
            }))
            setA(a-1)

        })
        .catch(e => {alert(e)})
        event.preventDefault();
      }
    
      const cancel = event => {

        classData.cancelClassType({
            classname: Instance.name,
            start_time: Instance.start_time,
        }, studioname)
        .then((response) => {
            let newList = response.data.classInstance
            const date = new Date().toISOString().slice(0, 10)
            newList = newList.filter(item => {
                return classInstance.some(term => item.time.includes(term.time) && term.type.name === Instance.name)
            })
            setClassInstance(classInstance.map(item => {
                const item2 = newList.find(item3 => item3.time === item.time);
                return (item2 && item.type.name === Instance.name && item.type.start_time === Instance.start_time) ? {...item, members: item2.members} : item;
            }))
            setA(a+1)
        })
        .catch(e => {alert(e)})
        event.preventDefault();
      }

  return (
    <div className=''>
      <Card>
        <Card.Body><br/>
          <Card.Title>&ensp;&ensp;{Instance?.name} ---{Instance?.coach}</Card.Title><br/>
          <Card.Subtitle  style={{paddingBottom:10}}>
            <span>&ensp;&ensp; {Instance?.date} </span> 
            <span>&ensp;{Instance?.start_time} -{Instance?.end_time}</span> <br/><br/>
            <div>&ensp;&ensp;Description: {Instance?.description}</div><br/>
            
            <div className='row tag-div'>Tags:{Instance?.keywords.map((key, i) => {
                return (<div key={i} className='col'> {key.keyword}/</div>)
            })}
            </div><br/>
          </Card.Subtitle>
          <div>
          <Button className="w-100"
                variant="danger"
                size="lg"
                onClick={enroll}
                disabled={!user || userProfile.plan === null}
              >
                Add All
           </Button>
          <Button className="w-100"
                variant= "light"
                size= "lg"
                onClick={cancel}
                disabled={!user}
              >
                Cancel All
          </Button>
          
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default SingleType