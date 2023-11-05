const { ethers } = require("hardhat")

async function createCollectionAndMint() {

    const mainContract = await ethers.getContract("Main")
    console.log(`Got contract MainContract at address: ${mainContract.address}`)
    console.log("Withdrawing from contract...")

    const newCollection = await mainContract.createCollection("Pikachu", 16)
    console.log(`New collection created by admin from contract address: ${mainContract.address}`)
    const newCollectionTx = await newCollection.wait(1)
    const collectionName = newCollectionTx.events[1].args._name
    const collectionCardCount = newCollectionTx.events[1].args._cardCount
    console.log(`New collection created with name: ${collectionName} and with card count: ${collectionCardCount}`)

  }
  
  createCollectionAndMint().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });