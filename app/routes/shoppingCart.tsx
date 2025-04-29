import { useMemo, useState } from "react";
import type { CartContent, Product } from "~/lib/definitions";
import { Form, NavLink, useFetcher } from "react-router";
import {
  ArrowComponent,
  RemoveComponent,
  WalletComponent,
} from "~/lib/DesignComponents";
import type { Route } from "./+types/shoppingCart";

export async function loader() {
  const { default: CartService } = await import("~/lib/services/cartService");
  const { default: ProductService } = await import(
    "~/lib/services/productService"
  );
  const cartContent = (await CartService.getCart()).data as CartContent[];
  const products = await Promise.all(
    cartContent.map(async (item) => {
      const product = (await ProductService.getProductById(item.productId))
        .data as Product;
      return product;
    })
  );
  const res = { products: products as Product[], cartContent: cartContent };
  return res;
}

export async function action({ request }: Route.ActionArgs) {
  const { default: CartService } = await import("~/lib/services/cartService");
  const formData = await request.formData();

  const productId = Number(formData.get("productID"));
  const quantity = Number(formData.get("productQuantity"));
  const removeProduct = Number(formData.get("removeProduct"));
  const coupon = formData.get("coupon-discount");

  if (removeProduct) {
    await CartService.removeProduct(removeProduct);
  } else if (productId && quantity >= 1) {
    await CartService.changeQuantity(productId, quantity);
  }

  if (coupon === "Netanel Elbaz") {
    return { discountPercent: 20 };
  }
  return null;
}

