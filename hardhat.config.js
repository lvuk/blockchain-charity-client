require("hardhat/config.js").HardhatUserConfig;
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
    solidity: "0.8.20",
    networks: {
        sepolia: {
            url: `${process.env.INFURA_URL}`,
            accounts: [`0x${process.env.FUND_ADDRESS_PRIVATE_KEY}`],
        },
    },
};
