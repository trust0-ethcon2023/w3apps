const Web3 = require("web3");

module.exports = (network) => {
    if (network === "Galileo") {
        return new Web3("https://galileo.web3q.io:8545").eth;
    }

    return new Web3("https://galileo.web3q.io:8545").eth;
}
