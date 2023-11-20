
import { PropsWithChildren } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";


function Layout({children}: PropsWithChildren) {
  return (
    <>
        <NavBar/>
        {children}
        <Footer/>
    </>
  )
}

export default Layout