const web3        = require("./libs/web3").create("Web3Q", "Galileo"),
      wallet      = require("./libs/wallet").create(web3),
      transaction = require("./libs/transaction").create(web3),
      utils       = require("./libs/utils"),
      fs          = require("fs");

const OWNER = wallet.add(({
    "Web3Q": {
        "Mainnet": "", 
        "X-Mainnet": "",    
        "Galileo": "",    
    },
}[web3.__CHAIN__] || {})[web3.__NETWORK__]);

const GATEWAY = ({
    "Web3Q": {
        "Mainnet": "",
        "X-Mainnet": "",
        "Galileo": "0x0000000000000000000000000000000000000000"
    }
}[web3.__CHAIN__] || {})[web3.__NETWORK__];

const binName = "SimpleW3apps_sol_SimpleW3box.bin";
const bytecode = fs.readFileSync("./bin/" + binName);

const constructorType  = [ "address" ];
const constructorValue = [ GATEWAY ];
const params = web3.abi.encodeParameters(constructorType, constructorValue);

console.log("Chain: " + web3.__CHAIN__);
console.log("Network: " + web3.__NETWORK__);
console.log("Owner: " + OWNER.address);
console.log("");

transaction.send({
    from: OWNER.address,
    data: '0x' + bytecode.toString() + params.substring(2, params.length)
})
    .then((receipt) => {
        console.log(receipt["transactionHash"]);
        console.log(receipt["contractAddress"]);
    })
    .catch((error) => {
        console.log("ERROR: " + error);
    });
