import type { Route } from "./+types/home";
import image1 from "app/lib/images/image1.jpeg";
import {
  Soon,
  FilterComponent,
  HomeButton,
  New,
  Sale,
} from "../lib/DesignComponents";
import "app/app.css";

import { formatNumber } from "./shoppingCart";
import type {
  BodyPageProps,
  Category,
  Product,
  ProductsGridProps,
  Response,
  SortBy,
} from "../lib/definitions";
import { Form, NavLink, ScrollRestoration, useSubmit } from "react-router";
import { useEffect, useRef, useState } from "react";

export async function loader({ params, request }: Route.LoaderArgs) {
  const { default: CartService } = await import("~/lib/services/cartService");
  const { default: CategoriesService } = await import(
    "~/lib/services/categoriesService"
  );
  const { default: ProductService } = await import(
    "~/lib/services/productService"
  );
  CartService.getCart();

  const url = new URL(request.url);
  let category = url.searchParams.get("category");
  const price = url.searchParams.get("price");
  const sortBy = url.searchParams.get("sortBy");
  const search = url.searchParams.get("search");

  const categories = await CategoriesService.getCategories();
  if (!categories.success) {
    throw new Response("Categories not found", { status: 404 });
  }
  let products: Response;

  const withoutCategory = category;

  !withoutCategory ? (category = "all") : "";
  products = await ProductService.getProductsByCategory(category as string);

  if (sortBy) {
    products.data = orderBy(products.data as Product[], sortBy as SortBy);
  }
  if (price) {
    products.data = filterByPrice(products.data as Product[], Number(price));
  }
  if (search) {
    products.data = filterBySearch(products.data as Product[], search);
  }
  const res = {
    categories: (await categories.data) as Category[],
    products: (await products.data) as Product[],
  };
  return res;
}
export async function action({ request }: Route.ActionArgs) {}

function orderBy(products: Product[], sortBy: SortBy): Product[] {
  switch (sortBy) {
    case "pop":
      return products.sort((a, b) => b.rating - a.rating);
    case "htl":
      return products.sort((a, b) => b.price - a.price);
    case "lth":
      return products.sort((a, b) => a.price - b.price);
    default:
      return products;
  }
}
function filterByPrice(products: Product[], price: number): Product[] {
  return products.filter((product) => product.price <= price);
}
function filterBySearch(products: Product[], search: string): Product[] {
  if (!search) {
    return products;
  }
  const searchParameters = search.toLocaleLowerCase().split(" ");
  return products.filter((product) => {
    const productName = product.name.toLocaleLowerCase();
    const productDescription = product.description.toLocaleLowerCase();
    return searchParameters.every((param) => {
      return productName.includes(param) || productDescription.includes(param);
    });
  });
}
export default function Home({ loaderData }: Route.ComponentProps) {
  const categories = loaderData.categories as Category[];
  const products = loaderData.products as Product[];

  return (
    <div className="w-[90%] mx-auto ">
      <HeadPage />

      <BodyPage categories={categories} products={products} />
    </div>
  );
}

function HeadPage() {
  return (
    <div
      className=" h-[85vh] mx-auto  p-10  rounded-md
  bg-[linear-gradient(45deg,rgba(43,156,216,0.03),rgba(92,209,164,0.05))]
  bg-[#f4f8fb]
       flex flex-row justify-between items-center">
      <div className="flex flex-col gap-4">
        <HeadTitle />
        <Subtitle />
        <div className="flex flex-row gap-4">
          <NavLink to="/#our-products">
            <HomeButton> מוצרים</HomeButton>
          </NavLink>

          <HomeButton>
            {" "}
            מבצעים מיוחדים <Soon />
          </HomeButton>
        </div>
      </div>
      <HomeImage />
    </div>
  );
}

function HeadTitle() {
  return (
    <h1
      className="
    text-6xl font-bold font-monospace
    text-transparent bg-clip-text
    bg-gradient-to-r from-[var(--gradient-orange-start)] to-[var(--gradient-orange-end)]
  ">
      חוויית קניה <br /> עתידנית
    </h1>
  );
}

function Subtitle() {
  return (
    <h2 className="text-md text-[#666666] leading-relaxed">
      גלה את הדור הבא של מוצרי אלקטרוניקה וטכנולוגיה מתקדמת. מחירים מיוחדים
      <br />
      ומשלוח חינם בכל הזמנה.
    </h2>
  );
}
function HomeImage(props: any) {
  return (
    <img
      src={image1}
      alt="future tech"
      className="w-[500px] h-[400px] object-fill animate-[float_6s_ease-in-out_infinite] rounded-sm z-[0]
  "
    />
  );
}

export function BodyPage(props: BodyPageProps) {
  const submit = useSubmit();
  function handleSubmit(event: React.ChangeEvent<HTMLInputElement>) {
    const form = event.currentTarget.form;

    submit(form, {
      method: "get",
      preventScrollReset: true,
    });
  }

  return (
    <div className="mb-15" id="our-products">
      <Title />

      <Form preventScrollReset>
        <Categories categories={props.categories} handleSubmit={handleSubmit} />
        <div className="flex flex-row justify-between mt-10">
          <PriceSlider handleSubmit={handleSubmit} />
          <label
            htmlFor="sort-by"
            className="mt-2 mr-20 text-xl text-[var(--color-dark)]">
            מיון לפי:
          </label>

          <SortBy />
        </div>
        <SearchInput />
      </Form>
      <ProductsGrid products={props.products} />
    </div>
  );
}

function Title() {
  return (
    <>
      <h1 className="text-[2.5rem] text-center  font-bold font-monospace text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-dark-light)] to-[var(--color-dark-light)] mt-16 pt-10">
        המוצרים החמים שלנו{" "}
      </h1>
      <span
        className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--gradient-orange-start)] w-50 h-1 block mx-auto
"></span>
    </>
  );
}

