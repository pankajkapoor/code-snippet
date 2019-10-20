const request = require('request');
const Eos = require("eosjs");

let chainId = "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473";
let httpEndpoint = "http://jungle2.cryptolions.io:80";

let config = {
  chainId: chainId,
  httpEndpoint: httpEndpoint,
  expireInSeconds: 60,
  broadcast: true,
  debug: false,
  sign: true
};    
    
let eosConfig = config;
const to = "poiuytrewqas"
let amount = 0.2
amount = amount.toFixed(4);
let memo = 'payment';

request(
  {
    url: httpEndpoint + "/v1/chain/get_account",
    method: "POST",
    json: { account_name: to }
  },
  (error, data) => {
            // console.log(data.body)
    if (data.body.account_name == to) {

    try {
      let from = "asdfgbnmlkjh"; // from address
      eosConfig.keyProvider = "5KZfjPgcmKw47sVXaNVXvF7eND23HCpgbZFdHxR33dpa6ZXo5HF"; // private key
      let eos = Eos(eosConfig);
      eos.transfer({
          from: from,
          to: to,
          quantity: amount + " EOS",
          memo: memo
        })
        .then(response => {
          if (
            response.processed.id == null ||
            response.processed.id == undefined
          ) {
            res
              .status(400)
              .json({ msg: "Malformed Transaction" });
          
          }else{
            console.log(response.processed.id)
          }
        })
        .catch(error => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  }
})

// Public: EOS7WvK5rR6gBa8KZuhkaU7sfersarJF1q9YdZNJ7dzwRLAdTzCuv 
// Private key: 5KZfjPgcmKw47sVXaNVXvF7eND23HCpgbZFdHxR33dpa6ZXo5HF
// add: asdfgbnmlkjh