module.exports = {
    create: (chain, network) => {
        return Object.assign({
            __CHAIN__: chain,
            __NETWORK__: network,
        }, (() => {
            return require("./web3/" + chain.toLowerCase())(network);
        })());
    }
}
