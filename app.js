const {app, json, cors, onerror, bodyparser, logger, proxy, koa_jwt} = require('./src/appConfig');
const consts = require('./src/const');
const {accessLogger} = require('./logger/logger');
const token = require('./classList/token');
const InitDircetory = require('./classList/directory');

// const secret = 'qwertyuiopASDFGHJKLzxcvbnm';

// error 错误处理
onerror(app);

app
  // 当token验证异常时候的处理，如token过期、token错误
  .use((ctx, next) => {
    console.log(ctx, 'mmxxx');
    return next().catch(err => {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = {
          code: ctx.status,
          message: err.message == 'Authentication Error' ? 'token失效, 请重新登录!' : err
        };
      } else {
        throw err;
      }
    });
  })
  // 访问日志--记录用户所有访问请求
  .use(accessLogger())
  // 跨域
  .use(
    cors({
      origin: function (ctx) {
        return ctx.header.origin;
      }
    })
  )
  // 使用koa-bodyparser中间件
  .use(
    bodyparser({
      enableTypes: ['json', 'form', 'text'],
      multipart: true, // 开启文件上传
      formidable: {
        maxFileSize: 500 * 1024 * 1024, // 设置上传文件大小最大限制，默认5M
        keepExtensions: true // 保留文件拓展名
      }
    })
  )
  // 代理, 根据实际添加
  .use(proxy(consts.options))
  .use(json())
  .use(logger())
  // 路由权限控制
  // .use(
  //   koa_jwt({secret: consts.secret}).unless({
  //     // 设置login接口，可以不需要认证访问
  //     path: [/^\/login/, /^\/code/, /^\/echarts/, /^\/character\/recognitionbaidu/, /^\/character\/recognitiontx/]
  //   })
  // )
  // 静态资源目录
  .use(require('koa-static')(__dirname + '/public/dist'))
  // logger
  .use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });
InitDircetory.InitCore(app); // 执行动态加载路由的类的初始化函数

module.exports = app;
