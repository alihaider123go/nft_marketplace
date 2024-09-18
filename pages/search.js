import React, {useEffect,useState,useContext} from 'react'

import Style from "../styles/search.module.css";
import { Slider, Brand,Filter } from "../components/componentsIndex";
import { SearchBar } from "../searchPage/searchBarIndex";

import { NFTCardTwo, Banner } from "../collectionPage/collectionIndex";
import images from "../img";
import { NFTMarketplaceContext } from "@/context/NFTMarketplaceContext";


const searchPage = () => {
const {fetchNFTs} = useContext(NFTMarketplaceContext);

    useEffect(() => {
        fetchNFTs().then((item)=>{
            setNfts(item.reverse());
            setNftsCopy(item);
        })
    },[])

    const [nfts, setNfts] = useState([])
    const [nftsCopy, setNftsCopy] = useState([])


  const collectionArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
  ];
  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar />
      <Filter />
      <NFTCardTwo NFTData={nfts} />
      <Slider />
      <Brand />
    </div>
  );
};

export default searchPage;
