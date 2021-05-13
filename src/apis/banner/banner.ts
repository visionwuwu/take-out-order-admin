import { PageModel } from '@/common/model/pageModel'
import request, { AxiosResultData } from 'utils/request'
import { BannerList, BannerListItem, BannerModel } from './model/bannerModel'

export enum ApiUrls {
  loadBannerList = '/banners/list',
  loadBannerById = '/banners',
  insetBanner = '/banners/add',
  updateBannerById = '/banners',
  deleteBannerById = '/banners',
}

/**
 * 加载轮播图列表
 * @param filterQuery 
 * @param page 
 * @returns 
 */
export function reqBannerList<T = AxiosResultData<BannerList>>(page: PageModel) {
  const params = { pageSize: page.limit, pageNumber: page.page }
  return request<T>({
    method: 'get',
    url: ApiUrls.loadBannerList,
    params,
  })
}

/**
 * 根据id加载轮播图信息
 * @param id 
 * @returns 
 */
export function reqBannerById<T = AxiosResultData<BannerListItem>>(id: number) {
  return request<T>({
    method: 'get',
    url: `${ApiUrls.loadBannerById}/${id}`,
  })
}

/**
 * 创建轮播图
 * @param banner 
 * @returns 
 */
export function reqCreateBanner<T = AxiosResultData>(data: BannerModel) {
  return request<T>({
    method: 'post',
    url: ApiUrls.insetBanner,
    data,
  })
}

/**
 * 更新轮播图信息
 * @param id 
 * @param banner 
 */
export function reqUpdateBannerById<T = AxiosResultData>(id: number, data: BannerModel) {
  return request<T>({
    method: 'put',
    url: `${ApiUrls.updateBannerById}/${id}`,
    data,
  })
}

/**
 * 删除轮播图信息
 * @param id 
 * @returns 
 */
export function reqDeleteBannerById<T = AxiosResultData>(id: number) {
  return request<T>({
    method: 'delete',
    url: `${ApiUrls.deleteBannerById}/${id}`
  })
}