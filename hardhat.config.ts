import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
import "@openzeppelin/hardhat-upgrades";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.24",
        settings: {
          optimizer: {
            enabled: true,
            runs: 10000000,
          },
        },
      },
      {
        version: "0.7.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 10000000,
          },
        },
      },
    ],
  },
  networks: {
    sepolia: {
      url: process.env.INFURA_SEPOLIA_RPC_URL,
      accounts: [`${process.env.TEST_PRIVATE_KEY}`],
    },
    amoy: {
      url: process.env.INFURA_AMOY_RPC_URL,
      accounts: [`${process.env.TEST_PRIVATE_KEY}`],
      chainId: 80002,
    },
    ganache_local: {
      url: process.env.GANACHE_PROVIDER,
      /*       accounts: [`${process.env.GANACHE_PRIVATE_KEY}`], */
    },
  },
};

export default config;
