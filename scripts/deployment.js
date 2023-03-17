// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners()
    console.log(`deployer ${deployer.address} in ${hre.network.name}`)

    const Teacher = await hre.ethers.getContractFactory("Teacher");
    const teacher = await Teacher.deploy();
    await teacher.deployed();

    console.log(`Teacher is deployed to  ${teacher.address}`);

    const Score = await hre.ethers.getContractFactory("Score");
    const score = await Score.deploy(teacher.address);
    await score.deployed();

    console.log(`Score is deployed to  ${score.address}`);
}

// contract validation
// npx hardhat verify --network <network> <contract address> <constructor parameters>

// Teacher: npx hardhat verify 0x613c25fc82c8ad44e50bce8e57b60dac4fe7b29d --network goerli
// Score: npx hardhat verify 0x55FD0c2A731C1Da5951Db9239603e01B6ebd6502 0x613c25fc82c8ad44e50bce8e57b60dac4fe7b29d --network goerli


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
