// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CharityContract is ERC721, Ownable {
    uint256 public tokenCounter;

    event TransactionExecuted(uint256 indexed tokenId, uint256 amount, address indexed receiver, string description, string imageBase64);

    constructor(address initialOwner) ERC721("BiteBackToken", "BTB") Ownable(initialOwner){
        tokenCounter = 0;
    }

    function executeTransaction(address receiver, string memory description, string memory imageBase64) public payable onlyOwner {
        require(receiver != address(0), "Receiver address cannot be zero address");
        require(receiver != owner(), "Cannot send Ether to the contract owner");
        require(msg.value > 0, "Amount must be greater than zero");

        payable(receiver).transfer(msg.value);

        uint256 tokenId = tokenCounter;
        _safeMint(msg.sender, tokenId);

        emit TransactionExecuted(tokenId, msg.value, receiver, description, imageBase64);

        tokenCounter++;
    }


    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
