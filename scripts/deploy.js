const hre = require("hardhat");

async function main() {

    const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
    const nftMarketplace = await NFTMarketplace.deploy();

    const TransferFunds = await hre.ethers.getContractFactory("TransferFunds");
    const transferFunds = await TransferFunds.deploy();

    await transferFunds.deployed();
    await nftMarketplace.deployed();

    console.log(` deployed contract Address NFTMarketplace ${nftMarketplace.address}`);
    console.log(` deployed contract Address TransferFunds ${transferFunds.address}`);
}
main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
})
