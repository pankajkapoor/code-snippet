const {clearHashInRedis} = require('../service/cache');

module.exports = async (req,res, next)=>{
    await next();        

    clearHashInRedis(req.decodedData.email);
}