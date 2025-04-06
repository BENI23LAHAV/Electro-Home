import CategoriesService from "../lib/services/categoriesService";
import type { Category } from "../lib/definitions";
export async function loader() {
  let categories = [];
  try {
    categories = (await CategoriesService.getCategories()).data as Category[];
    console.log(categories);
  } catch (err) {
    console.log(err);
  }
}

export default function BodyPage() {
  return (
    <>
      <Title />
      <ProductToolbar />
    </>
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

function Categories() {}
