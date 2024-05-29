// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";

contract BasicSignature is EIP712{

    using SignatureChecker for bytes32;
    bytes32 public spyHash;

    constructor(string memory _name, string memory _version) EIP712(_name,_version) {
        spyHash=keccak256("ContractToSpy(address contract,uint256 pressure)");
    }

    function changeSpyHash(string memory _newSpyHash) external {
        spyHash = keccak256(bytes(_newSpyHash));
    }

    function isValidSignatureNowExternalWithTypedDataHash(address _signer,bytes32 hash, bytes memory _signature) external view returns (bool){
        return SignatureChecker.isValidSignatureNow(_signer,hash,_signature);
    } 

    function validateSignatureWithStructHash(address _signer,bytes32 _structHash, bytes memory _signature) external view returns (bool){
        return SignatureChecker.isValidSignatureNow(_signer,_hashTypedDataV4(_structHash),_signature);
    } 

    function validateSignatureWithPlainData(address _signer,address _contractAddress, uint256 _pressure, bytes memory _signature) external view returns (bool){
        bytes32 structHash = getHash(_contractAddress,_pressure);
        return SignatureChecker.isValidSignatureNow(_signer,_hashTypedDataV4(structHash),_signature);
    } 

    function chainId() external view returns (uint256){
            return block.chainid;
    } 

    function blockTimestamp() external view returns (uint256){
        return block.timestamp;
    } 

    function getHash(address _contractAddress, uint256 _pressure) public view returns (bytes32) {
 
        return keccak256(abi.encode(
                spyHash,
                _contractAddress,
                _pressure
            ));
    }


}