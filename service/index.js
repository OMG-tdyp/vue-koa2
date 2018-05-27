const Koa = require('koa');
const app = new Koa();

app.use(async(ctx) => {
    ctx.body = '<h1>Koa2</h1>';
});

app.listen(3000,() => {
    console.log('[server] starting at port 3000')
})