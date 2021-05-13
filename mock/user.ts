import { MockMethod } from 'vite-plugin-mock'
let mockList = [
  { id: 1, name: '唐三', age: 18 },
  { id: 2, name: '小舞', age: 18 },
  { id: 3, name: '戴沐白', age: 18 },
  { id: 4, name: '朱竹清', age: 18 },
  { id: 5, name: '奥斯卡', age: 18 },
  { id: 6, name: '宁荣荣', age: 18 },
  { id: 7, name: '马红俊', age: 18 },
]

export default [
  // 用户列表
  {
    url: '/api/getUsers',
    method: 'get',
    response: (config) => {
      // 从查询参数中获取分页、过滤关键词等参数
      const { page = 1, limit = 5 } = config.query

      // 分页
      const data = mockList.filter((item, index) => {
        return index < limit * page && index >= limit * (page - 1)
      })
      
      return {
        code: 20000,
        data,
        message: 'ok',
        total: mockList.length
      }
    }
  },
  // 获取某个用户
  {
    url: '/api/getUser',
    method: 'get',
    response: (config) => {
      const { id } = config.query
      const data = mockList.find(item => item.id == id)
      return {
        code: 20000,
        message: 'ok',
        data
      };
    },
  },
  {
    url: '/api/delUser',
    method: 'get',
    response: (config) => {
      const { id } = config.query
      const data = mockList.filter(item => item.id !== id)

      return {
        code: 20000,
        message: 'ok',
        data
      }
    }
  },
  {
    url: '/api/updateUser',
    method: 'get',
    response: (config) => {
      const { id, model } = config.query
      const data = mockList.map(item => {
        if (item.id === id) {
          return JSON.parse(model)
        }
        return item
      })

      return {
        code: 20000,
        message: 'ok',
        data
      }
    }
  },
  {
    url: '/api/createUser',
    method: 'get',
    response: (config) => {
      const { model } = config.query
      const data = mockList = mockList.concat(JSON.parse(model))
      return {
        code: 20000,
        message: 'ok',
        data
      }
    }
  }
] as MockMethod[];
