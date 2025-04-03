import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import CategoriesService from "app/lib/services/categoriesService";
import ProductService from "app/lib/services/productService";
import type { Category, Product } from "~/lib/definitions";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default async function Home() {
  const categories = (await CategoriesService?.getCategories())
    .data as Category[];

  return (
    <>
      <ul>
        {categories?.map((category: Category) => (
          <>
            {" "}
            <li key={category.id}>
              <a href={`/category/${category.id}`}>{category.name}</a>
            </li>
          </>
        ))}
      </ul>

      {/* <Welcome /> */}
    </>
  );
}
