const { ethers } = require("hardhat")

async function getCardsByOwners() {

    const mainContract = await ethers.getContract("Main")
    console.log(`Got contract MainContract at address: ${mainContract.address}`)
    console.log("Withdrawing from contract...")

    const userAddress = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
    const cardIdList = await mainContract.getCardsByOwner(userAddress)
    console.log(`User has these cards: ${cardIdList}`)

  }
  
  getCardsByOwners().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });