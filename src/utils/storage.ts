/**
 * @Description AES加密(对称加密算法，加密解密用同一个密钥)
 * @Author Visionwuwu
 * @Date 2021-05-10 22:41:00
 * @LastEditors Visionwuwu
 * @LastEditTime 2021-05-10 22:41:00
 */

import VAES from './ase'
import Cookies from 'js-cookie'

export enum StorageType {
  local,
  session,
  cookie,
}

export interface VStorageInterface {
  rcSetItem<T>(type: StorageType, key: string, value: T): void
  rcGetItem(type: StorageType, key: string): string | null
  rcRemoveItem(type: StorageType, key: string): void
}


class VStorage implements VStorageInterface {
  private static instance: VStorage
  static shared() {
    // 当前this指向VStorage类
    if (!this.instance) {
      this.instance = new VStorage()
    }
    return this.instance
  }

  /**
   * @description 保存数据AES加密处理
   * @param type 保存数据类型 
   * @param key 
   * @param value 
   */
  rcSetItem<T>(type: StorageType = StorageType.local, key: string, value: T): void {
    const valueJson = JSON.stringify(value);
    const valueAes = VAES.encrypt(valueJson) as string
    if (type === StorageType.local) {
      localStorage.setItem(key, valueAes)
    } else if (type === StorageType.session) {
      sessionStorage.setItem(key, valueAes)
    } else {
      Cookies.set(key, valueAes)
    }
  }

  rcGetItem(type: StorageType = StorageType.local, key: string): string | null {
    if (type === StorageType.local) {
      return VAES.decrypt(localStorage.getItem(key))
    } else if (type === StorageType.session) {
      return VAES.decrypt(sessionStorage.getItem(key))
    } else {
      return VAES.decrypt(Cookies.get(key) ?? '')
    }
  }

  rcRemoveItem(type: StorageType = StorageType.local, key: string): void {
    if (type === StorageType.local) {
      localStorage.removeItem(key)
    } else if (type === StorageType.session) {
      sessionStorage.removeItem(key)
    } else {
      Cookies.remove(key)
    }
  }
}

export default VStorage.shared()