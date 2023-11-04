// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./Ownable.sol";
import "./Collection.sol";
import "./Card.sol";

contract Main is Ownable, NFTCardContract{

    // variables
    uint private collectionCount;
    string public constant TOKEN_URI = "dog.json";

    constructor() {
        collectionCount = 0; 
    }

     // arrays
    Collection[] public collections;

    // mappings
    mapping(uint => Collection) public collectionContracts;         // maps the id of the collection to their address (id:5 => 0x346567567...)

    // generates collections with number of cards desired
    // this function has the onlyOwner modifier in order to be called only by the owner of the contract
    function createCollection(string calldata _name, int _cardCount) external onlyOwner returns(Collection){
        int i = 0;
        Collection cardCollection = new Collection(_name, _cardCount);
        collections.push(cardCollection);
        collectionContracts[collectionCount] = cardCollection;
        collectionCount++;
        for(i = 0; i < _cardCount; i++) {
            mintNft(_name);
        }
        return cardCollection;
    }

    // super-admin generates cards
    function mintNft(string memory _cardName) internal onlyOwner{
        uint randId = _generateRandomId(_cardName);         // creates a random id with the cardName        
        randId = randId - randId % 100;
        _safeMintNft(_cardName, randId, TOKEN_URI);         
    }

    // super-admin assigns cards to users
    function assignCardToUser(uint256 _tokenId, address _to) external onlyOwner {
        require(cardToOwner[_tokenId] == msg.sender);
        _transfer(msg.sender, _to, _tokenId);
    } 

    // returns the cards a user possesses
    function getCardsByOwner(address _owner) public view returns(uint[] memory) {
        uint[] memory result = new uint[](ownerCardCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < cards.length; i++) {
            if (cardToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    // returns all the collections
    function getAllCollections() public view returns(string[] memory) {
        string[] memory collectionName = new string[](collections.length);
        for (uint i = 0; i < collections.length; i++) {
            Collection cardCollection = collections[i];
            collectionName[i] = cardCollection.name();
        }
        return (collectionName);
    }

}
