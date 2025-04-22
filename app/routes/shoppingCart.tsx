import { useState } from "react";
import {
  Header,
  HomeNavaigate,
  Products,
  CheckoutHeader,
  Summary,
  Shipping,
  Takses,
  Total,
  Payment,
} from "./shoppingCartComponents";

export default function ShoppingCart() {
  return (
    <div className="min-w-full flex flex-col">
      <div>
        <Header />
      </div>
      <HomeNavaigate />
      <div className="flex flex-row my-10">
        <div className="w-2/3 shadow-[--shadow-card] bg-white mx-6  p-10 rounded-2xl">
          <Products />
        </div>

        <div className="w-1/3 shadow-[--shadow-card] bg-white mx-6  p-10 rounded-2xl flex flex-col">
          <CheckoutHeader />
          <Summary />
          <Shipping />
          <Takses />
          <Total />
          <Payment />
        </div>
      </div>
    </div>
  );
}
