// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./ERC721.sol";
import "./Ownable.sol";

error TransferFailed();

contract NFTCardContract is ERC721, Ownable{

    // variables
    uint256 mintedCardCount;
    uint256 immutable mintFee;
    uint private idModulus = 10 ** 5;

    // events
    event NftMinted(address minter);

    // constructor
    constructor() {
        mintedCardCount = 0;
        mintFee = 3;
    }

    struct NFTCard {
        string cardName;
        uint256 cardId;
        string  tokenURI;
    }

    // arrays
    NFTCard[] public cards;

    // mappings store card ownerships
    mapping(uint => address) public cardToOwner;            // _owners              // look up the card owner based on its id (id:5 ==> ownerAddress:0x34573495...)
    mapping (address => uint) public ownerCardCount;        // _balances            // look up how many cards an owner has (adderss:0x34556456... ==> count:3)
    mapping (uint => address) public cardApprovals;         // _tokenApprovals      // look up which address is approved for transfer for an id (id:3 ==> address:0x2343247...)

    // to check if the person calling this function is the owner of the NFT
    modifier onlyOwnerOfNft(uint _cardId) {
        require(msg.sender == cardToOwner[_cardId]);
        _;
    }

    // generates cards and keeps tracks of addresses, and cards
    function _safeMintNft(string memory _cardName, uint256 _cardId, string memory _tokenURI) internal {
        cards.push(NFTCard(_cardName, _cardId, _tokenURI));                      
        cardToOwner[mintedCardCount] = msg.sender;                     // adds the card creator to the array
        ownerCardCount[msg.sender]++;                                  // increases the number of cards that the card creator has
        mintedCardCount++;
        emit NftMinted(msg.sender);
    }

    // generates a random id from the card name
    function _generateRandomId(string memory _str) internal view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % idModulus;
    }

    // returns the last tokenId
    function getTokenCounter() public view returns(uint256) {
        return mintedCardCount;
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
      emit Transfer(_from, _to, _tokenId);
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
      emit Approval(msg.sender, _approved, _tokenId);
    }

}
