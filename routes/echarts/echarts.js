const {router, path, fs, multer} = require('../../src/appConfig');
const NodeMysql = require('../../classList/nodeMysql');
const consts = require('../../src/const');
const upload = require('../../classList/upload.js');

// //文件上传
// var storage = multer.diskStorage({
//   //文件保存路径
//   destination: function (req, file, cb) {
//     cb(null, path.join(`${process.cwd()}/public/echarts/images/`));
//   },
//   //修改文件名称
//   filename: function (req, file, cb) {
//     var fileFormat = file.originalname.split('.');
//     cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1]);
//   }
// });
// //加载配置
// var upload = multer({storage: storage});

router
  // echarts 查询图片数据
  .get('/echarts/queryImageData', async ctx => {
    let filePath = path.join(`${process.cwd()}/public/echarts/images/`); //默认图片地址

    let imgData = [];
    let flag = true;
    await NodeMysql.MysqlQuery('echartsimg')
      .then(res => {
        imgData = JSON.parse(res);
      })
      .catch(err => {
        flag = false;
        ctx.response.body = {code: consts.code201, message: consts.addErrText, data: err};
        ctx.app.emit(consts.code201, consts.addErrText, err);
      });

    if (flag) {
      let img = () => {
        return new Promise((resolve, reject) => {
          let num = 0;
          imgData.forEach((item, i) => {
            fs.readFile(filePath + item.imgname, function (err, data) {
              imgData[i]['img'] = data;
              num += 1;
              if (num == imgData.length) {
                resolve(imgData);
              }
            });
          });
        });
      };
      let imgDatas = await img();
      console.log(imgDatas, 'mm');
      // ctx.set('content-type', 'image/png');
      ctx.body = imgDatas;
    }
  })
  // echarts 上传图片
  .post('/echarts/imgUpload', upload.single('file'), async ctx => {
    let flag = true;
    await NodeMysql.MysqlQuery('echartsimg')
      .then(res => {
        try {
          JSON.parse(res).forEach(item => {
            if (item.name == ctx.req.body.name) {
              throw '退出';
            }
          });
        } catch (err) {
          flag = false;
          console.log(ctx.req.file.filename);
          fs.unlinkSync(path.join(`${process.cwd()}/public/echarts/images/${ctx.req.file.filename}`));
          ctx.body = {code: consts.code201, message: '名称不能重复, 请重新输入'};
        }
      })
      .catch(err => {
        flag = false;
        fs.unlinkSync(path.join(`${process.cwd()}/public/echarts/images/${ctx.req.file.filename}`));
        ctx.response.body = {code: consts.code201, message: consts.addErrText, data: err};
        ctx.app.emit(consts.code201, consts.addErrText, err);
      });

    if (flag) {
      await NodeMysql.MysqlFastAdd('echartsimg', {name: ctx.req.body.name, remarks: ctx.req.body.remarks, time: ctx.req.body.time, imgname: ctx.req.file.filename})
        .then(res => {
          ctx.body = {code: consts.code200, message: consts.addEssText, data: JSON.parse(res)};
        })
        .catch(err => {
          fs.unlinkSync(path.join(`${process.cwd()}/public/echarts/images/${ctx.req.file.filename}`));
          ctx.response.body = {code: consts.code201, message: consts.addErrText, data: err};
          ctx.app.emit(consts.code201, consts.addErrText, err);
        });
    }
  });

module.exports = router;
