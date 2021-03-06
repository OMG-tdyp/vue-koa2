// const Koa = require('Koa');
// const app = new Koa();
const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');
const fs = require('fs');

router.get('/insertAllGoodsInfo', async(ctx) => {
    fs.readFile('./data_json/newGoods.json','utf8',(err,data) => {
        data = JSON.parse(data);
        let saveCount = 0;
        const Goods = mongoose.model('Goods');
        data.map((value,index) => {
            let newGoods = new Goods(value);
            newGoods.save().then( () => {
                saveCount ++;
            }).catch(err => {
                console.log(err)
            })
        })
    })
    ctx.body = '开始导入数据';
});
router.get('/insertAllCategory', async(ctx) => {
    fs.readFile('./data_json/category.json','utf8',(err,data) => {
        data = JSON.parse(data);
        let saveCount = 0;
        const Category = mongoose.model('Category');
        data.RECORDS.map((value,index) => {
            let newCategory = new Category(value);
            newCategory.save().then( () => {
                saveCount ++;
            }).catch(err => {
                console.log(err)
            })
        })
    })
    ctx.body = '开始导入数据';
});
router.get('/insertAllCategorySub', async(ctx) => {
    fs.readFile('./data_json/category_sub.json','utf8',(err,data) => {
        data = JSON.parse(data);
        let saveCount = 0;
        const CategorySub = mongoose.model('CategorySub');
        data.RECORDS.map((value,index) => {
            let newCategorySub = new CategorySub(value);
            newCategorySub.save().then( () => {
                saveCount ++;
            }).catch(err => {
                console.log(err)
            })
        })
    });
    ctx.body = '开始导入数据';
});
//获取商品详情信息的接口
router.post('/getDetailGoodsInfo', async(ctx) => {
    // let goodsId = ctx.request.body.goodsId;
    // const Goods = mongoose.model('Goods');
    // await Goods.findOne({ID: goodsId}).exec().then(async (result) => {
    //     ctx.body = {
    //         code: 200,
    //         message: result
    //     };
    // }).catch(err => {
    //     ctx.body = {
    //         code: 500,
    //         message: err
    //     };
    // });
    try{
        let goodsId = ctx.request.body.goodsId;
        const Goods = mongoose.model('Goods');
        let res = await Goods.findOne({ID: goodsId}).exec();
        ctx.body = {code: 200,message: res};
    }catch(err) {
        ctx.body = {code: 500,message: err};
    }
});

module.exports = router;