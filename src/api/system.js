import request from '@/utils/request'

// 获取订单状态
export function getOrderStatus(params) {
  return request({
    url: 'life/portal/getOrderStatus',
    method: 'get',
    params
  })
}

// 获取登录状态
export function loginTest(params) {
  return request({
    url: 'life/portal/loginTest',
    method: 'get',
    params
  })
}

// 获取登出状态
export function logout(params) {
  return request({
    url: 'life/portal/logout',
    method: 'get',
    params
  })
}

// 获取退货状态
export function getReturnOrderStatusList(params) {
  return request({
    url: 'life/portal/getReturnOrderStatusList',
    method: 'get',
    params
  })
}


//获取发货状态
export function getDeliverStatus(params) {
  return request({
    url: 'life/portal/getDeliverStatus',
    method: 'get',
    params
  })
}

//获取订单类型
export function getOrderType(params) {
  return request({
    url: 'life/portal/getOrderType',
    method: 'get',
    params
  })
}

//获取支付状态
export function getPayStatus(params) {
  return request({
    url: 'life/portal/getPayStatus',
    method: 'get',
    params
  })
}

//获取售后类型
export function getAfterSaleType(params) {
  return request({
    url: 'life/portal/getAfterSaleType',
    method: 'get',
    params
  })
}

//获取接口列表
export function getInterfaces(params) {
  return request({
    url: 'life/portal/getInterfaces',
    method: 'get',
    params
  })
}

//获取公司下拉
export function getPartnerList(params) {
  return request({
    url: 'life/portal/partnerDownList',
    method: 'get',
    params
  })
}

//获取店铺下拉
export function getStoreList(params) {
  return request({
    url: 'life/portal/pullShop/downList',
    method: 'POST',
    data: params
  })
}

//获取仓库编号下拉
export function getCoList(params) {
  return request({
    url: 'life/portal/queryCoDownListData',
    method: 'get',
    params
  })
}




