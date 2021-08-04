import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login";
import Home from "../components/Home"
import User from "../components/user/User"
import GoodsList from "../components/goods/GoodsList"
import GoodsAdd from "../components/goods/GoodsAdd";
import Chart from "../components/chart/Chart";
import Order from "../components/order/Order";
//安装路由
Vue.use(VueRouter)

//配置导出路由
export default new VueRouter({
  mode: "history",
  routes: [
    {
      //路由路径
      path: '/login',
      name: 'login',
      //跳转的组件
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/user',
          name: 'user',
          component: User
        },
        {
          path: '/goodslist',
          name: 'goodslist',
          component: GoodsList
        },
        {
          path: '/goodsadd',
          name: 'goodsadd',
          component: GoodsAdd
        },
        {
          path: '/order',
          name: 'order',
          component: Order
        },
        {
          path: '/chart',
          name: 'chart',
          component: Chart
        }
      ]
    },
  ]
})
