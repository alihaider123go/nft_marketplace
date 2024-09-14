import React from 'react'
import "@/styles/globals.css";
import { Layout} from "@/components/componentsIndex";

import { NFTMarketplaceProvider} from "@/context/NFTMarketplaceContext";
export default function App({ Component, pageProps }) {
  return (
    <div>
        <NFTMarketplaceProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </NFTMarketplaceProvider>    
    </div>
  )
}
