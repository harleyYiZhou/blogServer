const { MongoClient } = require('mongodb');

class Database {
  constructor() {
    this.url = 'mongodb://localhost:27017'; // 替换为您的 MongoDB 连接 URL
    this.dbName = 'myblog'; // 替换为您的数据库名称
    this.client = new MongoClient(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Connected to MongoDB');
      this.db = this.client.db(this.dbName);
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
      throw error;
    }
  }

  close() {
    if (this.client) {
      this.client.close();
    }
  }
}

module.exports = new Database();
