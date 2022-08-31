/**
 * 公共变量
 */

/**
 * 状态码
 */
exports.code200 = 200;
exports.code201 = 201;
exports.code300 = 300;
exports.code301 = 301;
exports.code400 = 400;
exports.code404 = 404;
exports.code500 = 500;
exports.codeError = 'error';
exports.codeOk = 'ok';

/**
 * 编码格式
 */
exports.utf8Type = 'utf8';
exports.binaryType = 'binary';

/**
 * 返回文字
 */
exports.sigErrText = '登录失败';
exports.sigEssText = '登录成功';
exports.addErrText = '添加失败';
exports.addEssText = '添加成功';
exports.modErrText = '修改失败';
exports.modEssText = '修改成功';
exports.obtErrText = '获取失败';
exports.obtEssText = '获取成功';
exports.parErrText = '参数错误';
exports.verErrText = '验证码错误';

/**
 * 服务器端口号
 */
exports.PORT = 9999;

/**
 * token
 */
// exports.secret = 'qwertyuiopASDFGHJKLzxcvbnm';
exports.secret = 'secret';

/**
 * 验证码
 */
exports.verification = '';

/**
 * 文字识别
 */
// 百度
exports.APP_ID = '27156654';
exports.API_KEY = '2ufVCaR0G6mpUMyPXkDO3jvL';
exports.SECRET_KEY = 'ayv3PGDL6GeWX3HG4Vfe1z8pNh7PLg58';
// 腾讯
exports.SECRETID_TX = 'AKIDKjA1smtvz462tjayIbpwx7aTTUrFfGKM';
exports.SECRETKEY_TX = 'DSk9d1Rm17MbiVJ0WwBFAy8lCSN5c1IN';

/**
 * 代理
 */
exports.options = {
  targets: {
    '/index': {
      // this is option of http-proxy-middleware
      target: 'http://localhost:3002', // target host
      changeOrigin: true // needed for virtual hosted sites
    }
  }
};
