const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const redisUrl = 'redis://127.0.0.1:6379';
const  client = redis.createClient(redisUrl);
client.hget = util.promisify(client.hget);


const exec = mongoose.Query.prototype.exec;   /// this exec store a refference to the original exec function

mongoose.Query.prototype.cache = function(options = {}) {
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || '')   // options is an object with property key
    return this;
}

mongoose.Query.prototype.exec = async function(){

    if(!this.useCache){
        return exec.apply(this, arguments);
    }

    const key = JSON.stringify(Object.assign({}, this.getQuery(), {             // object.assign is used to copy properties from one object to
        collection: this.mongooseCollection.name  // to another object
    }));

    // Do we have any cached data in redis related to this query

    const cacheValue = await client.hget(this.hashKey, key);
    
    // if yes, then respond to the request right away and return
    if(cacheValue){

//////////// this is causing error because mongoose needs a document and we are giving a JSON data to it 
                                     
    //   const doc = new this.model(JSON.parse(cacheValue));   /* model is a class. Here we are converting a JSON
    //                      ^                                       object into a mongoose document */        
    //                      |
    //                 /**this is same as  new Blog({
    //                                             titile: 'Hi',
    //                                             content: 'There'}) */

    //   return doc
        
    const doc = JSON.parse(cacheValue);

    return Array.isArray(doc)
            ? doc.map(d=> new this.model(d))
            : new this.model(doc)

    }
    
    // if no, we need to respond to request and update our cache to store the data
    
    const result = await exec.apply(this, arguments);   // this is the original exec function which is used to execute the query 
                                                       // this result is a mongoose document so we have to convert 
                                                       // it into the Json format
    
    client.hset(this.hashKey, key, JSON.stringify(result));

    return result;
}

module.exports = {
    clearHashInRedis(hashKey){              // this function is to delete data from redis
        client.del(JSON.stringify(hashKey));
    }
}