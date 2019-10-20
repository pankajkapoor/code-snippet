const stellarSdk = require('stellar-sdk');

//Stellar Configuration
let server = new stellarSdk.Server('https://horizon-testnet.stellar.org');

stellarSdk.Network.useTestNetwork();

let toAddress = "GDRXK666UVS6RGR2P7747TG46UH7A3U6WYJYXHXJFAJ37Z7B547NV24R"
let fromAddress = "GA66TCB5XIE26ZREVC5ZK5XZ6LYUHM7WQKAMKCVTGX6QKFJMPZNEEN4L"
let fromPriKey = "SDLUTFJ3JRVZBML2HM7NCXJAOYV3LW4AGERLLEDIJQNBBDBN5KEDI24W"

server.loadAccount(fromAddress)
  .then( async (account) => {
    if ((Number(100) + 2.5) < Number(account.balances[0].balance))  {
      try {
        const sourceKeys = stellarSdk.Keypair
        .fromSecret(fromPriKey);
        let fee = await server.fetchBaseFee();
        server.loadAccount(toAddress) // destination
          .then(function () {
             return server.loadAccount(sourceKeys.publicKey());
          })
          .then(function (sourceAccount) {
            transaction = new stellarSdk.TransactionBuilder(
              sourceAccount,{
                fee
              })
              .addOperation(stellarSdk.Operation.payment({
                destination: toAddress,
                asset: stellarSdk.Asset.native(),
                amount: '1000'
              }))
              .setTimeout(20)
              .addMemo(stellarSdk.Memo.text('123456'))
              .build();
            transaction.sign(sourceKeys);
            server.submitTransaction(transaction)
            .then((result) => {
              console.log(result.hash)
            })
            .catch(err => {
              console.log(err)
            })
          })
          
      } catch (err) {
          console.log(err)
        }
    } else {
        console.log('else')

    }
  })
  .catch((err) => {
      console.log(err)
  })
  //GDRXK666UVS6RGR2P7747TG46UH7A3U6WYJYXHXJFAJ37Z7B547NV24R
