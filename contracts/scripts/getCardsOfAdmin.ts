const { ethers } = require("hardhat")

async function getCardsByOwners() {

    const mainContract = await ethers.getContract("Main")
    console.log(`Got contract MainContract at address: ${mainContract.address}`)
    console.log("Withdrawing from contract...")

    const cardIdList = await mainContract.getCardsByOwner(mainContract.owner())
    console.log(`Admin has these cards: ${cardIdList}`)

  }
  
  getCardsByOwners().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });