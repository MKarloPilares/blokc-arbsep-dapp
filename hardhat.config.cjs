require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    arbsep: {
      url: process.env.VITE_JSON_RPC_URL,
      accounts: [process.env.VITE_PRIVATE_KEY],
    },
  },
};
