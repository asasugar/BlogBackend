'use strict';

const Service = require('egg').Service;
class UserService extends Service {
  async find({ userId, account, password }) {
    const findUserById = this.app.mysql.get('user', { userId });
    const findUserByAccount = this.app.mysql.get('user', { account });
    const findUserByAccountAndPassword = this.app.mysql.select('user', {
      where: {
        account,
        password,
      },
    });

    if (userId) return findUserById;
    else if (account && password) return findUserByAccountAndPassword;
    return findUserByAccount;
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
