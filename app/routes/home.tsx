import type { Route } from "./+types/home";
import Navbar from "./navbar";
import "app/app.css";
import { HeadPage } from "./homeComponents";
import BodyPage from "./homeProductsComponents";
// import CategoriesService from "../lib/services/categoriesService";
import type { Category } from "../lib/definitions";
//
export default function Home() {
  return (
    <div className="w-[90%] mx-auto ">
      <HeadPage />
      <BodyPage />
    </div>
  );
}

function Space() {
  return <div className="min-w-full min-h-[30vh]"></div>;
}
