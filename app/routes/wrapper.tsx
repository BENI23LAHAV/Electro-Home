import { Outlet, ScrollRestoration } from "react-router";
import Navbar from "./navbar";
import Footer from "./footer";
export default function Wrapper() {
  return (
    <>
      <Navbar />
      <ScrollRestoration />

      <Outlet />
      <Footer />
    </>
  );
}
