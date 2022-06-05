// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const baseURI = "ipfs://Qmbusv3kFrgzDkWNSFaUGGcrxzQ8vTs1aX7rhC8PznriHi/";

  const Shell = await hre.ethers.getContractFactory("Shell");
  const shell = await Shell.deploy(baseURI);

  await shell.deployed();

  console.log("Shellpop deployed to:", shell.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
