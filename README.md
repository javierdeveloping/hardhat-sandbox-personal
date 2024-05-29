---
HARDHAT SANDBOX
---

At the moment this repository contains a main contract called BasicSignature.sol (not upgradeable version), exposing different methods related to EIP-712 signature (Typed structured data hashing and signing) generation and verification.

There are two scripts (deployBasicSignature.ts and generateBasicSignature.ts) that can be used for deployment and signature generation using private keys.

Steps after installing all dependencies, npm is recommended by Hardhat webpage as they say it makes installing Hardhat plugin simpler.

1. Compile contracts

```
npm run compile
```

2. Create a new .env file with most of the required environment variables.

3. To deploy the contract to a specific network, execute the command with your network name (hardhat by default or sepolia, amoy, ganache_local are the configured ones in hardhat.config.ts)

```
npm run deployBasicSignature sepolia
```

3. To execute the signature generation scripts modify the values inside the script to fit your scenario and run the following command:

```
npm run generateBasicSignature sepolia
```

Tests have not been added but inside generateBasicSignature script signature verification is performed.
