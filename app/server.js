const Koa = require('koa');
const serve = require('koa-static');
const app = new Koa();

app.use(serve(`${__dirname}/../node_modules/BSP-js/dist`, {defer: false}));
app.use(serve(`${__dirname}/../node_modules/pixi.js/dist`), {defer: false});
app.use(serve(`${__dirname}/../node_modules/lit-html`), {defer: false});
app.use(serve(`${__dirname}/web`), {defer: false});

console.log('listening on port 9001');
app.listen(9001);
