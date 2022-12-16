import React, { useState, useEffect } from 'react';
import { UserState } from '../../context/Context';
import ClassData from '../../service/classData';
import { Button, Card } from 'react-bootstrap';
import PlanData from '../../service/planData';


const UserHistoryPayment = () => {

    const {user, setUser, userProfile} = UserState();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [userPayment, setUserPayment] = useState([]);
    useEffect(() => {
      PlanData.viewPaymentHistory(6 * (page - 1))
      .then((response) => {
        setUserPayment(response.data.results);
        setTotalPages(response.data.count);
      })
      .catch(e => {console.log(e)})
    }, [userProfile, page] )

    return (
      <div className='productContainer'>
        {
            (userPayment && userPayment?.length > 0)? (userPayment?.map((instance, index) => {
                return (
                    <div className='single-plan' key={index}>
                      <Card>
                        <Card.Body><br/>
                          <Card.Title>&ensp;&ensp;{instance?.time} --- ${instance?.price}</Card.Title><br/>
                          <Card.Subtitle  style={{paddingBottom:10}}>
                            <span>&ensp;&ensp;Paid for this plan: {instance.plan.name} </span> <br/><br/>
                            <div>&ensp;&ensp;Using card: {instance.card.number}</div><br/>
                          </Card.Subtitle>
                        </Card.Body>
                      </Card>
                    </div>
                  )
            })
            ) : (<div className='single-plan'>
                    <Card>
                    <Card.Body><br/>
                        <Card.Subtitle>&ensp;&ensp;You don't have any payment yet.</Card.Subtitle><br/>
                    </Card.Body>
                    </Card>
                </div>
            )
            
        }
        {(userPayment && userPayment?.length > 0) ? (
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
            </div>) : (<></>)}
      </div>
    )
}

export default UserHistoryPayment