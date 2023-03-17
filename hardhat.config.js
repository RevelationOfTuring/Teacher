require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    networks: {
        goerli: {
            url: process.env.GOERLI_URL,
            chainId: 5,
            accounts: [process.env.GOERLI_PRIVATE_KEY]
        }
    },
    solidity: {
        compilers: [
            {
                version: "0.8.18",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                    evmVersion: "istanbul"
                }
            }
        ]
    },
    etherscan: {
        apiKey: {
            goerli: process.env.ETHERSCAN_API_KEY
        }
    }
};
