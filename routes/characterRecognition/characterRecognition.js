const {router, path, fs, AipOcrClient, tencentcloud} = require('../../src/appConfig');
const consts = require('../../src/const');
const upload = require('../../classList/upload.js');

router
  .post('/character/recognitionbaidu', upload.single('file'), async ctx => {
    // 新建一个对象，建议只保存一个对象调用服务接口
    let client = new AipOcrClient(consts.APP_ID, consts.API_KEY, consts.SECRET_KEY);
    // 获取本地图片
    var image = fs.readFileSync(path.join(`${process.cwd()}/public/echarts/images/${ctx.req.file.filename}`)).toString('base64');
    // // 调用通用文字识别, 图片参数为本地图片
    let c = () => {
      return new Promise((resolve, reject) => {
        client
          .handwriting(image)
          .then(function (result) {
            console.log(result, 'cc');
            resolve(result);
          })
          .catch(function (err) {
            // 如果发生网络错误
            console.log(err);
            reject(err);
          });
      });
    };
    let d = await c();
    fs.unlinkSync(path.join(`${process.cwd()}/public/echarts/images/${ctx.req.file.filename}`));
    console.log(d, 'dddd');
    ctx.body = d;

    // Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
  })
  .post('/character/recognitiontx', upload.single('file'), async ctx => {
    // 获取本地图片
    var image = fs.readFileSync(path.join(`${process.cwd()}/public/echarts/images/${ctx.req.file.filename}`)).toString('base64');

    const OcrClient = tencentcloud.ocr.v20181119.Client;
    let c = () => {
      return new Promise((resolve, reject) => {
        // 实例化一个认证对象，入参需要传入腾讯云账户secretId，secretKey,此处还需注意密钥对的保密
        // 密钥可前往https://console.cloud.tencent.com/cam/capi网站进行获取
        const clientConfig = {
          credential: {
            secretId: consts.SECRETID_TX,
            secretKey: consts.SECRETKEY_TX
          },
          region: 'ap-shanghai',
          profile: {
            httpProfile: {
              endpoint: 'ocr.tencentcloudapi.com'
            }
          }
        };

        // 实例化要请求产品的client对象,clientProfile是可选的
        const client = new OcrClient(clientConfig);
        const params = {ImageBase64: image};
        client.GeneralHandwritingOCR(params).then(
          data => {
            console.log(data);
            resolve(data);
          },
          err => {
            console.error('error', err);
            reject(err);
          }
        );
      });
    };
    let d = await c();
    fs.unlinkSync(path.join(`${process.cwd()}/public/echarts/images/${ctx.req.file.filename}`));
    console.log(d, 'dddd');
    ctx.body = d;
  });

module.exports = router;
