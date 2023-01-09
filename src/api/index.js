import ajax from './ajax';
import axios from 'axios'

export const reqTmList = (page, limit) => {
  return ajax({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
  });
};

export const reqAddOrEdit = (tm) => {
  if (tm.id) {
    return ajax({
      //有id就是修改
      url: `/admin/product/baseTrademark/update`,
      method: 'put',
      data: tm,
    });
  } else {
    return ajax({
      url: `/admin/product/baseTrademark/save`,
      method: 'post',
      data: tm,
    });
  }
};
export const reqDeleteTm = (id) => {

  return ajax({
    url:  `/admin/product/baseTrademark/remove/${id}`,
    method: 'delete',
  });
};
export const reqYiYan = () => {
  return axios({
    url: `https://v1.hitokoto.cn/`,
    method:'get'
  
  });
};
///admin/product/baseTrademark/remove/{id}
