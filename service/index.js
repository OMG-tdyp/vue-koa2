const Koa = require('koa');
const app = new Koa();
const {connect,initSchemas} = require('./database/init.js');
const mongoose = require('mongoose');

;(async () => {
    await connect();
    initSchemas();
    const User = mongoose.model('User');
    let oneUser = new User({userName: 'caikaikai',password: 'df45zxcv'});
    oneUser.save().then( () => {
        console.log('插入成功')
    });
    let users = await User.findOne({}).exec();
    
})()

app.use(async(ctx) => {
    ctx.body = '<h1>Koa2</h1>';
});

app.listen(3000,() => {
    console.log('[server] starting at port 3000')
})