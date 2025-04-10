import { Outlet } from "react-router";
import Navbar from "./navbar";
import Footer from "./footer";
export default function Wrapper() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
