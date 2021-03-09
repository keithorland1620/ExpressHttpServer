const DatabaseContext = require('./dbContext');

class UserContext extends DatabaseContext {
  constructor () {
    super('user');
  }
  async getAllUser(){
    return await this.getAll();
  }
  async addUser (type){
    await this.insert(type);
    return true;
  }

  async getUserByUsername (type) {
    return await this.getByAny('userName', type);
  } 

  async getUserByEmailAddress (type) {
    return await this.getByAny('emailAddress', type);
  }
  async updateUserByUsername(type, data){
    return await this.update(type, data);
  }
  async deleteByUserName (type) {
    return await this.delete('userName', type);
  }
}

module.exports = new UserContext();
