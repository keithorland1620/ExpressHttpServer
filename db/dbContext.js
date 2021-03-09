const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const path = require('path');

const adapter = new FileAsync(path.join(__dirname, 'db.json'));


class DatabaseContext {
    constructor (collectionName) {
      this.collectionName = collectionName;
      this.dbContext = low(adapter).then(context => {
        context.defaults({ [collectionName]: [] }).write();
  
        return context;
      });
    }
  
    async getAll () {
      const context = await this.dbContext;
      return context
        .get(this.collectionName)
        .value() || [];
    }
  
    async getByFilter (filter = {}) {
      const context = await this.dbContext;
  
      return context
        .get(this.collectionName)
        .filter(filter)
        .value();
    }
  
    async getByAny (propName, propValue) {
      const context = await this.dbContext;
  
      return context
        .get(this.collectionName)
        .find({ [propName]: propValue })
        .value() || {};
    }
  
    async getById (id) {
      const context = await this.dbContext;
  
      return context
        .get(this.collectionName)
        .find({ id })
        .value() || {};
    }
  
    async insert (data = {}) {
      const context = await this.dbContext;
  
      context
        .get(this.collectionName)
        .push(data)
        .write();
    }
  
    async update (userName, data = {}) {
      const context = await this.dbContext;
      console.log(userName);
      console.log(data);
      context
        .get(this.collectionName)
        .find({ userName })
        .assign(data)
        .write();
    }
  
    async delete (propName, propValue) {
      const context = await this.dbContext;
      context.get(this.collectionName).remove({ [propName]: propValue}).write();
  
    }
  }
  
  module.exports = DatabaseContext;
  