import "app/app.css";
import { NavLink } from "react-router";
import { Logo, Soon, UnderLine, CartComponent } from "../lib/DesignComponents";
export function Navbar({ cartCapacity }: { cartCapacity: number }) {
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
        <Logo />

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
          {cartCapacity > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[var(--color-primary)] text-white text-xs flex items-center justify-center z-40">
              {cartCapacity}
            </div>
          )}
        </NavLink>
      </div>{" "}
    </>
  );
}
