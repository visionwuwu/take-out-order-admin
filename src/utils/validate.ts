/**
 * 判断是否为链接
 * @author Visionwuwu
 * @param {*} s 
 * @returns {boolean}
 */
export function isExternal (s: string): boolean {
  return /^http[s]?/.test(s)
}

/**
 * 校验是否位手机号
 * @author Visionwuwu
 * @param s 
 * @returns {boolean}
 */
 export function isPhone(phone: string) {
  return /^1[3456789]\d{9}$/.test(phone)
}

/**
 * 校验是否为邮箱号
 * @author Visionwuwu
 * @param {string} email
 * @returns {Boolean}
 */
 export function validEmail(email: string): boolean {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

