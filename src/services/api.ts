import axios from 'axios';

// 創建axios實例
const api = axios.create({
  baseURL: 'http://localhost:80',  // 將端口改回80
  timeout: 5000,  // 請求超時時間
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api; 