export default function ShoppingCart({ loaderData }: Route.ComponentProps) {
  const products = loaderData.products as Product[] | undefined;
  const cartContent = loaderData?.cartContent as CartContent[] | undefined;
  const fetcher = useFetcher();
  const discountPercent = fetcher.data?.discountPercent ?? 0;

  const cartContentMap = useMemo(() => {
    const map = new Map<number, number>();
    cartContent?.forEach((item) => {
      map.set(item.productId, item.quantity);
    });
    return map;
  }, [cartContent]);

  const productsNum = useMemo(() => cartContent?.length || 0, [cartContent]);

  const totalPrice = useMemo(() => {
    const productsTotal =
      products?.reduce((sum, item) => {
        const quantity = cartContentMap.get(item.id) ?? 1;
        return sum + item.price * quantity;
      }, 0) ?? 0;

    return productsTotal * (1 - discountPercent / 100);
  }, [products, cartContentMap, discountPercent]);

  const totalDiscount = useMemo(() => {
    const productsDiscount =
      products?.reduce((sum, item) => {
        const quantity = cartContentMap.get(item.id) ?? 1;
        return sum + item.discount * quantity;
      }, 0) ?? 0;

    const discountByCoupon =
      products?.reduce((sum, item) => {
        const quantity = cartContentMap.get(item.id) ?? 1;
        return sum + item.price * quantity;
      }, 0) ?? 0;

    return productsDiscount + discountByCoupon * (discountPercent / 100);
  }, [products, cartContentMap, discountPercent]);

  return (
    <div className="min-w-full flex flex-col">
      <Header />
      <HomeNavaigate />
      <div className="flex flex-row my-10">
        <div className="w-2/3 shadow-[--shadow-card] bg-white mx-6 p-10 rounded-2xl">
          <Products products={products} cartContentMap={cartContentMap} />
        </div>
        <div className="w-1/3 shadow-[--shadow-card] bg-white mx-6 p-10 rounded-2xl flex flex-col">
          <CheckoutHeader />
          <Summary productsNum={productsNum} totalPrice={totalPrice} />
          <Shipping />
          <Takses totalPrice={totalPrice} />
          <Total
            totalPrice={totalPrice}
            totalDiscount={totalDiscount}
            fetcher={fetcher}
          />
          <Payment />
        </div>
      </div>
    </div>
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
      <NavLink
        to={"/#our-products"}
        className="flex flex-row items-center gap-1.5 text-[var(--color-primary)] font-semibold text-xl my-10
  hover:text-[var(--color-dark)] hover:cursor-pointer duration-300">
        <ArrowComponent /> המשך לקנות
      </NavLink>
    </>
  );
}
function Products({
  products,
  cartContentMap,
}: {
  products: Product[] | undefined;
  cartContentMap: Map<number, number>;
}) {
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

      {products &&
        products.map((product, index) => {
          return (
            <div className="">
              <div className="grid grid-cols-[1fr_2fr_0.5fr_1fr_0.5fr_0.5fr] gap-5 text-[var(--color-dark)] font-bold text-lg">
                <NavLink to={`/product/${product.id}`}>
                  {" "}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="bg-gray-100 mt min-w-20 min-h-20 max-w-20 max-h-20 m-0 shadow-[var(--shadow-card)] rounded-md object-cover hover:scale-110 duration-300"
                  />
                </NavLink>
                <NavLink
                  to={`/product/${product.id}`}
                  className="mt-5 hover:underline">
                  {product.name}
                </NavLink>
                <div className="mt-5 text-[var(--color-primary)]">
                  {formatNumber(product.price)}
                </div>
                <Quantity
                  productID={product.id}
                  quantity={cartContentMap.get(product.id)}
                />
                <div className="mt-5 text-color[var(--color-dark-light)]">
                  {formatNumber(
                    product.price * Number(cartContentMap.get(product.id))
                  )}
                </div>
                <Form method="post" className="mt-5">
                  <input
                    type="text"
                    name="removeProduct"
                    defaultValue={""}
                    hidden
                  />
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget.form;
                      const input = form?.querySelector(
                        "input[name='removeProduct']"
                      ) as HTMLInputElement;

                      if (input) {
                        input.value = product.id.toString();
                      }
                      form?.requestSubmit();
                    }}>
                    <RemoveComponent
                      className="font-bold hover:bg-red hover:cursor-pointer hover:text-red-700
                       duration-300 hover:rotate-90"
                    />
                  </button>
                </Form>
              </div>
              <span className="w-full h-[1px]  block bg-[var(--color-gray-200)] mx-auto my-5"></span>
            </div>
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

function Summary({
  productsNum,
  totalPrice,
}: {
  productsNum: number;
  totalPrice: number;
}) {
  return (
    <div className="flex flex-row justify-between items-center text-[var(--color-gray-600)] font-semibold text-lg mt-5">
      <span>סה"כ מוצרים ({productsNum}) </span>
      <span className="text-[var(--color-dark)]">
        {formatNumber(totalPrice)} ₪
      </span>
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
function Takses({ totalPrice }: { totalPrice: number }) {
  const taxes = 18;
  const shippingPrice = 0;
  const totalTakes = formatNumber(((totalPrice + shippingPrice) / 100) * taxes);
  return (
    <div className="flex flex-row justify-between items-center text-[var(--color-gray-600)] font-semibold text-lg mt-5">
      <span>מע"מ {taxes}% (כלול)</span>
      <span className="text-[var(--color-dark)]">₪{totalTakes}</span>
    </div>
  );
}

function Total({
  totalPrice,
  totalDiscount,
  fetcher,
}: {
  totalPrice: number;
  totalDiscount: number;
  fetcher: ReturnType<typeof useFetcher>;
}) {
  const shippingPrice = 0;
  const [allowed, setAllowed] = useState<boolean>(false);

  return (
    <>
      <span className="w-full h-[1px] block bg-[var(--color-gray-200)] mx-auto my-5"></span>
      <div className="flex flex-row justify-between items-center text-[var(--color-gray-600)] font-semibold text-lg mt-5">
        <span className="font-bold text-2xl">סה"כ לתשלום</span>
        <span className="text-[var(--color-dark)] font-bold text-2xl">
          ₪{formatNumber(totalPrice + shippingPrice)}
        </span>
      </div>
      {totalDiscount > 0 && (
        <div className="flex flex-row justify-between items-center text-[var(--color-gray-600)] font-semibold text-lg mt-5">
          <span>סה"כ חסכת😊</span>
          <span className="text-[var(--color-success)] font-bold">
            ₪{formatNumber(totalDiscount)}
          </span>
        </div>
      )}

      <label
        htmlFor="coupon-discount"
        className="font-bold text-xl text-[var(--color-gray-600)] mt-10">
        קופון הנחה
      </label>
      <fetcher.Form
        method="post"
        className="flex flex-row justify-between items-center text-[var(--color-gray-600)] font-semibold text-lg mt-5 gap-10">
        <input
          type="text"
          placeholder="הזן קוד קופון"
          id="coupon-discount"
          name="coupon-discount"
          className="w-2/3 h-15 p-5 border-[1px] border-[var(--color-gray-200)] text-[var(--color-dark)] font-semibold focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
          onChange={(e) => {
            setAllowed(e.target.value.length > 0);
          }}
        />
        <button
          type="submit"
          className="w-1/3 h-15 border-[1px] bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-dark)] hover:cursor-pointer duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
          disabled={!allowed}>
          החל
        </button>
      </fetcher.Form>
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

export function formatNumber(value: number | string): string {
  const number = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(number)) {
    return "0";
  }

  return number.toLocaleString("he-IL");
}

function Quantity({
  productID,
  quantity = 1,
}: {
  productID: number;
  quantity?: number;
}) {
  const fetcher = useFetcher();
  const [productQuantity, setProductQuantity] = useState<number>(quantity);

  return (
    <fetcher.Form
      method="post"
      className=" mt-5 flex items-stretch gap-1 rounded-full border border-[var(--color-gray-300)] h-10 w-fit overflow-hidden">
      <input type="text" name="productID" defaultValue={productID} hidden />
      <input
        type="text"
        name="productQuantity"
        defaultValue={productQuantity}
        hidden
      />
      <button
        className="cursor-pointer w-10 h-full flex items-center justify-center bg-transparent hover:bg-[var(--color-gray-300)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={(e) => {
          e.preventDefault();
          const newQuantity = productQuantity - 1;
          setProductQuantity(newQuantity);
          const form = e.currentTarget.form;
          const input = form?.querySelector(
            'input[name="productQuantity"]'
          ) as HTMLInputElement;

          if (input) {
            input.value = newQuantity + "";
          }
          form?.requestSubmit();
        }}
        disabled={productQuantity <= 1}>
        -
      </button>
      <div className="min-w-12 text-center flex items-center justify-center px-2">
        {productQuantity}
      </div>
      <button
        className="cursor-pointer w-10 h-full flex items-center justify-center bg-transparent hover:bg-[var(--color-gray-300)] transition-colors "
        onClick={(e) => {
          e.preventDefault();
          const newQuantity = productQuantity + 1;
          setProductQuantity(newQuantity);
          const form = e.currentTarget.form;
          const input = form?.querySelector(
            'input[name="productQuantity"]'
          ) as HTMLInputElement;

          if (input) {
            console.log(newQuantity);

            input.value = newQuantity + "";
          }
          form?.requestSubmit();
        }}>
        +
      </button>
    </fetcher.Form>
  );
}
