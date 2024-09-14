import React,{useState,useEffect,useContext} from 'react'
import { Footer, NavBar } from '../componentsIndex'
import { NFTMarketplaceContext } from '@/context/NFTMarketplaceContext'

const Layout = ({ children }) => {
    const {checkIfWalletConnected} = useContext(NFTMarketplaceContext)
    useEffect(()=>{
        checkIfWalletConnected()
    },[])
  return (
    <>
        <NavBar />
            {children}
        <Footer/>
    </>    
  )
}

export default Layout
