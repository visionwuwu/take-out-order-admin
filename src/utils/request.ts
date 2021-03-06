import { UserActionTypes } from '@/store/modules/user/action-types'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useAppStore } from 'store/index'
import { ApiStatusCode } from '@/common/enums/ApiStatusCode.enum'


/** axios响应结果数据 */
export interface AxiosResultData<T = any> {
  code: number
  message: string
  data: T
  page?: number
  total?: number
}

const service = axios.create({
  // 请求接口的基础地址
  baseURL: import.meta.env.VITE_BASE_API as string,
  // 5000ms内，未处理作为超时
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    const store = useAppStore()
    // 携带请求的令牌token
    const user = store.state.user
    if (user.token) {
      const Bearer = import.meta.env.VITE_BASE_BEARER || 'Bearer'
      config.headers['Authorization'] = Bearer + ' ' + user.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const res = response.data
    const store = useAppStore()
    console.log('======', res)
    /**
     * 通过判断状态码，统一处理响应，根据情况修改
     * 同时也可以通过HTTP状态码判断请求结果
     */
    if (res.code !== ApiStatusCode.OK) {
      ElMessage.error({
        type: 'error',
        message: res.message || 'Error',
        duration: 5 * 1000
      })


      // 50008：非法token; 50012：其他客户端已登录 50014：令牌过期
      if (
        res.code === ApiStatusCode.ILLEGAL_UNAUTHORIZED ||
        res.code === ApiStatusCode.OTHER_CLIENT_LOGIN ||
        res.code === ApiStatusCode.TOKEN_EXPIRED
      ) {
        ElMessageBox.confirm('您已登出，请重新登录', '确认', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch(UserActionTypes.ACTION_RESET_TOKEN).then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error('error'))
    } else {
      return response as any
    }
  },
  (error: AxiosError) => {
    const response = error.response
    if (response) {
      const { data } = response
      ElMessage({
        message: data ? data.message : error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

function createAxiosInstance<T = AxiosResultData>(config: AxiosRequestConfig) {
  return service.request<T>(config)
}

export default createAxiosInstance
