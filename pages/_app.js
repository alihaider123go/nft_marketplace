import "@/styles/globals.css";
import { NavBar,Footer } from "@/components/componentsIndex";
import { NFTMarketplaceProvider } from "@/context/NFTMarketplaceContext";
export default function App({ Component, pageProps }) {
  return (
    <div>
        <NFTMarketplaceProvider>
            <NavBar/>
            <Component {...pageProps} />
            <Footer/>
        </NFTMarketplaceProvider>    
    </div>
  )
}
