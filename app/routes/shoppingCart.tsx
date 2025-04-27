import { useState } from "react";

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
function ArrowComponent(props: any) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <path d="M19 12H5m7 7l-7-7 7-7" />
    </svg>
  );
}
function XComponent(props: any) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function Header() {
  return (
    <>
      <h1 className="mt-20 mb-5 pt-10 text-5xl font-bold text-center">
        עגלת הקניות שלי
      </h1>
      <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--gradient-orange-start)] w-50 h-1 block mx-auto"></span>
    </>
  );
}
function HomeNavaigate() {
  return (
    <>
      {" "}
      <div
        className="flex flex-row items-center gap-1.5 text-[var(--color-primary)] font-semibold text-xl my-10
  hover:text-[var(--color-dark)] hover:cursor-pointer duration-300">
        <ArrowComponent /> המשך לקנות
      </div>
    </>
  );
}
function Products() {
  const products = [
    {
      image:
        "https://d3m9l0v76dty0.cloudfront.net/system/photos/12879994/large/81c1a950953bcc83d981a81e78fd3240.png",

      details: "תיאור קצר",
      price: "₪100",
      quantity: 2,
      total: "₪200",
    },
    {
      image: "מוצר ב'",
      details: "משהו מגניב",
      price: "₪75",
      quantity: 1,
      total: "₪75",
    },
    {
      image: "מוצר ג'",
      details: "עוד מוצר",
      price: "₪50",
      quantity: 3,
      total: "₪150",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-[1fr_2fr_0.5fr_1fr_0.5fr_0.5fr] gap-5 text-[var(--color-gray-600)] font-semibold text-lg">
        <span className="mt-5">מוצר</span>
        <span className="mt-5">פרטים</span>
        <span className="mt-5">מחיר</span>
        <span className="mt-5">כמות</span>
        <span className="mt-5">סך הכל</span>
      </div>
      <span className="w-full h-[1px]  block bg-[var(--color-gray-200)] mx-auto my-5"></span>

      {products.map((product, index) => {
        return (
          <>
            <div className="grid grid-cols-[1fr_2fr_0.5fr_1fr_0.5fr_0.5fr] gap-5 text-[var(--color-dark)] font-bold text-lg">
              <img
                src={product.image}
                alt={product.details}
                className="bg-gray-100 mt min-w-20 min-h-20 max-w-20 max-h-20 m-0 shadow-[var(--shadow-card)] rounded-md object-cover "
              />
              <div className="mt-5">{product.details}</div>
              <div className="mt-5 text-[var(--color-primary)]">
                {product.price}
              </div>

              <div className=" mt-5 flex items-stretch gap-1 rounded-full border border-[var(--color-gray-300)] h-10 w-fit overflow-hidden">
                <button className="cursor-pointer w-10 h-full flex items-center justify-center bg-transparent hover:bg-[var(--color-gray-300)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  -
                </button>
                <div className="min-w-12 text-center flex items-center justify-center px-2">
                  {product.quantity}
                </div>
                <button className="cursor-pointer w-10 h-full flex items-center justify-center bg-transparent hover:bg-[var(--color-gray-300)] transition-colors ">
                  +
                </button>
              </div>

              <div className="mt-5 text-color[var(--color-dark-light)]">
                {product.total}
              </div>
              <div className="mt-5">
                <XComponent
                  className="font-bold hover:bg-red hover:cursor-pointer hover:text-red-700
                       duration-300 hover:rotate-90"
                />
              </div>
            </div>
            <span className="w-full h-[1px]  block bg-[var(--color-gray-200)] mx-auto my-5"></span>
          </>
        );
      })}
    </>
  );
}

function CheckoutHeader() {
  return (
    <>
      <h1 className="text-[var(--color-dark)] font-semibold text-3xl ">
        {" "}
        סיכום הזמנה
      </h1>
      <span className="w-full h-[1px]  block bg-[var(--color-gray-200)] mx-auto my-5"></span>
    </>
  );
}

function Summary() {
  const sum = 6;
  const totalPrice = 425;
  return (
    <div className="flex flex-row justify-between items-center text-[var(--color-gray-600)] font-semibold text-lg mt-5">
      <span>סה"כ מוצרים ({sum}) </span>
      <span className="text-[var(--color-dark)]">{totalPrice} ₪</span>
    </div>
  );
}

function Shipping() {
  const shippingPrice = 0;
  return (
    <div className="flex flex-row justify-between items-center text-[var(--color-gray-600)] font-semibold text-lg mt-5">
      <span>משלוח</span>
      <span className="text-[var(--color-dark)]">
        {shippingPrice <= 0 ? " חינם" : `${shippingPrice}₪`}
      </span>
    </div>
  );
}
function Takses() {
  const taxes = 18;
  const totalPrice = 425;
  const shippingPrice = 0;
  const totalTakes = ((totalPrice + shippingPrice) / 100) * taxes;
  return (
    <div className="flex flex-row justify-between items-center text-[var(--color-gray-600)] font-semibold text-lg mt-5">
      <span>מע"מ {taxes}% (כלול)</span>
      <span className="text-[var(--color-dark)]">₪{totalTakes}</span>
    </div>
  );
}

function Total() {
  const [allowed, setAllowed] = useState<boolean>(false);
  const totalPrice = 425;
  const shippingPrice = 0;
  return (
    <>
      <span className="w-full h-[1px]  block bg-[var(--color-gray-200)] mx-auto my-5"></span>
      <div className="flex flex-row justify-between items-center text-[var(--color-gray-600)] font-semibold text-lg mt-5">
        <span className="font-bold text-2xl">סה"כ לתשלום</span>
        <span className="text-[var(--color-dark)] font-bold text-2xl">
          ₪{totalPrice + shippingPrice}
        </span>
      </div>
      <label
        htmlFor="input-discount"
        className="font-bold text-xl text-[var(--color-gray-600)] mt-10">
        קופון הנחה{" "}
      </label>
      <div className="flex flex-row justify-between items-center text-[var(--color-gray-600)] font-semibold text-lg mt-5 gap-10">
        <input
          type="text"
          placeholder="הזן קוד קופון"
          id="input-discount"
          className="w-2/3 h-15 p-5 border-[1px] border-[var(--color-gray-200)]   text-[var(--color-dark)] font-semibold
            focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]
            focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
          onChange={(e) => {
            if (e.target.value.length > 0) setAllowed(true);
            else setAllowed(false);
          }}
        />
        <button
          className="w-1/3 h-15  border-[1px] bg-[var(--color-primary)]   text-white font-semibold
            hover:bg-[var(--color-primary-dark)] hover:cursor-pointer duration-300
             disabled:opacity-50 disabled:cursor-not-allowed rounded-full "
          disabled={!allowed}>
          החל
        </button>
      </div>
    </>
  );
}
function Payment() {
  return (
    <>
      <button
        className="w-full h-15 p-7 mt-10 bg-[var(--color-primary)] text-white rounded-full
        flex flex-row items-center justify-center gap-5 font-bold text-2xl
        hover:bg-[var(--color-primary-dark)] hover:cursor-pointer duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        "
        onClick={() => {
          alert("הועבר לעמוד תשלום");
        }}>
        <span>לתשלום</span>
        <WalletComponent />
      </button>
    </>
  );
}

function WalletComponent(props: any) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <rect x={1} y={4} width={22} height={16} rx={2} ry={2} />
      <path d="M1 10L23 10" />
    </svg>
  );
}
