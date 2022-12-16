import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserState } from "../../../context/Context";
import SingleInstance from "./oneClassInstance";
import ClassData from "../../../service/classData";
import SingleType from "./oneClassType";
import {
  Form,
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Image,
} from "react-bootstrap";

import "./underone.css";

const AllClassInstanceOfOne = () => {
  const [classInstance, setClassInstance] = useState([]);
  const [classType, setClassType] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageC, setPageC] = useState(1);
  const [totalPagesC, setTotalPagesC] = useState(1);
  const [myParams, setMyParams] = useState({});
  const { studioname } = useParams();
  const [searchParams, setSearchParams] = useState(new URLSearchParams());


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMyParams({ ...myParams, [name]: value });
  };

  const handleKeywords = (event) => {
    const { name, value } = event.target;
    if (event.target.checked) {
      searchParams.append('keywords', value);
      setSearchParams(searchParams);
    } else {
      const values = searchParams.getAll('keywords');
      searchParams.delete('keywords');
      for (const v of values) {
          if (v !== value) {
            searchParams.append('keywords', v);
          }
      }
      setSearchParams(searchParams);
    }
    // console.log(searchParams.toString())
  }

  const myFilter = (event) => {
    Object.keys(myParams).map((key, index) => {
      searchParams.append(key, myParams[key]);
    })
    setSearchParams(searchParams);
    // console.log(searchParams.toString())
    ClassData.getAllClassInstanceUnderOne(studioname, (page-1)*6, searchParams)
      .then((response) => {
        setClassInstance(response.data.results);
        setTotalPages(response.data.count)
        console.log(response.data.count)
      })
      .catch((e) => {
        alert(JSON.stringify(e.response.data));
      });
    event.preventDefault();
  };



  useEffect(() => {
    ClassData.getAllClassInstanceUnderOne(studioname, (page-1)*6)
      .then((response) => {
        setClassInstance(response.data.results);
        setTotalPages(response.data.count)
      })
      .catch((e) => {
        console.log(e);
      });
  }, [page]);

  useEffect(() => {
    ClassData.getAllClassType(studioname, (pageC-1)*2)
      .then((response) => {
        setClassType(response.data.results);
        setTotalPagesC(response.data.count);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [pageC]);

  return (
    <div className="row outest-div">
      <div className="col-2 filter-div">
        <form>
          <Form.Group className="row mb-4">
            <label className="col-5">Class name: </label>
            <Form.Control className="col" type="text" onChange={handleInputChange} name="classname" value={myParams.classname}/>
          </Form.Group>

          <Form.Group className="row mb-4">
            <label className="col-5">Coach:</label>
            <Form.Control className="col" type="text" onChange={handleInputChange} name="coach" value={myParams.coach}/>
          </Form.Group>

          <Form.Group className="row mb-2">
            <label className="col-4">Tags:</label>
            <div className="col">
              <div className="row">
                <Form.Check
                  className="col-1"
                  type="checkbox"
                  id="yoga"
                  name="yoga"
                  onChange={handleKeywords}
                  value="yoga"
                />
                <label className="col" for="yoga">
                  Yoga
                </label>
              </div>

              <div className="row">
                <Form.Check
                  className="col-1"
                  type="checkbox"
                  id="cycling"
                  name="cycling"
                  onChange={handleKeywords}
                  value="cycling"
                />
                <label className="col" for="cycling">
                  Cycling
                </label>
              </div>

              <div className="row">
                <Form.Check
                  className="col-1"
                  type="checkbox"
                  id="low-intensity"
                  name="low-intensity"
                  onChange={handleKeywords}
                  value="low intensity"
                />
                <label className="col" for="low-intensity">
                  Low Intensity
                </label>
              </div>

              <div className="row">
                <Form.Check
                  className="col-1"
                  type="checkbox"
                  id="strength"
                  name="strength"
                  onChange={handleKeywords}
                  value="strength"
                />
                <label className="col" for="strength">
                  Strength
                </label>
              </div>

              <div className="row">
                <Form.Check
                  className="col-1"
                  type="checkbox"
                  id="running"
                  name="running"
                  onChange={handleKeywords}
                  value="running"
                />
                <label className="col" for="running">
                  Running
                </label>
              </div>
              <div className="row">
                <Form.Check
                  className="col-1"
                  type="checkbox"
                  id="fitness"
                  name="fitness"
                  onChange={handleKeywords}
                  value="fitness"
                />
                <label className="col" for="fitness">
                  Fitness
                </label>
              </div>
              <div className="row">
                <Form.Check
                  className="col-1"
                  type="checkbox"
                  id="cardio"
                  name="cardio"
                  onChange={handleKeywords}
                  value="cardio"
                />
                <label className="col" for="cardio">
                  Cardio
                </label>
              </div>
            </div>
          </Form.Group>
          <Button className="mt-2 apply-button w-100" variant="outline-danger" onClick={myFilter}>
            Apply
          </Button>
        </form>
      </div>

      <div className="col-lg-6 mt-5">
        <div className="productContainer">
          {classInstance.map((instance, i) => {
            return (
              <div key={i} className="single-plan">
                <SingleInstance
                  i={i}
                  studioname={studioname}
                  key={instance}
                  classInstance={classInstance}
                  setClassInstance={setClassInstance}
                />
              </div>
            );
          })}
        </div>
        {(classInstance && classInstance.length > 0) ? 
          (<div className="mt-5" align="center">
            {page > 1 ? (
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

      <div className="col-lg-4 classtype-div">
      <div className="mt-0 mb-4" align="center">
        {pageC > 1 ? (
            <Button
              variant="outline-dark"
              onClick={() => setPageC(Math.max(1, pageC - 1))}
            >
              to {pageC-1}
            </Button>
          ) : (
            <Button variant="light" disabled>
              no {pageC-1}
            </Button>
          )}
          {pageC < totalPagesC / 2 ? (
            <Button variant="outline-dark" onClick={() => setPageC(pageC + 1)}>
              to {pageC+1}
            </Button>
          ) : (
            <Button variant="light" disabled>
              no {pageC+1}
            </Button>
        )}

       
      </div>
        {classType.map((type, i) => {
          return (
            <>
              <div key={i} className="">
                <SingleType
                  type={type}
                  studioname={studioname}
                  key={i}
                  classInstance={classInstance}
                  setClassInstance={setClassInstance}
                />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default AllClassInstanceOfOne;
