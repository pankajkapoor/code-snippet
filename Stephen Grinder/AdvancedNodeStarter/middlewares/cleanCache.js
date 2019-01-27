const {clearHashInRedis} = require('../services/cache');

module.exports = async (req,res, next)=>{
    await next();         // here await ensure that execution comes back to this function after executing the route
                         // handler

    clearHashInRedis(req.user.id);
}