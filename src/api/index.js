import ajax from './ajax'

export const reqDeleteTm=(page,limit)=>{
    return ajax({
        url:`/admin/product/baseTrademark/${page}/${limit}`
    })
}