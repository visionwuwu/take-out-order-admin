import { getToken } from 'utils/cookies'

/** 用户性别 */
export enum UserSex {
  /** 未知 */
  unknown = '0',
  /** 男性 */
  male = '1',
  /** 女性 */
  famale = '2',
}

/** 用户状态接口定义 */
export interface UserState {
  token: string;
  username: string;
  mobile: string;
  email?: string;
  avatar?: string;
  remarks?: string;
  sex?: UserSex;
}

export const state: UserState = {
  token: getToken() ?? '',
  username: '',
  mobile: '',
  email: '',
  avatar: '',
  remarks: '',
  sex: UserSex.unknown
}