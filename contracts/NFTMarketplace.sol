// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract NFTMarketplace is ERC721URIStorage{
    
    uint256 private _tokenIds;
    uint256 private _itemsSold;
    address payable owner;
    uint256 listingPrice = 0.025 ether;

    mapping (uint256 => MarketItem) private idToMarketItem;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    // event MarketItemCreated(uint256 tokenId, address seller, address owner, uint256 price, bool sold);
    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );



    modifier onlyOwner{
        require(msg.sender == owner, "Only owner of the marketplace can perform this action");
        _;
    }

    constructor() ERC721("TecXra NFT Token", "TXNT") {
        owner = payable(msg.sender);
    }

    function updateListingPrice(uint256 _listingPrice) public payable onlyOwner{
        listingPrice = _listingPrice;
    }


    function getListingPrice() public view returns (uint256){
        return listingPrice;
    }

    // Let create NFT Token function

    function createToken(string memory _tokenURI,uint256 _price) public payable returns (uint256) {
        _tokenIds++;
        uint256 newTokenId = _tokenIds;
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        createMarketItem(newTokenId,_price);
        return newTokenId;
    }

    // create MarketItem
    function createMarketItem(uint256 _tokenId, uint256 _price) private {
        require(_price > 0,"Price must be greater than 0");
        require(msg.value == listingPrice, "Price must be equal to listing price");
        idToMarketItem[_tokenId] = MarketItem(_tokenId,payable(msg.sender),payable(address(this)),_price,false);
        _transfer(msg.sender, address(this), _tokenId);
        emit MarketItemCreated(_tokenId, msg.sender, address(this), _price, false);
    }

    // function for resale token

    function reSellToken(uint256 _tokenId, uint256 _price) public payable{
        require(idToMarketItem[_tokenId].owner == msg.sender,"Only item owner can perform this operation");
        require(msg.value == listingPrice, "Price must be equal to list price");
        
        idToMarketItem[_tokenId].sold = false;
        idToMarketItem[_tokenId].price = _price;
        idToMarketItem[_tokenId].seller = payable(msg.sender);
        idToMarketItem[_tokenId].owner = payable(address(this));
        _itemsSold--;
        _transfer(msg.sender, address(this), _tokenId);
    }


    // createMarketSale

    function createMarketSale(uint256 _tokenId) public payable{
        uint256 price = idToMarketItem[_tokenId].price;
        require(msg.value == price,"Please submit the asking price in order to complete the purchase");

        idToMarketItem[_tokenId].owner = payable(msg.sender);
        idToMarketItem[_tokenId].sold = true;
        idToMarketItem[_tokenId].seller = payable(address(0));
        _itemsSold++;
        _transfer(address(this), msg.sender, _tokenId);
        payable(owner).transfer(listingPrice);
        payable(idToMarketItem[_tokenId].seller).transfer(msg.value);
    }

    // Getting Unsold NFT data

    function fetchMarketItems() public view returns(MarketItem[] memory){
        uint256 itemCount = _tokenIds;
        uint256 unSoldItemCount = _tokenIds - _itemsSold;
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unSoldItemCount);

        for (uint256 i = 0; i < itemCount; i++) {
            if(idToMarketItem[i+1].owner == address(this)){
                uint256 currentId = i+1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // Purchased Items

    function fetchMyNFTs() public view returns(MarketItem[] memory){
        uint256 totalCount = _tokenIds;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;
        
        for (uint256 i = 0; i < totalCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);

        for (uint256 i = 0; i < totalCount; i++) {
            if(idToMarketItem[i+1].owner == msg.sender){
                uint256 currentId = i+1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // single user items

    function fetchListedItems()  public view returns(MarketItem[] memory){
        uint256 totalCount = _tokenIds;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;
        
        for (uint256 i = 0; i < totalCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalCount; i++) {
            if(idToMarketItem[i+1].seller == msg.sender){
                uint256 currentId = i+1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;

    }



}
