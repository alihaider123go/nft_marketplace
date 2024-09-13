import React from "react";
import Image from "next/image";
import Style from "./Banner.module.css";

const Banner = ({ bannerImage }) => {
  return (
    <div className={Style.banner}>
      <div className={Style.banner_img_box}>
        <Image
            className={Style.banner_img}
            src={bannerImage}
            alt="background"
            width={1600}
            height={300}
        />
      </div>

      <div className={Style.banner_img_mobile_box}>
        <Image
            src={bannerImage}
            className={Style.banner_img_mobile}
            alt="background"
            width={1600}
            height={900}
        />
      </div>
    </div>
  );
};

export default Banner;
