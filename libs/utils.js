const Web3 = require("web3");
const web3 = new Web3();
const BN = web3.utils.BN;

module.exports = {
    wei_to_ether: (number) => {
        return parseFloat(web3.utils.fromWei(number, "ether"));
    },

    ether_to_wei: (number) => {
        return new BN(web3.utils.toWei(number.toString(), "ether"));
    },

    value_to_number: (value) => {
        return new BN(parseInt(value));
    },

    power: (base, exponent) => {
        return new BN(base).pow(new BN(exponent));
    },

    is_same_address: (address1, address2) => {
        return address1.toLowerCase() === address2.toLowerCase();
    },
}
