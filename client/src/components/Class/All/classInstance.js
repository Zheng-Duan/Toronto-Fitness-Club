import React, {useEffect} from 'react'
import { Button, Card } from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import { UserState } from '../../../context/Context';


const SingleInstance = ({instance}) => {

  return (
    <div className=''>
      <Card>
        <Card.Body><br/>
          <Card.Title>&ensp;&ensp;{instance.type.name} ---{instance.type.coach}</Card.Title><br/>
          <Card.Subtitle  style={{paddingBottom:10}}>
            <span>&ensp;&ensp;On {instance.time} At {instance.type.studio.name}</span> <br/><br/>
            <span>&ensp;&ensp;{instance.type.start_time} -- {instance.type.end_time}</span> <br/><br/>
            <div>&ensp;&ensp;Spots Available: {instance.capacity - instance.members.length}</div><br/>
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </div>
  )
}

export default SingleInstance