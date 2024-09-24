import React, { useState, useEffect, useContext } from "react";

import Style from "../styles/author.module.css";
import { Banner, NFTCardTwo } from "../collectionPage/collectionIndex";
import { Brand, Title } from "../components/componentsIndex";
import FollowerTabCard from "../components/FollowerTab/FollowerTabCard/FollowerTabCard";
import images from "../img";
import {
  AuthorProfileCard,
  AuthorTaps,
  AuthorNFTCardBox,
} from "../authorPage/componentIndex";

import { NFTMarketplaceContext } from "@/context/NFTMarketplaceContext";

const author = () => {
  const followerArray = [
    {
      background: images.creatorbackground1,
      user: images.user1,
            seller:"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
            seller:"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    },
    {
      background: images.creatorbackground3,
      user: images.user3,
            seller:"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
            seller:"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
            seller:"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
            seller:"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    },
  ];

  const [collectiables, setCollectiables] = useState(true);
  const [created, setCreated] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);

const {fetchMyNFTsOrListedNFTs,currentAccount} = useContext(NFTMarketplaceContext);
const [nfts, setNfts] = useState([])
const [myNfts, setMyNfts] = useState([])

useEffect(() => {
  fetchMyNFTsOrListedNFTs("myNFTs").then((items)=>{
    setMyNfts(items);
  }).catch((error)=>{
    console.log(error)
  });

}, []);

useEffect(() => {
    fetchMyNFTsOrListedNFTs("listedNFTs").then((items)=>{
        setNfts(items);
    }).catch((error)=>{
        console.log(error)
    });
}, []);


  return (
    <div className={Style.author}>
      <Banner bannerImage={images.creatorbackground2} />
      <AuthorProfileCard currentAccount={currentAccount}/>
      <AuthorTaps
        setCollectiables={setCollectiables}
        setCreated={setCreated}
        setLike={setLike}
        setFollower={setFollower}
        setFollowing={setFollowing}
      />

      <AuthorNFTCardBox
        collectiables={collectiables}
        created={created}
        like={like}
        follower={follower}
        following={following}
        nfts={nfts}
        myNfts={myNfts}
      />
      <Title
        heading="Popular Creators"
        paragraph="Click on music icon and enjoy NTF music or audio
"
      />
      <div className={Style.author_box}>
        {followerArray.map((el, i) => (
          <FollowerTabCard key={"followerArray____" +i} i={i} el={el} />
        ))}
      </div>

      <Brand />
    </div>
  );
};

export default author;
