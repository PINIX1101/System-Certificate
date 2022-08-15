const hre = require("hardhat");

async function main() {

  [owner] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", owner.address);

  console.log("Account balance:", (await owner.getBalance()).toString());

 

  const DigitalCertificate = await hre.ethers.getContractFactory("DigitalCertificate"); 

  const digitalCertificate = await DigitalCertificate.deploy();

  await digitalCertificate.deployed();

  console.log("DigitalCertificate deployed to:", digitalCertificate.address);

}

 

// We recommend this pattern to be able to use async/await everywhere

// and properly handle errors.

main()

  .then(() => process.exit(0))

  .catch((error) => {

    console.error(error);

    process.exit(1);

  });