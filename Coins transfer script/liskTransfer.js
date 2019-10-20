const lisk = require('lisk-elements');
const client = lisk.APIClient.createTestnetAPIClient()

const BigNumber = require('bignumber.js');

// const options = {
//   bannedNodes: [], // An array of nodes which should not be used (overrides the array of nodes used to initialise the client).
//   client: { // An object specifying certain details about your client, which will be included as part of the User-Agent header when sending HTTP requests.
//     name: 'COSS.IO',
//     version: '1.0',
//     engine: 'microsvc-wallet-lsk',
//   },
//   node: 'http://104.237.2.217:7000', // The node to use first (overrides the order of the array of nodes used to initialise the client).
//   randomizeNodes: false, // Whether a random node should be selected after one becomes unreachable. (Default: true.)
// };


// const client = new lisk.APIClient(
//   'http://104.237.2.217:7000',
//   {
//     ...options,
//     nethash: lisk.constants.TESTNET_NETHASH,
//   },
// );




async function transfer(toAddress, amount, fromPassword) {
  try {
    const finalAmount = new BigNumber(amount).times(new BigNumber(10).pow(8));
    const transaction = lisk.transaction.transfer({
      recipientId: toAddress,
      amount: finalAmount.toString(),
      passphrase: fromPassword
    });

    const result = await client.transactions.broadcast(transaction);
    console.log(result);
    const id = lisk.transaction.utils.getTransactionId(transaction);
    console.log(id)
  } catch (error) {
      console.log(error)
  }
}

// transfer('10429735884697950021L', 52, 'force boat glory slight shoulder quick assume review beach whale foster together') // psir
transfer('5224185984448317563L', 2, 'crane happy bean tornado sketch stem asset shiver priority soldier climb wife') 
