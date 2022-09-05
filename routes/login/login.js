const {router, captcha} = require('../../src/appConfig');
const token = require('../../classList/token');
const consts = require('../../src/const');

router
  // 登录
  .get('/login', async ctx => {
    if (Number(ctx.query.code) == consts.verification) {
      ctx.body = {
        code: consts.code200,
        message: consts.sigEssText,
        token: token.getToken({user: ctx.query.user})
      };
    } else {
      ctx.body = {
        code: consts.code201,
        message: consts.verErrText
      };
    }
  })
  // 获取验证码
  .get('/login/code', async ctx => {
    // create 生成4个字符
    // createMathExpr 生成算数式
    const cap = captcha.createMathExpr({
      size: 4, //长度
      ignoreChars: '0o1il', //排除字符
      noise: 3, //干扰线条数
      width: 120, // 宽度
      height: 36, // 高度
      noise: 4, // 干扰线条的数量
      color: true, // 验证码字符是否有颜色，默认是没有,如果设置了背景颜色，那么默认就是有字符颜色
      background: '#fff' // 背景色 可以自己改
    });
    let img = cap.data; // 验证码
    consts.verification = cap.text.toLowerCase(); // 验证码字符，忽略大小写
    ctx.type = 'html';
    ctx.body = `${img}<br><a href="javascript: window.location.reload();">${consts.verification}</a>`;
  })
  .get('/cc', async ctx => {
    // let payload = token.getJWTPayload(ctx.headers.authorization);
    // console.log(ctx.request.body);
    console.log(ctx.query.info, 'cc');
    ctx.body = ctx.query.info;
  });

module.exports = router;
