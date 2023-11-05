const { ethers } = require("hardhat")

async function getCollections() {

    const mainContract = await ethers.getContract("Main")
    console.log(`Got contract MainContract at address: ${mainContract.address}`)
    console.log("Withdrawing from contract...")

    const createdCollections = await mainContract.getAllCollections()
    console.log(`Listing all collections: ${createdCollections}`)

  }
  
  getCollections().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });