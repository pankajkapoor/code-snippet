const rippleAPI = require("ripple-lib").RippleAPI;
const api = new rippleAPI({ server: "wss://s.altnet.rippletest.net:51233" });


let value = 1;
value = value.toFixed(6).toString();

const fromAddress = "rL1KmRKL6zv9X5HA2rFpC3dNSXNvLQfFhC"
let secret = "sancHN8rReXDVzDjpg7CLroKifxff"; //private key
const toAddress = "rwc6uijvC6z9PUk97tyzHcpruosi3jfG97"

    
try {
  const payment = {
    source: {
      address: fromAddress,
      maxAmount: {
        value: value,
        currency: "XRP"
      }
    },
    destination: {
      address: toAddress,
      tag: 12345,
      amount: {
        value: value,
        currency: "XRP"
      }
    }
  };
  // debug('PAYMENT: ', payment);
    api
      .connect()
      .then(() => {
        //  debug("1", wallet.XRP.fromAddress);
        return api.getAccountInfo(fromAddress);
      })
      .then(info => {
        const balance = info.xrpBalance;
        //  debug("balance", balance);
        //  debug("2");
        if (balance < Number(value) + 20) {
            console.log( "Insufficient Balance");
        }
      })
      .then(() => {
        //debug("3");
        return api.preparePayment(
          fromAddress,
          payment
        );
      })
      .then(prepared => {
        //debug("4");
        //debug('PREP: ', prepared);
        return api.sign(prepared.txJSON, secret);
      })
      .then(result => {
        hash = result.id;
        // debug("5");
        return api.submit(result.signedTransaction);
      })
      .then((sub) => {
          console.log(sub.tx_json.hash)
      })
      .catch(err => {
          console.log(err)
      });
} catch (err) {
console.log(err)
}

