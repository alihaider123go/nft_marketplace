import React from "react";
import { TiTick } from "react-icons/ti";

import Style from "../subscriptionPage/Subscription.module.css";
import { Button } from "../components/componentsIndex.js";

const Subscription = ({ el, i }) => {
  return (
    <div className={Style.SubscriptionBox}>
      <div className={Style.SubscriptionBox_box}>
        <span className={Style.SubscriptionBox_box_span}>{el.plan}</span>
        {el.popular != ""?
            <small className={Style.SubscriptionBox_box_small}>
            {el.popular || ""}
            </small>
        :null}
        <p className={Style.SubscriptionBox_box_price}>{el.price}</p>

        <div className={Style.SubscriptionBox_box_info}>
          {el.service.map((el, i) => (
            <p className={Style.SubscriptionBox_box_info_para} key={'el.service__'+i + 1}>
              <span>
                <TiTick />
              </span>
              {el}
            </p>
          ))}
        </div>
        <Button
          btnText="Submit"
          handleClick={() => {}}
          classStyle={Style.button}
        />
      </div>
    </div>
  );
};

export default Subscription;
