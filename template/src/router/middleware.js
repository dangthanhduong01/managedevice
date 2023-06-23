import router from './index';
import jwtDecode from 'jwt-decode';
export function checkTokenExpiration(to, from, next) {
  const token = JSON.parse(localStorage.getItem('user')).token;
  // console.log('midd',token);
  if (token) {
    const tokenExpiration = jwtDecode(token).exp;
    console.log('Thoi gian het han expration:',tokenExpiration);
    const currentTime = Date.now() / 1000; // Đổi từ mili-giây thành giây
      console.log('current time:',currentTime);
    if (currentTime > tokenExpiration) {
      // Token đã hết hạn, chuyển hướng đến trang đăng nhập
      localStorage.removeItem('user');
      // this.$store.dispatch('auth/logout');
      router.push('/login');
    }else{
      console.log('chưa hết hạn');
    }
  }

  next();
}