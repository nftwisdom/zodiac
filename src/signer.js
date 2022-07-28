const fs = require('fs');

const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider);

const addresses = require('./addresses.json');

const signer = web3.eth.accounts.privateKeyToAccount('cb10e04fd2c9d928b466a8f1186fb2c7e6cee7c56134cd9be6c9110b2eefbd9f');

let signedMessages = {};

// Sign messages whitelisted users. These signatures will
// allow these addresses to claim either 3, 2 or 1 tokens
for (let address of addresses) {

    // Construct message to sign.
    let message = `0x000000000000000000000000${address.substring(2)}`;
    console.log(`Signing ${address} :: ${message}`);

    // Sign the message, update the `signedMessages` dict
    // storing only the `signature` value returned from .sign()
    let { signature } = signer.sign(message);
    signedMessages[address] = signature;

}

fs.writeFileSync('./signatures.json', JSON.stringify(signedMessages, null, 2), 'utf8');
console.log("Signatures Written > `./signatures.json`");
