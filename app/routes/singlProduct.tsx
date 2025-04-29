import { useEffect, useState } from "react";
import type {
  Product,
  Category,
  Specialty,
  PriceProps,
} from "../lib/definitions";
import { formatNumber } from "./shoppingCart";

import {
  TrackComponent,
  LocationComponent,
  ClockComponent,
  StatusComponent,
  Sale,
  New,
  StarRating,
  DeliveryConditons,
} from "~/lib/DesignComponents";
import { useFetcher } from "react-router";
import type { Route } from "./+types/singlProduct";

export async function loader({ params }: Route.LoaderArgs) {
  const { default: CategoriesService } = await import(
    "~/lib/services/categoriesService"
  );
  const { default: ProductService } = await import(
    "~/lib/services/productService"
  );

  const product = (await ProductService.getProductById(Number(params.id)))
    .data as Product;

  let productCategories: Category[] = [];
  if (product) {
    const allCategories = (await CategoriesService.getCategories())
      .data as Category[];
    const productCategoryIds = product.categories as string[];
    productCategories = allCategories.filter((category) =>
      productCategoryIds.includes(category.id)
    );
  }

  return {
    product,
    productCategories,
  };
}

export async function action({ request }: Route.ActionArgs) {
  const { default: CartService } = await import("~/lib/services/cartService");
  const formData = await request.formData();
  const productId = Number(formData.get("productID"));
  const quantity = Number(formData.get("productQuantity"));
  const result = (await CartService.addProduct({ productId, quantity }))
    .success;

  return { success: result as boolean, isVisible: true };
}

