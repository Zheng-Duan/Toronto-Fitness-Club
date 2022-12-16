import React, { useState, useEffect } from "react";
import { UserState } from "../../../context/Context";
import SingleInstance from "./classInstance";
import UserInstance from "./userClass";
import Button from "react-bootstrap/Button";
import "./allclass.css";

const AllClassInstance = () => {
  const { user, setUser, classInstance, setClassInstance } = UserState();
  const [classes, setClasses] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(
      `http://localhost:8000/class/studios/classes/instance/?offset=${
        6 * (page - 1)
      }`
    )
      .then((response) => response.json())
      .then((json) => {
        setClasses(json.results);
        setTotalPages(json.count);
      });
  }, [page]);

  return (
    <div className="">
      {user ? (
        <div className="">
          <UserInstance />
        </div>
      ) : (
        <div className="productContainer">
          {classes.map((instance) => {
            return (
              <>
                <div className="single-plan">
                  <SingleInstance instance={instance} key={instance} />
                </div>
              </>
            );
          })}
          <br />
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
        </div>
      )}
    </div>
  );
};

export default AllClassInstance;


// const AllClassInstance = () => {

//   const {user, setUser, classInstance, setClassInstance} = UserState();



//   return (
//     <div className=''>
//       {(user) ? 
//         (<div className=''><UserInstance/></div>
//         ) : (
//         <div className=''>
//           {classInstance.map((instance) => {
//             return (<>
//                 <div className=''><SingleInstance instance={instance} key={instance}/></div>
//             </>)
//           })}
//         </div>
//       )}
      
//     </div>
//   )
// }

// export default AllClassInstance

