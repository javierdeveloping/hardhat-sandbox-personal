import { ethers } from "hardhat";
import "dotenv/config";
// scripts/deploy.js

//INPUTs

// EXECUTION
async function main() {
  //get chainId
  let provider = await ethers.provider.getNetwork();
  const chainId = Number(provider.chainId);
  console.log("Network chain id= ", chainId);

  //get signer
  let signersRaw = await ethers.getSigners();
  let signer = signersRaw[0];
  let signerAddress = signer.address;
  console.log({ signerAddress });

  const msgParams = {
    domain: {
      chainId: chainId,
      name: "BasicSignatureEnvironment",
      verifyingContract: "0xa13BAF47339d63B743e7Da8741db5456DAc1E556",
      version: "1.0",
    },
    message: {
      contract: "0x22eEC85ba6a5cD97eAd4728eA1c69e1D9c6fa778",
      pressure: 10,
    },
    primaryType: "ContractToSpy",
    //comment the EIP712Domain, it is given indirectly
    types: {
      /* EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ], */
      ContractToSpy: [
        { name: "contract", type: "address" },
        { name: "pressure", type: "uint256" },
      ],
    },
  };

  console.log("Message: ", msgParams.message);

  console.log("\nEXTRA DATA\n");
  const spyHash = ethers.keccak256(
    ethers.toUtf8Bytes("ContractToSpy(address contract,uint256 pressure)")
  );

  console.log({ spyHash });

  //MY ABI CODER
  const myAbiCoder = new ethers.AbiCoder();

  const encodedData = ethers.keccak256(
    myAbiCoder.encode(
      ["bytes32", "address", "uint256"],
      [spyHash, msgParams.message.contract, msgParams.message.pressure]
    )
  );

  console.log({ encodedData });

  const hashedData = ethers.TypedDataEncoder.hash(
    msgParams.domain,
    msgParams.types,
    msgParams.message
  );
  console.log({ hashedData });

  let signature = await signer.signTypedData(
    msgParams.domain,
    msgParams.types,
    msgParams.message
  );

  //verify signature

  let expectedSignerAddress = signer.address;
  let recoveredAddress = ethers.verifyTypedData(
    msgParams.domain,
    msgParams.types,
    msgParams.message,
    signature
  );

  console.log({
    signerAddress,
    signature,
    isValidSignature: recoveredAddress === expectedSignerAddress,
  });

  if (process.env.TEST_PRIVATE_KEY) {
    let wallet = new ethers.Wallet(process.env.TEST_PRIVATE_KEY);
    let signerAddress = await wallet.getAddress();

    if (wallet) {
      console.log("\n Signature from private key \n");
      console.log(wallet);

      signature = await wallet.signTypedData(
        msgParams.domain,
        msgParams.types,
        msgParams.message
      );

      //verify signature

      expectedSignerAddress = wallet.address;
      recoveredAddress = ethers.verifyTypedData(
        msgParams.domain,
        msgParams.types,
        msgParams.message,
        signature
      );

      console.log({
        signerAddress,
        signature,
        isValidSignature: recoveredAddress === expectedSignerAddress,
      });
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
