require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const NEXT_PUBLIC_POLYGON_AMOY_RPC = process.env.NEXT_PUBLIC_POLYGON_AMOY_RPC;
const NEXT_PUBLIC_PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545", // Standard Hardhat network URL
      chainId: 31337,               // Hardhat's default chain ID
      accounts: {
        mnemonic: "test test test test test test test test test test test junk", // Or use a private key if you have one
      }
    },
  },
};

// module.exports = {
//   solidity: "0.8.24",
//   defaultNetwork: "matic",
//   networks: {
//     hardhat: {},
//     polygon_amoy: {
//       url: NEXT_PUBLIC_POLYGON_AMOY_RPC,
//       accounts: [`0x${NEXT_PUBLIC_PRIVATE_KEY}`],
//     },
//   },
// };
