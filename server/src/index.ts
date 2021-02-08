const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const koaStatic = require('koa-static');
const path = require('path');
const session = require('koa-session');

app.keys = ['some secret hurr'];
const sessionConfig = {
    key: 'koa:sess',   //cookie key (default is koa:sess)
    maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
    overwrite: true,  //是否可以overwrite    (默认default true)
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true,   //签名默认true
    rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false,  //(boolean) renew session when session is nearly expired,
};
app.use(session(sessionConfig, app));



const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true
}

app.use(bodyParser())
app.use(cors(corsOptions));

// 引入路由
require('./routers')(app);

app.use(koaStatic(path.join(__dirname, './static')))
app.listen(3030);