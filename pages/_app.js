import "@/styles/globals.css";
import { NavBar,Footer } from "@/components/componentsIndex";

export default function App({ Component, pageProps }) {
  return (
    <div>
        <NavBar/>
        <Component {...pageProps} />
        <Footer/>
    </div>
  )
}
