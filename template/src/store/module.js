import AuthService from '../services/service'

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {status:{loggedIn: true}, user } 
                          : {status:{loggedIn: false}, user: null };

  export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
      login({ commit }, user) {
        return AuthService.login(user).then(
          user => {
            commit('loginSuccess', user);
            return Promise.resolve(user);
          },
          error => {
            commit('loginFailure');
            return Promise.reject(error);
          }
        );
      },
      // refresh (){
      //   setInterval(() => {
      //     // const token = Cookies.get('name');
      //     // if (!token) {
      //     //   Cookies.set('name',axios.post('http://127.0.0.1:3031/api/session',{}),{expires:30/1440});
      //     //   console.log(Cookies.getItem('name'))
      //     // }
      //     Cookies.set('name',axios.post('http://127.0.0.1:3031/api/session',{}),{expires:30/1440});
      //     console.log(Cookies.getItem('name'))
      //   }, 30 * 1000);
      // },
      logout({ commit }) {
        AuthService.logout();
        commit('logout');
      }
    },
    mutations: {
      loginSuccess(state, user) {
        state.status.loggedIn = true;
        state.user = user;
      },
      loginFailure(state) {
        state.status.loggedIn = false;
        state.user = null;
      },
      logout(state) {
        state.status.loggedIn = false;
        state.user = null;
      }
    }
  };
