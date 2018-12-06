const Controller = require('../core/base_controller');

const qiniu = require('qiniu');
const mac = new qiniu.auth.digest.Mac(
  'GGbGHF3OxJNvj6Xzw9yjbWTCWdmYGCteZ2l_2mHA',
  'w5j33rMlLP2fi3jYfqR0brbnZ10Pbpq4rQyKiHZO'
);
const config = new qiniu.conf.Config();
const bucketManager = new qiniu.rs.BucketManager(mac, config);
const publicBucketDomain = 'http://pcmhhpvjl.bkt.clouddn.com';
const options = {
  scope: 'wenwenhai',
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);
// 空间对应的机房
config.zone = qiniu.zone.Zone_z2;
const formUploader = new qiniu.form_up.FormUploader(config);
const putExtra = new qiniu.form_up.PutExtra();

function uploadFn(readableStream) {
  return new Promise((res, rej) => {
    formUploader.putStream(
      uploadToken,
      String(Date.now()),
      readableStream,
      putExtra,
      function (respErr, respBody, respInfo) {
        if (respErr) {
          throw respErr;
        }
        if (respInfo.statusCode === 200) {
          res(respBody);
        } else {
          res(respBody);
        }
      }
    );
  });
}

class UploadController extends Controller {
  async create() {
    const {
      ctx
    } = this;
    let stream;
    try {
      stream = await ctx.getFileStream();
    } catch (e) {
      console.log(e);
    }
    const res = await uploadFn(stream);

    const publicDownloadUrl = bucketManager.publicDownloadUrl(
      publicBucketDomain,
      res.key
    );
    this.success('上传成功', publicDownloadUrl);
  }
}
module.exports = UploadController;