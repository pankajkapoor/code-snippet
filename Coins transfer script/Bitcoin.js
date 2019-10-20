const bitcoin = require("bitcoinjs-lib"); // Use version 2.2.0
const request = require("request");
const BigNumber = require("bignumber.js");
const decimal = new BigNumber(10 ** 8);

let network = bitcoin.networks.testnet;

let BTCPUSH = "https://api.blockcypher.com/v1/btc/test3/txs/push";

let BTCBASE = "https://api.blockcypher.com/v1/btc/test3/addrs/";


const to = "2N4LWhH6rsE2pkcDPxKoAj5THZEdap7RbxD"; // to address
// let value = new BigNumber(Number(0.0000001).toFixed(8));
let amount = 180000//value.multipliedBy(decimal).toNumber();

const privateKeyWif = "cVTeC1E97MtkJJ8URmQtq5tnwdCxr2qvkFEmjgkt739YGbq3qFLT"; // private key

const from = "mz3XXPy1urxv8TD6JPdgw6ZijBWKSdUqRh"; // from address

const gas = 51600;

try {
    const keyPair = bitcoin.ECPair.fromWIF(
        privateKeyWif,
        network
      );

  const url = BTCBASE + from + "?unspentOnly=true";
  request(url, function(error, resp, body) {
    if (!error && resp.statusCode == 200) {
      const result = JSON.parse(body);
      if (result.txrefs == null) {
        console.log("You can't do transaction till your previous transaction is not confirmed");
      } else {
        const balance = Number(result.balance);
        if (balance > Number(amount) + Number(gas)) {
            console.log('balance:', balance)
          const tx = buildTransaction(
            result,
            amount,
            from,
            to,
            gas,
            keyPair
          );
          const options = {
            url: BTCPUSH,
            method: "POST",
            json: {
              tx: tx.toHex()
            }
          };
          request(options, function(err, httpRes, body) {
            if (err && httpRes.statusCode != 200) {
                console.log('try again')
            } else {
                console.log(body.tx.hash)
            }
          });
        } else {
            console.log('Insufficient balance');
        }
      }
    } else {
        console.log('in the else block')
    }
  });
} catch (e) {
    console.log(e)
}

  
    function buildTransaction(result, amount, from, to, gas, keyPair) {
      const balance = result.balance;
      const txrefs = result.txrefs;
      var txb = new bitcoin.TransactionBuilder(network);
      for (i = 0; i < txrefs.length; i++) {
        txb.addInput(txrefs[i].tx_hash, txrefs[i].tx_output_n);
      }
      txb.addOutput(to, amount);
      txb.addOutput(from, balance - amount - gas);
      for (i = 0; i < txrefs.length; i++) {
        txb.sign(i, keyPair);
      }
      return txb.build();
    }

    // 6d69cb98a0ae5627acd7747acf032a0f3eab62b5ba63e5b4bb0bdadcde89cb1e