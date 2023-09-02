const web3        = require("./libs/web3").create("Web3Q", "Galileo"),
      wallet      = require("./libs/wallet").create(web3),
      transaction = require("./libs/transaction").create(web3),
      utils       = require("./libs/utils");

const OWNER = wallet.add(({
    "Web3Q": {
        "Mainnet": "", 
        "X-Mainnet": "",    
        "Galileo": "",    
    },
}[web3.__CHAIN__] || {})[web3.__NETWORK__]);

const CONTRACT = ({
    "Web3Q": {
        "Mainnet": "", 
        "X-Mainnet": "",    
        "Galileo": "",    
    },
}[web3.__CHAIN__] || {})[web3.__NETWORK__];

console.log("Chain: " + web3.__CHAIN__);
console.log("Network: " + web3.__NETWORK__);
console.log("Contract: " + CONTRACT);
console.log("Owner: " + OWNER.address);
console.log("");
