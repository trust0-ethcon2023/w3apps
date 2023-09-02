const Web3 = require("web3");

module.exports = (network) => {
    if (network === "Testnet") {
        return new Web3("https://testnet.aurora.dev").eth;
    }

    return new Web3("https://mainnet.aurora.dev").eth;
}
