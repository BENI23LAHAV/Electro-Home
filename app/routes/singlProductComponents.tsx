import { useState } from "react";

function StarRating({ rating }: StarRatingProps) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <svg
          key={i}
          className="w-6 h-6 text-yellow-400 fill-current"
          viewBox="0 0 24 24">
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 
                               12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          />
        </svg>
      );
    } else if (rating >= i - 0.5) {
      stars.push(
        <svg key={i} className="w-6 h-6 text-yellow-400" viewBox="0 0 24 24">
          <defs>
            <linearGradient id={`half-${i}`} x1="100%" x2="0%" y1="0" y2="0">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" stopOpacity="1" />
            </linearGradient>
          </defs>
          <polygon
            fill={`url(#half-${i})`}
            stroke="currentColor"
            strokeWidth="1"
            points="12 2 15.09 8.26 22 9.27 17 14.14 
                        18.18 21.02 12 17.77 5.82 21.02 
                        7 14.14 2 9.27 8.91 8.26 12 2"
          />
        </svg>
      );
    } else {
      stars.push(
        <svg
          key={i}
          className="w-6 h-6 text-gray-300 fill-current"
          viewBox="0 0 24 24">
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 
                               12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          />
        </svg>
      );
    }
  }

  return <div className="flex  gap-1">{stars}</div>;
}

function Sale() {
  return (
    <span className="  bg-[var(--color-secondary)] rounded-full px-2 py-1 text-[12px] font-semibold text-[var(--color-dark)]">
      במבצע!
    </span>
  );
}
function New() {
  return (
    <span className="  bg-[var(--color-secondary)] rounded-full px-2 py-1 text-[12px] font-semibold text-[var(--color-dark)]">
      חדש!{" "}
    </span>
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

type PriceProps = {
  price: number | string;
  discount: number | string;
};

function FinalPrice({ price, discount }: PriceProps) {
  const numericPrice = Number(price);
  const numericDiscount = Number(discount);
  const hasDiscount = numericDiscount > 0;

  if (!hasDiscount) {
    return (
      <span className="text-3xl font-bold text-[var(--color-primary)]">
        {numericPrice} ₪
      </span>
    );
  }

  const originalPrice = numericPrice + numericDiscount;
  const discountPercent = ((numericDiscount / originalPrice) * 100).toFixed(1);

  return (
    <div className="flex items-center gap-2">
      <span className="text-lg line-through text-[var(--color-gray-500)] font-semibold">
        {originalPrice} ₪
      </span>
      <span className="text-3xl font-bold text-[var(--color-primary)]">
        {numericPrice} ₪
      </span>
      <span className="text-3xl font-semibold text-[var(--color-success)]">
        % {discountPercent}-
      </span>
    </div>
  );
}
type StarRatingProps = {
  rating: number;
};

function LargeImage({ url }: { url: string }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();

    const relativeX = e.clientX - bounds.left;
    const relativeY = e.clientY - bounds.top;

    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    const offsetX = ((relativeX - centerX) / centerX) * 200;
    const offsetY = ((relativeY - centerY) / centerY) * 200;

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
        className={`w-full h-full object-cover transition-transform duration-300 ease-out hover:scale-150`}
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
        className="max-w-40 max-h-40  p-3 rounded-md cursor-pointer shadow-[var(--shadow-card)]"
        onClick={() => setCurrentImage(url)}
      />
    </div>
  );
}

type TVexample = {
  screen: number | string;
  resolution: number | string;
  smartTv: boolean;
  hdmi: boolean;
  usb: boolean;
  audio: number | string;
  bluetooth: boolean;
};

function Specification({
  specification,
}: {
  specification: TVexample | undefined;
}) {
  if (!specification) return <></>;
  const data = Object.entries(specification);

  return (
    <>
      <h2 className="text-xl font-semibold text-[var(--color-dark)] my-5">
        מפרט טכני
      </h2>
      {data.map((item, k) => (
        <>
          <div
            key={item[0]}
            className="my-2 flex flex-row justify-between w-full text-md">
            <span className="font-semibold text-lg text-[var(--color-dark)]">
              {item[0]}
            </span>
            <span className="text-[var(--color-gray-500)]">
              {typeof item[1] === "boolean"
                ? item[1]
                  ? "כן"
                  : "לא"
                : (item[1] as string)}
            </span>
          </div>
          <span className="w-full h-[1px] block bg-[var(--color-gray-200)]"></span>
        </>
      ))}
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
function TrackComponent(props: any) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <path d="M1 3H16V16H1z" />
      <path d="M16 8L20 8 23 11 23 16 16 16 16 8z" />
      <circle cx={5.5} cy={18.5} r={2.5} />
      <circle cx={18.5} cy={18.5} r={2.5} />
    </svg>
  );
}
function ClockComponent(props: any) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <circle cx={12} cy={12} r={10} />
      <path d="M12 6L12 12 16 14" />
    </svg>
  );
}
function LocationComponent(props: any) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx={12} cy={10} r={3} />
    </svg>
  );
}

export {
  StarRating,
  Sale,
  New,
  EnterByDot,
  FinalPrice,
  LargeImage,
  SmallImage,
  Specification,
  Quantity,
  TrackComponent,
  ClockComponent,
  LocationComponent,
};
