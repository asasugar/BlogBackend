'use strict';

const Service = require('egg').Service;
class UserService extends Service {
  async find(id) {
    const findUserById = this.app.mysql.get('user', { id });
    const findUserAll = this.app.mysql.select('user');
    if (id) return findUserById;
    return findUserAll;
  }
  async insert(data) {
    const addUser = this.app.mysql.insert('user', data);
    return addUser;
  }
  async update(data) {
    const addUser = this.app.mysql.update('user', data);
    return addUser;
  }
  async delete(id) {
    const addUser = this.app.mysql.delete('user', { id });
    return addUser;
  }
}
module.exports = UserService;
