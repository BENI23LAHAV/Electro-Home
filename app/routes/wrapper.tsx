import { Outlet, ScrollRestoration } from "react-router";
import { Navbar } from "./navbar";
import Footer from "./footer";
import type { Route } from "../+types/root";
import type { Response } from "../lib/definitions";

export async function loader() {
  const { default: CartService } = await import("~/lib/services/cartService");

  return CartService.cartCapacity();
}
export default function Wrapper({ loaderData }: Route.ComponentProps) {
  const response = loaderData as Response | undefined;
  const cartCapacity = response?.success ? response.data : 0;
  return (
    <>
      <Navbar cartCapacity={cartCapacity} />
      <ScrollRestoration />

      <Outlet />
      <Footer />
    </>
  );
}
