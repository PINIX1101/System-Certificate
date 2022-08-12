const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DigitalCertificate", function () {
  it("Should create a certificate by minting an NFT", async function () {
    const DigitalCertificate = await ethers.getContractFactory("DigitalCertificate");

    [owner, addr1, ...addrs] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", owner.address);

    console.log("Account balance:", (await owner.getBalance()).toString());

    const digitalCertificate = await DigitalCertificate.deploy();

    await digitalCertificate.deployed();

    let name = 'Salman';
    let image = 'https://static.vecteezy.com/system/resources/previews/002/349/754/original/modern-elegant-certificate-template-free-vector.jpg';
    let number = 'A7599272';
    let date = '1983-05-15';
    let organization = 'Teaching Factory Network';
    console.log("Creating Certificate for:", addr1.address);
    console.log("Name:           ", name);
    console.log("Certificate Number:", number);
    console.log("Date:      ", date);
    console.log("Organization:", organization);
    const createCertificateTx = await digitalCertificate.createCertificate(addr1.address, name, image, number, date, organization);
    await createCertificateTx.wait();
  });
});