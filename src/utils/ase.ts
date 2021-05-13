/**
 * @Description AES加密(对称加密算法，加密解密用同一个密钥)
 * @Author Visionwuwu
 * @Date 2021-05-10 22:23:00
 * @LastEditors Visionwuwu
 * @LastEditTime 2021-05-10 22:23:00
 */

import { AES, enc, mode, pad } from 'crypto-ts'
import Keys from '@/constant/key'

// ECB又称电码本模式，明文分块后依次独立加密。

// PKCS7是当下各大加密算法都遵循的数据填充算法，且 OpenSSL 加密算法簇的默认填充算法就是 PKCS7。

export default class VAES {
  static encrypt(text: string | null): string | null {
    return AES.encrypt(text ?? '', Keys.aseKey, { mode: mode.ECB, padding: pad.PKCS7 }).toString()
  }

  static decrypt(text: string | null) {
    return AES.decrypt(text ?? '', Keys.aseKey, { mode: mode.ECB, padding: pad.PKCS7 }).toString(enc.Utf8)
  }
}