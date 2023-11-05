// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./Ownable.sol";
import "./Collection.sol";
import "./Card.sol";

contract Main is Ownable{

    // variables
    uint256 public mintedCardCount;
    uint256 public collectionCount;
    string public constant TOKEN_URI = "dog.json";

    constructor() {
        collectionCount = 0; 
        mintedCardCount = 0;
    }

    // nft card struct
    struct NFTCardStruct {
        string cardName;
        uint256 cardId;
        string  tokenURI;
    }

     // arrays
    Collection[] public collections;
    NFTCard[] public cards;

    // mappings
    mapping(uint => Collection) public collectionContracts;         // maps the id of the collection to their address (id:5 => 0x346567567...)

    // mappings store card ownerships
    mapping(uint => address) public cardToOwner;            // _owners              // look up the card owner based on its id (id:5 ==> ownerAddress:0x34573495...)
    mapping (address => uint) public ownerCardCount;        // _balances            // look up how many cards an owner has (adderss:0x34556456... ==> count:3)
    mapping (uint => address) public cardApprovals;         // _tokenApprovals      // look up which address is approved for transfer for an id (id:3 ==> address:0x2343247...)

    // generates collections with number of cards desired
    // this function has the onlyOwner modifier in order to be called only by the owner of the contract
    function createCollection(string calldata _name, int _cardCount) public onlyOwner returns(Collection){
        int i = 0;
        Collection cardCollection = new Collection(_name, _cardCount);
        collections.push(cardCollection);
        collectionContracts[collectionCount] = cardCollection;
        collectionCount++;
        for(i = 0; i < _cardCount; i++) {
            NFTCard newCard = cardCollection.mintNft(_name, mintedCardCount, TOKEN_URI);
            cards.push(newCard);
            cardToOwner[mintedCardCount] = msg.sender;          // adds the card creator to the array
            ownerCardCount[msg.sender]++;                       // increases the number of cards that the card creator has
            mintedCardCount++;
        }
        return cardCollection;
    }

    // super-admin assigns cards to users
    function assignCardToUser(uint256 _tokenId, address _to) external onlyOwner {
        require(cardToOwner[_tokenId] == msg.sender);
        ownerCardCount[_to]++;
        ownerCardCount[msg.sender]--;
        cardToOwner[_tokenId] = _to;
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

    // return the number of cards `_owner` has here
    function balanceOf(address _owner) external view returns (uint256) {
      return ownerCardCount[_owner];
    }

    // returns the owner of `_tokenId` here
    function ownerOf(uint256 _tokenId) external view returns (address) {
      return cardToOwner[_tokenId];
    }

    function _transfer(address _from, address _to, uint256 _tokenId) internal {
      ownerCardCount[_to]++;
      ownerCardCount[_from]--;
      cardToOwner[_tokenId] = _to;
      //emit Transfer(_from, _to, _tokenId);
    }

    // only the owner of the token or the super-admin can transfer a token
    function transferFrom(address _from, address _to, uint256 _tokenId) external payable {
      require (cardToOwner[_tokenId] == msg.sender || cardApprovals[_tokenId] == msg.sender || isOwner());
      _transfer(_from, _to, _tokenId);
    }

    // only the owner of the token or the super-admin can give approval
    function approve(address _approved, uint256 _tokenId) external payable {
      require (cardToOwner[_tokenId] == msg.sender || isOwner());
      cardApprovals[_tokenId] = _approved;
      //emit Approval(msg.sender, _approved, _tokenId);
    }

    // to check if the person calling this function is the owner of the NFT
    modifier onlyOwnerOfNft(uint _cardId) {
        require(msg.sender == cardToOwner[_cardId]);
        _;
    }

}
