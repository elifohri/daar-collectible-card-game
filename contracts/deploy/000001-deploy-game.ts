import 'dotenv/config'
import { DeployFunction } from 'hardhat-deploy/types'
const { ethers, getNamedAccounts } = require("hardhat")

const deployer: DeployFunction = async hre => {
  if (hre.network.config.chainId !== 31337) return
  const { deployer } = await hre.getNamedAccounts()
  console.log("----------------------------------------------------")
  console.log(`Available deployer account: ${deployer}`)
  console.log("----------------------------------------------------")
  const accounts = await ethers.getSigners();
  console.log("----------------------------------------------------")
  console.log(`Other available accounts:`)
  for (const account of accounts) {
    console.log(account.address);
  }
  console.log("Deploying Main function and waiting for confirmations...")
  await hre.deployments.deploy('Main', { from: deployer, log: true })
  console.log(`Main deployed successfully`)
  console.log("----------------------------------------------------")

}

export default deployer
