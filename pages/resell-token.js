import React,{useContext,useState,useEffect} from 'react'
import Style from '../styles/resell-token.module.css';
import FormStyle from '../accountPage/Form/Form.module.css';
import { Button } from '@/components/componentsIndex';
import Image from 'next/image';
import { NFTMarketplaceContext } from '@/context/NFTMarketplaceContext';
import { useRouter } from 'next/router';
import axios from 'axios';
const resellToken = () => {
    const router = useRouter();
    const {createSale} = useContext(NFTMarketplaceContext);
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");

    const {id,tokenURI} = router.query;

    const fetchNFT = async()=>{
        if(!tokenURI) return;
        const {data} = await axios.get(tokenURI);
        setImage(data.image);
    }


    useEffect(() => {
      fetchNFT();
    }, [id])
    

    const resell = async()=>{
        try{
            await createSale(tokenURI,price,true,id);
            router.push('/author')
        }catch (error) {
            console.log("Error while resell",error)
        }

    }



  return (
    <div className={Style.reSellToken}>
        <div className={Style.reSellToken_box}>
            <h1>Resell Your Token, Set Price</h1>
            <div className={FormStyle.Form_box_input}>
                <label htmlFor="name">Price</label>
                <input
                type="number"
                min={1}
                placeholder="Enter price"
                className={FormStyle.Form_box_input_userName}
                onChange={(e)=>setPrice(e.target.value)}
                value={price}
                />
            </div>
            <div className={Style.reSellToken_box_img}>
                {image && <Image src={image} alt='NFT image' width={400} height={400}/>}    
            </div>
            <div className={Style.reSellToken_box_btn}>
                <Button btnText={"Resell NFT"} handleClick={()=>resell()} />    
            </div>
        </div>
    </div>
  )
}

export default resellToken