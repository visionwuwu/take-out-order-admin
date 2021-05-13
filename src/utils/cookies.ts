/*
 * @Description: cookies封装
 * @Author: Visionwuwu
 * @Date: 2021-05-10 23:00:00
 * @LastEditors: Visionwuwu
 * @LastEditTime: 2021-05-10 23:00:00
 */
import Keys from '@/constant/key'
import Cookies from 'js-cookie'

export const getToken = () => Cookies.get(Keys.tokenKey)
export const setToken = (token: string) => Cookies.set(Keys.tokenKey, token)
export const removeToken = () => Cookies.remove(Keys.tokenKey)