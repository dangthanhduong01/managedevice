import axios from 'axios';
const API_URL = 'http://192.168.25.50:3031/auth/';
import axiosInstance from '../common/http-common';
class AuthService {
  login(user) {
    return axios.post(API_URL + 'login', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        console.log(response.data)
        return response.data;
      });
  };
  // roles(user) {
  //   return axiosInstance.post(API_URL+'roles',{username:user.username})
  //     .then(response => {
  //       console.log('permission servicce: ',response.data[0].role);
  //       return (response.data[0].role);
  //     }).catch(e => {
  //       console.log(e);
  //     });
  // };
  logout() {
    localStorage.removeItem('user');
  };

}

export default new AuthService();