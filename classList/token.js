const consts = require('../src/const');
const {jwt} = require('../src/appConfig');

/**
 * token
 */
class token {
  /**
   * 获取一个期限为4小时的token
   * @param {Object} payload 用户信息
   * @returns token
   */
  getToken(payload = {}) {
    return 'Bearer ' + jwt.sign(payload, consts.secret, {expiresIn: '5m'});
  }

  /**
   * 通过token获取JWT的payload部分
   * @param {String} token 传递回来的token
   * @returns 解析token后的用户信息
   */
  getJWTPayload(token) {
    // 验证并解析JWT
    return jwt.verify(token.split(' ')[1], consts.secret);
  }
}

module.exports = new token();
