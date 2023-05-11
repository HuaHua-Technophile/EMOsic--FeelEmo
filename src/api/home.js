import request from "./http";


// 获取轮播图数据
// http://192.168.36.2:3000/banner

export function getBanner(){
    return request({
        url:"/banner",
        method:"get",
        params:{
            type:2 //手机版本
        }
    })
}


