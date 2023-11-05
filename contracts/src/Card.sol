// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./ERC721.sol";
import "./Ownable.sol";
import "./Main.sol";

contract NFTCard is Ownable {

    // variables
    string public cardName;
    uint256 public cardId;
    string public tokenURI;

    // constructor
    constructor(string memory _cardName, uint256 _cardId, string memory _tokenURI) {
        cardName = _cardName;
        cardId = _cardId;
        tokenURI = _tokenURI;       
    }

    // returns the last tokenId
    function getTokenCounter() public view returns(uint256) {
        return cardId;
    }

}
