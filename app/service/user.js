'use strict';

const Service = require('egg').Service;
class UserService extends Service {
  async find({ userId, account }) {
    const findUserById = this.app.mysql.get('user', { userId });
    const findUserByAccount = this.app.mysql.get('user', { account });
    // const findUserAll = this.app.mysql.select('user');
    if (userId) return findUserById;
    else if (account) return findUserByAccount;
    return false;
  }
  async insert(data) {
    const addUser = this.app.mysql.insert('user', data);
    return addUser;
  }
  async update(data) {
    const addUser = this.app.mysql.update('user', data);
    return addUser;
  }
  async delete(userId) {
    const addUser = this.app.mysql.delete('user', { userId });
    return addUser;
  }
}
module.exports = UserService;
