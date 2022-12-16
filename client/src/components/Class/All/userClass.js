import React, { useState, useEffect } from 'react';
import { UserState } from '../../../context/Context';
import ClassData from '../../../service/classData';
import { Button, Card } from 'react-bootstrap'


const UserInstance = () => {

    const {user, setUser} = UserState();

    const [futureInstance, setFutureInstance] = useState();

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    useEffect(() => {
        ClassData.getFutureClassInstance(6 * (page - 1))
        .then((response) => {
          setFutureInstance(response.data.results);
          setTotalPages(response.data.count);
        })
        .catch(e => {console.log(e)})
      }, [page, totalPages] )


    const cancel = (i, event) => {
        ClassData.cancelClassInstance({
            classname: futureInstance[i].type.name,
            start_time: futureInstance[i].type.start_time,
            start_date: futureInstance[i].time
        }, futureInstance[i].type.studio.name)
        .then((response) => {
            // futureInstance[i].members = response.data.members
            // setFutureInstance(futureInstance);
            setTotalPages(response.data.count);
        })
        .catch(e => {alert(JSON.stringify(e.response.data))})
        event.preventDefault();
    }


    return (
      <div className='productContainer'>
        {
            (futureInstance && futureInstance.length > 0)? (futureInstance?.map((instance, index) => {
                return (
                    <div className='single-plan' key={index}>
                      <Card>
                        <Card.Body><br/>
                          <Card.Title>&ensp;&ensp;{instance.type.name} ---{instance.type.coach}</Card.Title><br/>
                          <Card.Subtitle  style={{paddingBottom:10}}>
                            <span>&ensp;&ensp;On {instance.time} At {instance.type.studio.name}</span> <br/><br/>
                            <span>&ensp;&ensp;{instance.type.start_time} -- {instance.type.end_time}</span> <br/><br/>
                            <div>&ensp;&ensp;Class Size: {instance.capacity}</div><br/>
                          </Card.Subtitle>
                          <Button variant="light" onClick={(event) => cancel(index, event)}>
                            Cancel
                          </Button>
                        </Card.Body>
                      </Card>
                    </div>
                  )
            })
            ) : (<div className='single-plan'>
                    <Card>
                    <Card.Body><br/>
                        <Card.Subtitle>&ensp;&ensp;You don't have any upcoming classes</Card.Subtitle><br/>
                    </Card.Body>
                    </Card>
                </div>)
            
        }
        {(futureInstance && futureInstance.length > 0) ? (
            <div className="mt-5" align="center">{page > 1 ? (
                <Button
                  variant="outline-dark"
                  onClick={() => setPage(Math.max(1, page - 1))}
                >
                  to {page-1}
                </Button>
              ) : (
                <Button variant="light" disabled>
                  no {page-1}
                </Button>
              )}
              {page < totalPages / 6 ? (
                <Button variant="outline-dark" onClick={() => setPage(page + 1)}>
                  to {page+1}
                </Button>
              ) : (
                <Button variant="light" disabled>
                  no {page+1}
                </Button>
              )}
          </div>
        ) : (<></>)}

      </div>
    )
}

export default UserInstance