import React from 'react'
import Style from "./Discover.module.css"
import Link from 'next/link'

const Discover = () => {
    const discover = [
        {
            name:"Collection",
            link:"collection",
        },
        {
            name:"Search",
            link:"search",
        },
        {
            name:"Author Profile",
            link:"author",
        },
        {
            name:"NFT Details",
            link:"NFT-details",
        },
        {
            name:"Account Setting",
            link:"account",
        },
        {
            name:"Upload NFT",
            link:"uploadNFT",
        },
        {
            name:"Connect Wallet",
            link:"connect-wallet",
        },
        {
            name:"Blog",
            link:"blog",
        },
    ]
    
    return (
        <div className={Style.box}>
            { discover.map((el,i)=>(
                <div key={'discover_'+i + 1} className={Style.discover}>
                    <Link href={{pathname:`${el.link}`}}>{el.name}</Link>
                </div>
            ))}
        </div>
    )
}

export default Discover