const toString = Object.prototype.toString
/**
 * 混合对象实现
 * @param to 目标值
 * @param from 当前值
 * @returns 混合对象
 */
 export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    (to as T & U)[key] = from[key] as any;
  }
  return to as T & U;
}

/**
 * 将以逗号分割的图片列表，格式化
 * @param images
 * @returns
 */
export function formatCommaSplitPicture(images: string): string[] {
  return images ? images.split(',') : []
}

/**
 * 判断当前值是否为普通对象
 * @param val
 * @returns
 */
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