function Categories({
  categories,
}: {
  categories: Category[];
  handleSubmit: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const hasAllCategory = categories.some((item) => item.name === "הכול");

  const allCategories = hasAllCategory
    ? [...categories]
    : [
        {
          id: "all",
          name: "הכול",
          description: "הכול",
          specialties: [],
        },
        ...categories,
      ];
  const [clicked, setClicked] = useState(allCategories[0].id);

  return (
    <div className="flex flex-row justify-center mt-10 ">
      <input type="text" defaultValue={clicked} hidden name="category" />
      {allCategories.map((item, k) => (
        <Button setClicked={setClicked} item={item} clicked={clicked} key={k} />
      ))}
    </div>
  );
}

function Button(props: any) {
  return (
    <button
      type="submit"
      className={`${
        props.clicked === props.item.id
          ? "bg-[var(--color-primary)] text-white"
          : "bg-white text-[var(--color-dark)]"
      }
      mx-1.5 px-6 py-3 
      text-[var(--color-dark)] rounded-full 
      shadow-[var(--shadow-card)] font-medium hover:bg-[var(--color-primary-light)] hover:text-white
        hover:translate-y-[-5px] hover:duration-300 hover:shadow-[0_10px_20px_rgba(110,0,255,0.2)] `}
      onClick={(e) => {
        e.preventDefault();
        const form = e.currentTarget.form;
        const input = form?.querySelector(
          "input[name='category']"
        ) as HTMLInputElement;

        if (input) {
          input.value = props.item.id;
        }
        props.setClicked(props.item.id);
        form?.requestSubmit();
      }}>
      {props.item.name}
    </button>
  );
}
function PriceSlider() {
  const min = 100;
  const max = 20000;
  const [price, setPrice] = useState<number>(max);

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
          name="price"
          ref={sliderRef}
          min={min}
          max={max}
          step={100}
          value={price}
          onInput={handleChange}
          onChange={(e) => e.currentTarget.form?.requestSubmit()}
          className="w-full h-2 rounded-full cursor-pointer appearance-none ml-3"
          style={{
            background: sliderBackground,
          }}
        />
        <span className="text-[var(--color-dark-light)] font-medium ml-3">
          ₪{price.toLocaleString()}
        </span>
        <button
          className="ml-3 text-[var(--color-primary-light)] hover:text-[var(--color-dark-light)] hover:cursor-pointer"
          onClick={() => setPrice(max)}
          type="submit">
          איפוס
        </button>
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
  const soryBy = [
    { id: "pop", name: "פופולריות" },
    { id: "htl", name: "מחיר: גבוה לנמוך" },
    { id: "lth", name: "מחיר: נמוך לגבוה" },
  ];
  const [clicked, setClicked] = useState<number>(0);

  const clickedStyle = "bg-[var(--color-primary)] text-white";
  return (
    <div
      id="sort-by"
      className="flex flex-row rounded-full max-w-fit max-h-10 overflow-hidden shadow-[var(--shadow-card)]">
      <input
        type="text"
        defaultValue={soryBy[clicked].id}
        hidden
        name="sortBy"
      />
      {soryBy.map((item, k) => (
        <button
          type="submit"
          className={`${
            clicked === k ? clickedStyle : "bg-white text-[var(--color-dark)]"
          } font-medium  px-3 py-2 hover:bg-[var(--color-primary)] hover:text-white hover:cursor-pointer`}
          key={k}
          onClick={(e) => {
            e.preventDefault();

            const input = e.currentTarget.form?.querySelector(
              "input[name='sortBy']"
            ) as HTMLInputElement;
            if (input) {
              input.value = item.id;
            }
            e.currentTarget.form?.requestSubmit();
          }}>
          {item.name}
        </button>
      ))}
    </div>
  );
}

function SearchInput(props: any) {
  return (
    <div className="min-w-[90%] max-h-12 mt-10  rounded-full overflow-hidden shadow-[var(--shadow-card)] relative z-10">
      <input
        type="text"
        placeholder="חפש מוצרים..."
        name="search"
        className="w-full bg-white  h-12 pr-5 outline-none"
      />
      <button
        type="submit"
        className=" absolute left-0 h-12 w-20 font-medium bg-[var(--color-primary-light)] hover:bg-[var(--color-primary)] hover:cursor-pointer text-white z-20">
        חיפוש
      </button>
    </div>
  );
}

function ProductsGrid(props: ProductsGridProps) {
  const products = props.products as Product[];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 p-4 mt-10">
      {products.map((item, k) => (
        <NavLink
          to={`/product/${item.id}`}
          key={k}
          className="text-right bg-white hover:bg-[var(--color-light)] duration-300 h-90 overflow-hidden shadow-[var(--shadow-card)] rounded-md ">
          <div className="min-w-full max-h-40 min-h-40 overflow-hidden relative">
            <img
              src={item.images[0]}
              alt=""
              className="w-full h-full  object-cover hover:transform-content hover:scale-[1.1] transition-[var(--transition-default)]"
            />
            {item.discount > 0 && <Sale />}
            {item.reviews < 10 && <New />}
          </div>{" "}
          <div className="overflow-hidden max-h-40">
            <h2 className="text-lg font-bold  mr-4 text-[var(--color-dark)]">
              {" "}
              {item.name}
            </h2>
            <h3 className="max-h-28 min-h-28 overflow-hidden my-2 mx-4 text-md text-[var(--color-dark-light)]">
              {item.description}
            </h3>
          </div>
          <div className="flex flex-row justify-between px-5">
            <p className="text-[var(--color-primary-light)] text-xl font-bold">
              {formatNumber(item.price)} ₪
            </p>

            <button
              className="bg-[var(--color-primary-light)] rounded-full px-2 py-1 text-white hover:bg-[var(--color-secondary)] transition-[var(--transition-default)]
            hover:translate-y-[-5px] hover:duration-300 font-medium hover:cursor-pointer">
              הוספה לסל
            </button>
          </div>
        </NavLink>
      ))}
    </div>
  );
}
