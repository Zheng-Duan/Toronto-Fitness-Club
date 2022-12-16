import React, { useState, useEffect } from 'react';
import { UserState } from '../../context/Context';
import ClassData from '../../service/classData';
import { Button, Card } from 'react-bootstrap'
import './index.css'

const UserHistoryInstance = () => {

    const {user, setUser} = UserState();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [passedInstance, setPassedInstance] = useState();

    useEffect(() => {
    ClassData.getPassedClassInstance(6 * (page - 1))
    .then((response) => {
        setPassedInstance(response.data.results);
        setTotalPages(response.data.count);
    })
    .catch(e => {console.log(e)})
    }, [page] )



    return (<>
      <div className='productContainer'>
        {
            (passedInstance && passedInstance.length > 0)? (passedInstance?.map((instance, index) => {
                return (
                    <div className='single-plan' key={index}>
                      <Card>
                        <Card.Body><br/>
                          <Card.Title>&ensp;&ensp;{instance.type.name} ---{instance.type.coach}</Card.Title><br/>
                          <Card.Subtitle  style={{paddingBottom:10}}>
                            <span>&ensp;&ensp;On {instance.time} </span> <br/><br/>
                            <span>&ensp;&ensp;{instance.type.start_time} -- {instance.type.end_time}</span> <br/><br/>
                            <div>&ensp;&ensp;Class Size: {instance.capacity}</div><br/>
                          </Card.Subtitle>
                        </Card.Body>
                      </Card>
                    </div>
                  )
            })
            ) : (<div className='single-plan'>
                    <Card>
                    <Card.Body><br/>
                        <Card.Subtitle>&ensp;&ensp;You don't have any passed class.</Card.Subtitle><br/>
                    </Card.Body>
                    </Card>
                </div>
            )
        }
      </div>
      <div className="mt-5" align="center">
      {(passedInstance && passedInstance?.length > 0) ? (
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
        </div>) : (<></>)}</div></>
    )
}

export default UserHistoryInstance
