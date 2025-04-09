import type { Category, Response } from "../lib/definitions";
import { useEffect, useRef, useState } from "react";
// import CategoriesService from "../lib/services/categoriesService";

export async function loader() {
  let categories;
  try {
    // categories = (await CategoriesService.getCategories()) as Response;
    // console.log(categories.message, categories.success);
    // console.log(categories.data);
    // console.log("here: at categories loader");
  } catch (err) {
    console.log(err);
  }
}

export default function BodyPage() {
  return (
    <div className="">
      <Title />
      <ProductToolbar />
      <Categories />
      <div className="flex flex-row justify-between mt-10">
        <PriceSlider />
        <label
          htmlFor="sort-by"
          className="mt-2 mr-10 text-xl text-[var(--color-dark)]">
          מיון לפי:
        </label>

        <SortBy />
      </div>
    </div>
  );
}

function Title() {
  return (
    <>
      <h1 className="text-[2.5rem] text-center  font-bold font-monospace text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-dark-light)] to-[var(--color-dark-light)] mt-16">
        המוצרים החמים שלנו{" "}
      </h1>
      <span
        className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--gradient-orange-start)] w-50 h-1 block mx-auto
"></span>
    </>
  );
}

function ProductToolbar() {
  //   console.log(categories);
  return <></>;
}

function Categories(props: any) {
  const categories = ["סמארטפונים", "מחשבים", "טלוויזיות ומסכים"];
  return (
    <div className="flex flex-row justify-center mt-10 ">
      {categories.map((item, k) => (
        <Button key={k}>{item}</Button>
      ))}
    </div>
  );
}

function Button(props: any) {
  return (
    <button
      className="bg-white
      mx-1.5 px-6 py-3 
      text-[var(--color-dark)] rounded-full 
      shadow-[var(--shadow-card)] font-medium hover:bg-[var(--color-primary-light)] hover:text-white
        hover:translate-y-[-5px] hover:duration-300 hover:shadow-[0_10px_20px_rgba(110,0,255,0.2)]">
      {props.children}
    </button>
  );
}
function PriceSlider() {
  const [price, setPrice] = useState<number>(5000);
  const min = 100;
  const max = 10000;

  const sliderRef = useRef<HTMLInputElement>(null);
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

  useEffect(() => {
    const htmlDir = document.documentElement.getAttribute("dir");
    setDirection(htmlDir === "rtl" ? "rtl" : "ltr");
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.currentTarget.value));
  };

  const percentage = ((price - min) / (max - min)) * 100;

  const sliderBackground =
    direction === "rtl"
      ? `linear-gradient(to left, var(--color-primary-light) 0%, var(--color-primary-light) ${percentage}%, white ${percentage}%, white 100%)`
      : `linear-gradient(to right, var(--color-primary-light) 0%, var(--color-primary-light) ${percentage}%, white ${percentage}%, white 100%)`;

  return (
    <div className="flex flex-col items-center space-x-4 bg-white p-6 rounded-lg shadow-[var(--shadow-card)] w-[60%] relative">
      <div className="flex flex-row gap-2 justify-baseline absolute right-6 ">
        <FilterComponent className="mt-1 text-[var(--color-primary-light)]" />

        <span className="text-[var(--color-dark-light)] text-lg">
          סינון לפי מחיר מקסימלי
        </span>
      </div>
      <div className="m-0 mt-10 min-w-full flex flex-row">
        <input
          type="range"
          ref={sliderRef}
          min={min}
          max={max}
          step={100}
          value={price}
          onInput={handleChange}
          className="w-full h-2 rounded-full cursor-pointer appearance-none ml-3"
          style={{
            background: sliderBackground,
          }}
        />
        <span className="text-[var(--color-dark-light)] font-medium ml-3">
          ₪{price.toLocaleString()}
        </span>
        <span className="ml-3 text-[var(--color-primary-light)] hover:text-[var(--color-dark-light)] hover:cursor-pointer">
          איפוס
        </span>
        <style>
          {`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            height: 20px;
            width: 20px;
            background-color: white;
            border: 2px solid var(--color-primary-light);
            border-radius: 50%;
            cursor: pointer;
            margin-top: -9px; 
          }

          input[type="range"]::-webkit-slider-runnable-track {
            height: 6px;
            border-radius: 9999px;
          }
        `}
        </style>
      </div>
    </div>
  );
}

function SortBy(props: any) {
  const soryBy = ["פופולאריות", "מחיר: גבוה לנמוך", "מחיר: נמוך לגבוה"];
  const [clicked, setClicked] = useState<number>(0);

  const clickedStyle = "bg-[var(--color-primary)] text-white";
  return (
    <div
      id="sort-by"
      className="flex flex-row rounded-full max-w-fit max-h-10 overflow-hidden shadow-[var(--shadow-card)]">
      {soryBy.map((item, k) => (
        <p
          className={`${
            clicked === k ? clickedStyle : "bg-white text-[var(--color-dark)]"
          }   px-3 py-2 hover:bg-[var(--color-primary)] hover:text-white hover:cursor-pointer`}
          key={k}
          onClick={() => setClicked(k)}>
          {item}
        </p>
      ))}
    </div>
  );
}
function FilterComponent(props: any) {
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
      <path d="M4 21L4 14" />
      <path d="M4 10L4 3" />
      <path d="M12 21L12 12" />
      <path d="M12 8L12 3" />
      <path d="M20 21L20 16" />
      <path d="M20 12L20 3" />
      <path d="M1 14L7 14" />
      <path d="M9 8L15 8" />
      <path d="M17 16L23 16" />
    </svg>
  );
}
function SearchInput(props: any) {}
