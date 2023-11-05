// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./Ownable.sol";
import "./Card.sol";

contract Collection is Ownable {

    string public name;
    int public cardCount;

    constructor(string memory _name, int _cardCount) {
        name = _name;
        cardCount = _cardCount;
    }
    
    // owner of the collection generates cards
    function mintNft(string memory _cardName, uint256 _cardId, string memory _tokenURI) external onlyOwner returns (NFTCard){      
        NFTCard newNftCard = new NFTCard(_cardName, _cardId, _tokenURI);
        return newNftCard; 
    }

}
