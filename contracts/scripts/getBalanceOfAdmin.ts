const { ethers } = require("hardhat")

async function getBalanceOfAdmin() {

    const mainContract = await ethers.getContract("Main")
    console.log(`Got contract MainContract at address: ${mainContract.address}`)
    console.log("Withdrawing from contract...")

    const balance = await mainContract.balanceOf(mainContract.owner())
    console.log(`Admin has ${balance} number of cards.`)

  }
  
  getBalanceOfAdmin().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });