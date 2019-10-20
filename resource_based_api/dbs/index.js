const mongodb = require('mongodb');
const {MongoClient} = mongodb;

const mongoUrl = "mongodb://localhost:27017/user";

module.exports = async () => {
    const client = await MongoClient.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 10
    });
    return {
        client,
        db:client.db('user')
    }
}