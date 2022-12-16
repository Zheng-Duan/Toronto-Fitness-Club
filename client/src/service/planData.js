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
  

    getPlans() {
      return axios.get("http://localhost:8000/gym-plan/plan/");
    } 

    subscriptPlan(data) {
      return axios.put("http://localhost:8000/gym-plan/subscribe/", data, { headers: authHeader() });
    } 

    cancelPlan() {
      return axios.delete("http://localhost:8000/gym-plan/subscribe/", { headers: authHeader() });
    } 

    viewNextPayment() {
      return axios.get("http://localhost:8000/gym-plan/next/0", { headers: authHeader() });
    } 

    viewPaymentHistory(page=0) {
      return axios.get(`http://localhost:8000/gym-plan/payment/?limit=6&offset=${page}`, { headers: authHeader() });
    } 

  }
  
  export default new PlanData();