const {mysql} = require('../src/appConfig');

/**
 * 数据库
 */
class NodeMysql {
  constructor() {
    this.db = mysql.createConnection({
      host: '127.0.0.1', // 或者localhost
      user: 'root', // 数据库用户名
      password: '123456', // 数据库密码
      port: '3306', // 数据库端口
      database: 'test' // 你创建的数据库名
    });
  }

  /**
   * login 你创建的数据库的表名, 根据实际所创建的填写, 不一定需要一样!
   */

  /**
   * 测试mysql数据库是否能正常工作
   * 只要能打印出[RawDataPacket{'1':1}]的结果，就证明数据库连接正常
   * @returns 查询到的数据库数据
   */
  MysqlTest() {
    return new Promise((resolve, reject) => {
      this.db.query('SELECT 1', (err, results) => {
        if (err) throw reject(err); //mysql工作期间报错
        resolve(results);
      });
    });
  }

  /**
   * 查询数据库 login 表格所有数据
   * @returns 查询成功与否的结果
   */
  MysqlQuery(table) {
    return new Promise((resolve, reject) => {
      this.db.query(`select * from ${table}`, (error, results, fields) => {
        if (error) throw reject(error);
        resolve(JSON.stringify(results));
      });
    });
  }

  /**
   * 添加数据库数据
   * @param {Object} data 需要添加的数据
   * @returns 添加成功与否的结果
   */
  MysqlAdd(data) {
    const strSql = `insert into login (id, name) values (?,?)`;
    return new Promise((resolve, reject) => {
      this.db.query(strSql, [data.id, data.name], async (error, results) => {
        if (error) throw reject(error);
        resolve(JSON.stringify(results));
      });
    });
  }

  /**
   * 添加数据库数据 如果数据一一对应，可以快速插入数据库
   * @param {Object} data 需要添加的数据
   * @returns 添加成功与否的结果
   */
  MysqlFastAdd(table, data) {
    const strSql = `insert into ${table} set ?`;
    return new Promise((resolve, reject) => {
      this.db.query(strSql, data, async (error, results) => {
        if (error) throw reject(error);
        resolve(JSON.stringify(results));
      });
    });
  }

  /**
   * 修改数据库数据
   * @param {Object} data 需要修改的数据
   * @returns 修改成功与否的结果
   */
  MysqlUpdate(data) {
    const strSql = `update login set name = ? where id = ?`;
    return new Promise((resolve, reject) => {
      this.db.query(strSql, [data.name, data.id], async (error, results, fields) => {
        if (error) throw reject(error);
        resolve(JSON.stringify(results));
      });
    });
  }
}

module.exports = new NodeMysql();
