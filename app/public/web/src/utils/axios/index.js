import axios from 'axios'
import { Toast } from 'vant'

// axios.defaults.baseURL = process.env.VUE_APP_BASE_API
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.timeout = 30000

axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(res => {
  if (res.status != 200) {
    Toast('搜索失败')
    return Promise.reject(res)
  }
  return res.data
})

export default axios





