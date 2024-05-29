import { ethers } from "hardhat";

async function main() {
  let provider = await ethers.provider.getNetwork();
  const chainId = Number(provider.chainId);
  console.log("Network chain id= ", chainId);

  const basicSignature = await ethers.deployContract(
    "BasicSignature",
    ["BasicSignatureEnvironment", "1.0"],
    {}
  );

  await basicSignature.waitForDeployment();

  console.log(`deployed to ${basicSignature.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
