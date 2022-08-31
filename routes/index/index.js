const {router, fs} = require('../../src/appConfig');
const NodeMysql = require('../../classList/nodeMysql');

router
  // 首页
  .get('/home', async (ctx, next) => {
    ctx.type = 'text/html';
    ctx.body = fs.readFileSync('./public/dist/index.html', 'utf-8'); // 文件相对路径
  })
  // 图片识别文字
  .get('/tesseract', async (ctx, next) => {
    ctx.type = 'text/html';
    ctx.body = fs.readFileSync('./public/dist/index.html', 'utf-8'); // 文件相对路径
  });

module.exports = router;
