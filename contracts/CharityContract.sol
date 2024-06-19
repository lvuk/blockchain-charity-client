// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CharityContract is ERC721URIStorage, Ownable {
    uint256 private _tokenCounter;

    event TransactionExecuted(uint256 indexed tokenId, uint256 amount, address indexed receiver, string description, string imageBase64);

    constructor(address initialOwner) ERC721("BiteBackToken", "BTB") Ownable(initialOwner) {
        transferOwnership(initialOwner);
        _tokenCounter = 0;
    }

    function executeTransaction(address receiver, string memory description, string memory imageBase64) public payable onlyOwner {
        require(receiver != address(0), "Receiver address cannot be zero address");
        require(receiver != owner(), "Cannot send Ether to the contract owner");
        require(msg.value > 0, "Amount must be greater than zero");

        payable(receiver).transfer(msg.value);

        uint256 tokenId = _tokenCounter;
        _safeMint(msg.sender, tokenId);

        _setTokenURI(tokenId, imageBase64);

        emit TransactionExecuted(tokenId, msg.value, receiver, description, imageBase64);

        _tokenCounter++;
    }

    receive() external payable {}

    fallback() external payable {}
}