export default function SingleProduct({ loaderData }: Route.ComponentProps) {
  const product = loaderData.product as Product;
  const productCategories = loaderData.productCategories as Category[];

  const fetcher = useFetcher();

  const [currentImage, setCurrentImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    if (fetcher.data?.isVisible) {
      setShowMessage(true);
      setMessageType(fetcher.data.success ? "success" : "error");

      const timer = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [fetcher.data]);

  if (!product) {
    return (
      <div className="w-[90%] mx-auto mt-20 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">המוצר לא נמצא</h1>
      </div>
    );
  }

  return (
    <div className="mt-15 pt-10 flex flex-row justify-between mr-[2%]">
      <div className="w-1/2">
        <div className="w-4/5 aspect-square p-15 bg-white rounded-md my-5 shadow overflow-hidden mx-auto">
          <LargeImage url={currentImage} />
        </div>

        <div className="flex flex-row justify-start  gap-2 my-5 overflow-hidden">
          {product.images.map((item, k) => (
            <SmallImage
              key={k}
              url={item}
              currentImage={currentImage}
              setCurrentImage={setCurrentImage}
            />
          ))}
        </div>
      </div>

      <div className="w-1/2 flex flex-col items-start">
        <div className="w-[90%] mx-auto">
          <div>
            {product.reviews < 10 && <New />} {product.discount > 0 && <Sale />}
          </div>
          <h1 className="text-5xl font-bold">{product.name}</h1>
          <div className="flex gap-5 text-gray-500 mt-2 py-2">
            <StarRating rating={product.rating} />
            {product.reviews + " ביקורות"}
          </div>
          <FinalPrice price={product.price} discount={product.discount} />
          <EnterByDot>{product.description}</EnterByDot>
          <Specification
            specification={product.specifications}
            productCategories={productCategories}
          />
          <AddToCartMessage
            visible={showMessage}
            success={messageType === "success"}
          />
          <Quantity quantity={quantity} setQuantity={setQuantity} />

          <fetcher.Form
            method="post"
            preventScrollReset
            onSubmit={(e) => {
              e.preventDefault();
              fetcher.submit(e.currentTarget, {
                method: "post",
                preventScrollReset: true,
              });
            }}>
            <input type="hidden" name="productQuantity" value={quantity} />
            <input type="hidden" name="productID" value={product.id} />
            <button
              type="submit"
              className="w-full py-3 mt-5 bg-[var(--color-primary)] text-white rounded-full font-semibold hover:bg-[var(--color-primary-dark)] hover:cursor-pointer duration-300">
              הוספה לסל
            </button>
          </fetcher.Form>

          <div className="flex flex-row my-10 justify-between">
            <DeliveryConditons
              title="משלוח חינם"
              text="משלוח לכל חלקי הארץ ללא עלות"
              Icon={<TrackComponent />}
            />
            <DeliveryConditons
              title="זמן אספקה"
              text="3-5 ימי עסקים"
              Icon={<ClockComponent />}
            />
            <DeliveryConditons
              title="התקנה מקצועית"
              text="שירות התקנה זמין בתוספת תשלום"
              Icon={<LocationComponent />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function EnterByDot({ children }: { children: React.ReactNode }) {
  if (children && typeof children === "string") {
    const lines: string[] = children?.split(".");

    const newWords = lines.map((line, index) => {
      return (
        <span key={index} className="text-lg text-[var(--color-gray-700)]">
          {line.length > 0 && `${line}.`}
          <br />
        </span>
      );
    });
    return <div className="mt-5">{newWords}</div>;
  }
  return <></>;
}

function FinalPrice({ price, discount }: PriceProps) {
  const numericPrice = Number(price);
  const numericDiscount = Number(discount);
  const hasDiscount = numericDiscount > 0;

  if (!hasDiscount) {
    return (
      <span className="text-3xl font-bold text-[var(--color-primary)]">
        {formatNumber(price)} ₪
      </span>
    );
  }

  const originalPrice = numericPrice + numericDiscount;
  const discountPercent = ((numericDiscount / originalPrice) * 100).toFixed(1);

  return (
    <div className="flex items-center gap-2">
      <span className="text-lg line-through text-[var(--color-gray-500)] font-semibold">
        {formatNumber(originalPrice)} ₪
      </span>
      <span className="text-3xl font-bold text-[var(--color-primary)]">
        {formatNumber(numericPrice)} ₪
      </span>
      <span className="text-3xl font-semibold text-[var(--color-success)]">
        % {discountPercent}-
      </span>
    </div>
  );
}

function LargeImage({ url }: { url: string }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();

    const relativeX = e.clientX - bounds.left;
    const relativeY = e.clientY - bounds.top;

    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    const offsetX = ((relativeX - centerX) / centerX) * -150;
    const offsetY = ((relativeY - centerY) / centerY) * -150;

    setOffset({ x: offsetX, y: offsetY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div className="w-full h-full overflow-hidden rounded-md">
      <img
        src={url}
        alt="current product"
        className="w-full h-full object-contain transition-transform duration-500 ease-out hover:scale-150 hover:cursor-zoom-in"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
}
function SmallImage({
  url,
  currentImage,
  setCurrentImage,
}: {
  url: string;
  currentImage: string;
  setCurrentImage: (url: string) => void;
}) {
  return (
    <div
      className={`${
        currentImage == url &&
        "border-2 border-[var(--color-primary)] rounded-md"
      }`}>
      <img
        src={url}
        alt=""
        className="max-w-30 max-h-30  p-3 rounded-md cursor-pointer shadow-[var(--shadow-card)]"
        onClick={() => setCurrentImage(url)}
      />
    </div>
  );
}

function Specification({
  specification,
  productCategories,
}: {
  specification: Specialty | undefined;
  productCategories: Category[] | undefined;
}) {
  if (!specification) return <></>;

  const categoryMap = new Map(
    productCategories?.flatMap((category) =>
      category.specialties.map((spec) => [spec.id, spec.name])
    ) || []
  );

  const data = Object.entries(specification);

  return (
    <>
      <h2 className="text-xl font-semibold text-[var(--color-dark)] my-5">
        מפרט טכני
      </h2>
      {data.map((item, k) => {
        const categoryName = categoryMap.get(item[0]);

        return item[1] ? (
          <div
            key={item[0]}
            className="my-2 flex flex-row justify-between w-full text-md">
            <span className="font-semibold text-lg text-[var(--color-dark)]">
              {categoryName}
            </span>
            <span className="text-[var(--color-gray-500)]">
              {item[1] ? item[1] : "לא ידוע"}
            </span>
          </div>
        ) : null;
      })}
      <span className="w-full h-[1px] block bg-[var(--color-gray-200)]"></span>
    </>
  );
}

function Quantity({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: (quantity: number) => void;
}) {
  return (
    <div className="flex flex-row items-center gap-5 my-10 text-[var(--color-dark)] font-semibold">
      <span> כמות:</span>
      <div className="flex items-stretch gap-1 rounded-full border border-[var(--color-gray-300)] h-10 w-fit overflow-hidden">
        <button
          disabled={quantity <= 1}
          className="cursor-pointer w-10 h-full flex items-center justify-center bg-transparent hover:bg-[var(--color-gray-300)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setQuantity(quantity - 1)}>
          -
        </button>
        <div className="min-w-12 text-center flex items-center justify-center px-2">
          {quantity}
        </div>
        <button
          className="cursor-pointer w-10 h-full flex items-center justify-center bg-transparent hover:bg-[var(--color-gray-300)] transition-colors "
          onClick={() => setQuantity(quantity + 1)}>
          +
        </button>
      </div>
    </div>
  );
}

function AddToCartMessage({
  visible,
  success,
}: {
  visible: boolean;
  success: boolean;
}) {
  const successMessage = "המוצר התווסף בהצלחה";
  const errorMessage = "לא ניתן להוסיף את המוצר לסל";

  return (
    <>
      {visible && (
        <div
          className={`flex flex-row justify-center items-center my-5 py-2 h-15
            transition-all duration-500 ease-in-out
           ${
             success
               ? "text-[var(--color-success)] bg-[var(--color-success-light)]"
               : "text-[var(--color-error)] bg-[var(--color-error-light)]"
           } font-semibold rounded-sm`}>
          <StatusComponent />
          <span className="text-2xl rounded-full p-2 text-center">
            {success ? successMessage : errorMessage}
          </span>
        </div>
      )}
      {!visible && (
        <div className="flex flex-row justify-center items-center h-15 my-5 py-2 font-semibold rounded-sm"></div>
      )}
    </>
  );
}
