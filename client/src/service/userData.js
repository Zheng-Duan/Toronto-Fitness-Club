import axios from "axios";
import authHeader from "./authHeader";


const http =  axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 1000,
  headers: {
    "Content-type": "application/json;charset=utf-8"
  }
});

class UserData {
  
    signUpNewUser(data) {
      return axios.post("http://localhost:8000/accounts/register/", data);
    }

    signInUser(data) {
      return axios.post("http://localhost:8000/accounts/login/", data);
    }

    getProfile() {
      return axios.get("http://localhost:8000/accounts/profile/view/", { headers: authHeader() });
    } 

    updateProfile(data) {
      return axios.put("http://localhost:8000/accounts/profile/edit/", data, { headers: authHeader() });
    } 

    updateAvatar(formData) {
      return axios.patch("http://localhost:8000/accounts/profile/edit/", formData, { headers: authHeader() });
    } 

    addCard(data) {
      return axios.put("http://localhost:8000/gym-plan/card/", data, { headers: authHeader() });
    }

    removeCard() {
      return axios.delete("http://localhost:8000/gym-plan/card/", { headers: authHeader() });
    }
  }
  
  export default new UserData();