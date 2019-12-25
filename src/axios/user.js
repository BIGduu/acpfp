import request from "./index";

export const requestOnlineUser = (data) =>{
  return request('/user/online',data,'get')
};

