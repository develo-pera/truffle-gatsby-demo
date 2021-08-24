const HDWalletProvider = require("@truffle/hdwallet-provider");

const dotenv = require("dotenv").config();

const port = 9545;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: "./client/contracts",
  networks: {
    ajde: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, `http://127.0.0.1:${port}`)
      },
      network_id: '*',
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`)
      },
      network_id: 4
    }
  }
};
