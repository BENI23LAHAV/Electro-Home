import React from "react";
import "app/app.css";
import { Link, NavLink } from "react-router";
// import CartService from "~/lib/services/cartService";
import type { Route } from "../+types/root";

export async function loader() {
  const { default: CartService } = await import("~/lib/services/cartService");

  const cartCapacity = (await CartService.cartCapacity()).data;
  return cartCapacity;
}

export default function Navbar({ loaderData }: Route.ComponentProps) {
  const cartCapacity = Number(loaderData) || 0;
  const navItems = [
    { label: "דף הבית", path: "/", soon: false },
    { label: "מוצרים", path: "/#our-products", soon: false },
    { label: "מבצעים", soon: true },
    { label: "חדשנות", soon: true },
    { label: "תמיכה", soon: true },
  ];
  return (
    <>
      <div className="h-20 w-full fixed top-0 flex flex-row justify-between my-0 mx-auto items-center shadow-[var(--shadow-dropdown)] bg-white z-30">
        <Logo className="m-0 p-0 " />

        <ul className="flex flex-row w-[33%] justify-between ml-[31%] mx-auto">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="relative group w-fit cursor-pointer text-center
                 hover:text-[var(--color-dark-light)]
                 text-[var(--color-dark)] font-bold">
              {item.soon ? (
                <>
                  <span className="relative z-10">{item.label}</span>
                  <Soon />
                </>
              ) : (
                <NavLink to={item.path as string} className="relative z-10" end>
                  {item.label}
                </NavLink>
              )}
              <UnderLine />
            </li>
          ))}
        </ul>

        <NavLink
          to={"/cart"}
          className="relative ml-[2%]  bg-[var(--color-gray-100)] rounded-full hover:bg-[var(--color-gray-300)] duration-300 transition-[var(--transition-quick)]">
          <CartComponent className="m-2" />
          <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[var(--color-primary)] text-white text-xs flex items-center justify-center z-40">
            {cartCapacity}
          </div>
        </NavLink>
      </div>{" "}
    </>
  );
}

export function Logo({
  showIcon = true,
  width = "auto",
  height = "auto",
}: LogoProps) {
  return (
    <Link to={"/"}>
      <div
        className="flex items-center gap-2 text-3xl font-extrabold bg-gradient-to-r from-[#2b9cd8] to-[#5cd1a4] text-transparent bg-clip-text mr-10 hover:cursor-pointer z-100"
        style={{ width, height }}>
        {showIcon && (
          <svg
            className="w-8 h-8 text-[#2b9cd8]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" />
            <path d="M12 5V19" stroke="currentColor" strokeWidth="2" />
          </svg>
        )}
        אלקטרו home
      </div>
    </Link>
  );
}
export function Soon(props: any) {
  return (
    <span
      className="text-[0.7rem] px-[0.4rem] py-[0.1rem]
        bg-[var(--color-gray-200)] text-[var(--color-gray-600)]
        rounded-[10px] font-normal relative
        before:absolute before:-top-3 before:right-0
        before:text-[9px] before:text-[rgba(100,100,100,0.6)]
        before:font-mono">
      בקרוב
    </span>
  );
}

function UnderLine(props: any) {
  return (
    <span
      className="absolute bottom-0 left-0 h-[3px] w-0
        bg-[var(--color-primary)]
        transition-all transition-defult
        group-hover:w-full mt-1     
        bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-tertiary)]

        "></span>
  );
}

function CartComponent(props: any) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M9 22a1 1 0 100-2 1 1 0 000 2zM20 22a1 1 0 100-2 1 1 0 000 2zM1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
