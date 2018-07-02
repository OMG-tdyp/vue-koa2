const BASEURL = "https://www.easy-mock.com/mock/5aeaba62251a9a4ac1d1e26b/smileVue/";
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShoppingMallInfo : BASEURL + 'index', //商城首页信息
    getGoodsInfo : BASEURL + "getGoodsInfo",
    registerUser: LOCALURL + 'user/register', //用户注册接口
    login: LOCALURL + 'user/login', //用户登陆接口
    getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo', //获取商品详情
};

module.exports = URL;