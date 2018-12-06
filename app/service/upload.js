'use strict';

const Service = require('egg').Service;
class UploadService extends Service {
  async insert({
    imgUrl,
    userId
  }) {
    const res = await this.app.mysql.query(
      `INSERT INTO headImg (userId,imgUrl) 
      VALUES
        (?,?)
      `,
      [userId, imgUrl]
    );
    return res;
  }
}
module.exports = UploadService;