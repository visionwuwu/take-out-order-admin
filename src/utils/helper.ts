const toString = Object.prototype.toString

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