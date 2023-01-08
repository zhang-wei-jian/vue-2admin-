import Vue from 'vue'
import VueRouter from 'vue-router'
import Trademark from '@/pages/Trademark'
Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        {
            path:'/trademark',
            component:Trademark
        },
        {
            path:'',
           redirect:'/trademark'
        },
    ]
})