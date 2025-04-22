import type { Route } from "./+types/home";
import Navbar from "./navbar";
import "app/app.css";
import { HeadPage } from "./homeComponents";
import { BodyPage } from "./homeProductsComponents";
import CategoriesService from "../lib/services/categoriesService";
import ProductService from "~/lib/services/productService";
import type { Category, Product } from "../lib/definitions";

export async function loader() {
  const categories = await CategoriesService.getCategories();
  if (!categories.success) {
    throw new Response("Categories not found", { status: 404 });
  }
  const products = await ProductService.getProductsWithImages();
  if (!products.success) {
    throw new Response("Products not found", { status: 404 });
  }
  const res = {
    categories: (await categories.data) as Category[],
    products: (await products.data) as Product[],
  };
  return res;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const categories = loaderData.categories as Category[];
  const products = loaderData.products as Product[];

  const titles = categories.map((item) => item.name);
  if (titles.length > 0) {
    return (
      <div className="w-[90%] mx-auto ">
        <HeadPage />

        <BodyPage categories={titles} products={products} />
      </div>
    );
  }
}

function Space() {
  return <div className="min-w-full min-h-[30vh]"></div>;
}
