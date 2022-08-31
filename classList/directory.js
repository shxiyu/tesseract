const {requireDirectory, Router} = require('../src/appConfig');

/**
 * 动态加载路由的类
 */
class InitDircetory {
  /**
   * 初始化操作
   * @param {Object} app new Koa()
   */
  static InitCore(app) {
    InitDircetory.app = app;
    InitDircetory.InitLoadRouters();
  }

  /**
   * 封装动态加载路由的函数
   */
  static InitLoadRouters() {
    // ${process.cwd()} 获取项目根路径
    const apiDirectory = `${process.cwd()}/routes`;
    requireDirectory(module, apiDirectory, {visit: whenLoadModule});
    function whenLoadModule(router) {
      // 如果是路由就进行注册
      if (router instanceof Router) InitDircetory.app.use(router.routes()).use(router.allowedMethods());
    }
  }
}

module.exports = InitDircetory;
