import request from './index'

export const getDefaultTest = (data) =>{
  return request('/test/subject/default',data,"get");
};