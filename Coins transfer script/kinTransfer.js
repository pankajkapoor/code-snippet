const bigNumber = require('bignumber.js');
const KinSdk = require('@kinecosystem/kin-sdk');
// This is necessary as StellarSDK seems to override the use of global.Promise with ES6-Promise. This may cause an issue in Stellar SDK.
global.Promise = require('bluebird'); 

const REQUIRED_CONFIRMATIONS = parseInt(process.env.KIN_NUMBER_OF_CONFIRMATIONS || 0);
const WARM_WALLET_ADDRESS = /* 'GBWPITZYRBZIJXLCR7GT2OIOIXJENXR64FHOAGDE435YDXS3LXN2F5OD' */'GC6KJABZWGES5XB2W3MZBKZQIT35AJ65BJGYSQMRNUZDN5JGFKY3E2IY';
const WARM_WALLET_PASSWORD = /* 'SD5AUPINZEGUCZVBETMD6SSTXTZKACOUOP5AUT7G4SORXL3YCL7UHEJF' */'SCX456VT5ZUFY7WQ56XP6SNIDOAD5APGZYUEH5RCS3BCXLC73OBSXGRS'
const NODE_HOST = 'https://horizon-testnet.kin.org'
const DECIMALS = 5;



KinSdk.Network.useTestNetwork();

const server = new KinSdk.Server(NODE_HOST);

const toAddress = 'GBWPITZYRBZIJXLCR7GT2OIOIXJENXR64FHOAGDE435YDXS3LXN2F5OD';
const amount = 5.00001;
const memoText = '5d6ded1a97d55c17be74eed0';
const password ='';
const comment = '';

transfer(toAddress, amount, password, comment, memoText);
async function transfer(toAddress, amount, password, comment, memoText) {
    try {
      const finalAmount = new bigNumber(amount).toFixed(DECIMALS);
      const account = await server.loadAccount(WARM_WALLET_ADDRESS);
      try {
        if (!memoText) memoText = '';
        const transaction = new KinSdk.TransactionBuilder(account)
          .addMemo(KinSdk.Memo.text(memoText))
          .addOperation(KinSdk.Operation.payment({
            destination: toAddress,
            asset: KinSdk.Asset.native(),
            amount: finalAmount
          }))
          .setTimeout(0).build();
        transaction.sign(KinSdk.Keypair.fromSecret(WARM_WALLET_PASSWORD));
        const result = await server.submitTransaction(transaction);
        console.log(result.hash)
        return result.hash;
      } catch (error) {
          console.log('Error in transaction submission:',error);
      }
    } catch (error) {
      logger.error(`Error while trying to send KIN transaction to ${toAddress}`, error);
      throw error;
    }
  }
  


// {
//   _id,
//   coin,
//   from,
//   to,
//   memo,
//   amount,
//   rawAmount,
//   validationToken,
//   txnHash,
//   blockHash,
//   blockNumber,
//   status,
//   createdAt,
//   updatedAt
// }

// PENDING
// PROCESSING
// PROCESSED
// FAILED