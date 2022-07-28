import { ethers } from "hardhat";

async function main() {

  const lockedAmount = ethers.utils.parseEther("1");

  const Wallet = await ethers.getContractFactory("wallet");
  const wallet = await Wallet.deploy();

  await wallet.deployed();

  console.log("Wallet deployed to:", wallet.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
