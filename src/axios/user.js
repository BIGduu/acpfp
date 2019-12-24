import request from "./index";

export const getUser = (data) =>{
  return request('/user/online',data,'get')
};