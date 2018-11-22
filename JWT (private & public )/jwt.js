'use strict';
const fs = require('fs');
const jwt = require('jsonwebtoken');
var privateKEY  = fs.readFileSync('./private.key', 'utf8');
var publicKEY  = fs.readFileSync('./public.key', 'utf8');
/*
 ====================   JWT Signing =====================
*/
var payload = {
 data1: "Data 1",
};
var i  = 'Mysoft corp';   
var s  = 'some@user.com';   
var a  = 'http://mysoftcorp.in';
var signOptions = {
    issuer:  i,              // these
    subject:  s,             // are
    audience:  a,            // optional
    expiresIn:  "12h",       //  key-value pairs
 algorithm:  "RS256"   // RSASSA [ "RS256", "RS384", "RS512" ]
};
var token = jwt.sign(payload, privateKEY, signOptions);
console.log("Token :" + token);
/*
 ====================   JWT Verify =====================
*/
var verifyOptions = {
 issuer:  i,              // these
 subject:  s,             // are
 audience:  a,            // optional
 expiresIn:  "12h",       //  key-value pairs
 algorithm:  ["RS256"]
};
var legit = jwt.verify(token, publicKEY, verifyOptions);
console.log("\nJWT verification result: " + JSON.stringify(legit));
