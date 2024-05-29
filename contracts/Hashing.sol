pragma solidity ^0.8.0;

contract HashContract {
    bytes32 private messageHash;

    function hash(string memory _message) public {
        messageHash = keccak256(bytes(_message));
    }

    function getMessageHash() public view returns (bytes32) {
        return messageHash;
    }

    function bytes_give(string memory _message) public view returns (bytes memory){
        return bytes(_message);
    }
}

