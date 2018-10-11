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
  async update(data, options) {
    const updateUser = this.app.mysql.update('user', data, options);
    return updateUser;
  }
  async delete(userId) {
    const deleteUser = this.app.mysql.delete('user', { userId });
    return deleteUser;
  }
}
module.exports = UserService;
