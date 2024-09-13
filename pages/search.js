import React from "react";

import Style from "../styles/search.module.css";
import { Slider, Brand,Filter } from "../components/componentsIndex";
import { SearchBar } from "../searchPage/searchBarIndex";

import { NFTCardTwo, Banner } from "../collectionPage/collectionIndex";
import images from "../img";

const searchPage = () => {
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
      <NFTCardTwo NFTData={collectionArray} />
      <Slider />
      <Brand />
    </div>
  );
};

export default searchPage;
