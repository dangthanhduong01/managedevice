import axios from 'axios';

// Tạo một instance Axios với các thiết lập mặc định
const axiosInstance = axios.create({
  baseURL: '', // Đặt URL cơ sở cho API của bạn
});

// Thêm interceptor trước khi gửi yêu cầu
axiosInstance.interceptors.request.use(
   (config) => {
    let token = JSON.parse(localStorage.getItem('user')).token; // Lấy token từ local storage hoặc nơi lưu trữ khác
    if (token) {
      config.headers['x-access-token'] = token; // Thêm header Authorization với token
    }
    return config;
    },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;