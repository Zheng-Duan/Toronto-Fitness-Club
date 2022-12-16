import axios from "axios";
import authHeader from "./authHeader";


const http =  axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 1000,
  headers: {
    "Content-type": "application/json;charset=utf-8"
  }
});

class PlanData {
  

    getAllClassType(studioname, pageC=0) {
        return axios.get(`http://localhost:8000/class/studios/${studioname}/classes/?limit=2&offset=${pageC}`);
    } 

    enrollClassType(data, studioname) {
        return axios.put(`http://localhost:8000/class/${studioname}/enroll/type/`, data, { headers: authHeader() });
    } 

    cancelClassType(data, studioname) {
        return axios.put(`http://localhost:8000/class/${studioname}/cancel/type/`, data, { headers: authHeader() });
    } 

    getAllClassInstance(page=0) {
        return axios.get(`http://localhost:8000/class/studios/classes/instance/?limit=6&offset=${page}`);
    } 

    getAllClassInstanceUnderOne(studioname, page=0, params={}) {
        return axios.get(`http://localhost:8000/class/studios/${studioname}/classes/instance/?limit=6&offset=${page}`, {params: params});
    } 
    
    enrollClassInstance(data, studioname) {
        return axios.put(`http://localhost:8000/class/${studioname}/enroll/instance/`, data, { headers: authHeader() });
    } 
  
    cancelClassInstance(data, studioname) {
        return axios.put(`http://localhost:8000/class/${studioname}/cancel/instance/`, data, { headers: authHeader() });
    } 

    getFutureClassInstance(page=0) {
        return axios.get(`http://localhost:8000/class/myclasses/future/?limit=6&offset=${page}`, { headers: authHeader() });
    } 

    getPassedClassInstance(page=0) {
        return axios.get(`http://localhost:8000/class/myclasses/history/?limit=6&offset=${page}`, { headers: authHeader() });
    } 

  }
  
  export default new PlanData();