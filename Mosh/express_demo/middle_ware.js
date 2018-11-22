/**
 * A middleware function is a function which takes the req object and eihter send response to
 * the client or passes control to the next middleware function.
 * 
 * Every route handler is a middleware function
 */
function middleWare(req,res,next){
    console.log('Logging....');
    next();
}

module.exports = middleWare;