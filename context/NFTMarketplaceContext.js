import React, {useEffect,useState,useContext, Children} from 'react'
import Web3Modal from 'web3modal';
import {ethers} from 'ethers';
import { useRouter } from "next/router";
import axios from 'axios';

import { NFTMarketplaceAddress,NFTMarketplaceABI } from './constants';

const fetchContract = (signerOrProvider)=> new ethers.Contract(NFTMarketplaceAddress,NFTMarketplaceABI,signerOrProvider);

const connectionWithSmartContract = async()=>{
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();
        const contract = fetchContract(signer);
        return contract;
    } catch (error) {
        console.log("Something went wrong while connecting with contract",error);
    }
}

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = (({children})=>{

    const router = useRouter();

    const [currentAccount, setCurrentAccount] = useState("")
    const checkIfWalletConnected = async ()=>{
        try {
            if (!window.ethereum) {
                console.log("Install Metamask");
                return;
            }
            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            if (accounts.length > 0) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No Account Found");
            }

        } catch (error) {
            console.log("Something went wrong while connecting wallet");
        }
    }   

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                return console.log("Install Metamask");
            }
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log("Error while connecting to wallet", error);
        }
    };

    const uploadToIPFS = async (file)=>{
        try {
            const added = await client.add({content:file});
            const url = `${subdomain}/ipfs/${added.path}`;
            return url;
        } catch (error) {
            console.log("Error while uploading file", error);
        }
    }


    const createTokenURI = (metadata) => {
        const jsonString = JSON.stringify(metadata);
        const base64EncodedData = btoa(jsonString);
        return `data:application/json;base64,${base64EncodedData}`;
    };



    const createNFT = async (name,price,image,description,router)=>{
        if(!name || !description || !price || !image) return console.log("Data is missing")
        try {
            const url = createTokenURI({name,description,image});
            await createSale(url,price);
            router.push('/search')
        } catch (error) {
            console.log("Error while creating NFT",error);
        }
    }


    const createSale = async(url,formInputPrice,isReselling,id)=>{
        try {
            const price = ethers.parseUnits(formInputPrice, 'ether');
            const contract = await connectionWithSmartContract();
            const listingPrice = await contract.getListingPrice();   
            const transaction = !isReselling 
                ? await contract.createToken(url,price,{value:listingPrice.toString()})
                : await contract.reSellToken(id,price,{value:listingPrice.toString()})
            
            await transaction.wait();
        } catch (error) {
            console.log("Error while creating sale", error);
        }
    }

    
    const fetchNFTs = async ()=>{
        try {
            const provider = new ethers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const data = await contract.fetchMarketItems();
            const items = await Promise.all(data.map(async({tokenId,seller,owner,price:unformattedPrice})=>{
                const tokenURI = await contract.tokenURI(tokenId);
                const {
                    data:{image,name,description},
                } = await axios.get(tokenURI)
                const price = ethers.formatUnits(unformattedPrice.toString(),'ether');
                return {
                    price,tokenId:tokenId.toString(),seller,owner,image,name,description,tokenURI
                }
            }))
            return items;
        } catch (error) {
            console.log("Error while fetching NFTs",error);
        }
    }

    const fetchMyNFTsOrListedNFTs  = async(type) => {
        try {
            const contract = await connectionWithSmartContract();
            const data = type == 'myNFTs' 
                ? await contract.fetchMyNFTs()
                : await contract.fetchListedItems();
            const items = await Promise.all(data.map(async({tokenId,seller,owner,price:unformattedPrice})=>{
                const tokenURI = await contract.tokenURI(tokenId);
                const {
                    data:{image,name,description},
                } = await axios.get(tokenURI)
                const price = ethers.formatUnits(unformattedPrice.toString(),'ether');
                return {
                    price,tokenId:tokenId.toString(),seller,owner,image,name,description,tokenURI
                }
            }))
            return items;
        } catch (error) {
            console.log("Error while fetching my NFTs", error)
        }
    }


    const buyNFT = async(nft)=>{
        try {
            const contract = await connectionWithSmartContract();
            const price  = ethers.parseUnits(nft.price.toString(),'ether');
            const transaction = await contract.createMarketSale(nft.tokenId, {value:price});
            await transaction.wait();
            router.push('/author')
            
        } catch (error) {
            console.log("Error while buying NFT")
        }
    }




    return (
        <NFTMarketplaceContext.Provider value={{currentAccount,checkIfWalletConnected,connectWallet,uploadToIPFS,createNFT,fetchNFTs,fetchMyNFTsOrListedNFTs,buyNFT,createSale}}>
            {children}
        </NFTMarketplaceContext.Provider>
    )
})