var Web3 = require("web3");
var web3 = new Web3();
const BigNumber = require("bignumber.js");
web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/OXT57RSCW0pU6bRNWyX7"));
const decimal = new BigNumber(10 ** 18);


  
const to = "0xDBa84A9f7c3d097aBAb8979D73b04d8b04713255"; // to address
let value = new BigNumber(Number(0.0001).toFixed(18));
const amount = value.multipliedBy(decimal).toNumber();
const privateKey = "0xA565E95276A6A2D403EE246B37A8A457D5D9FCEBB863A37D771E084538573D35"; // private key of to
const gas = 21000
// console.log('amount:', amount);
// console.log('gas   :', gas)

try {
  const from = "0xa1b81F05B9801D3222d178B8F53675ea5344cb03";  // from address
  web3.eth.getBalance(from).then(function(ethBalance) {
    console.log(ethBalance)
    if (Number(amount) > Number(ethBalance)) {
      console.log("Insufficient ETH Balance");
    } else {
      web3.eth
        .getTransactionCount(from, "pending")
        .then(function(count) {
          var tx = {
            from: from,
            to: to,
            gas: gas,
            value: amount,
            nonce: count
          };
          web3.eth.getGasPrice().then(function(gasPrice) {
            if (2 * gasPrice * tx.gas > ethBalance - amount) {
              console.log("Insufficient Ether Balance For Gas");
            } else {
              tx.gasPrice = 2 * gasPrice;
              web3.eth.accounts
                .signTransaction(tx, privateKey)
                .then(signed => {
                  var tran = web3.eth.sendSignedTransaction(
                    signed.rawTransaction
                  );
                  tran.on("transactionHash", (hash) => {
                      console.log(hash)
                  });
                })
                .catch((err)=>{
                  console.log(err)
                });
            }
          });
        });
    }
  });
} catch (err) {
    console.log(err)
}
