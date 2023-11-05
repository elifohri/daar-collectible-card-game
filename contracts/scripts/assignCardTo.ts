const { ethers } = require("hardhat")

async function assignCardTo() {

    const mainContract = await ethers.getContract("Main")
    console.log(`Got contract MainContract at address: ${mainContract.address}`)
    console.log("Withdrawing from contract...")

    const toAddress = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
    const cardId = 7
    await mainContract.assignCardToUser(cardId, toAddress)
    console.log(`Card id ${cardId} is successfully assigned to ${toAddress}`)
  }
  
  assignCardTo().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });