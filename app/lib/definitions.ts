interface Category {
  id: string;
  name: string;
  description: string;
  specialties: Specialty[];
}
interface Specialty {
  id: string;
  name: string;
  values: string[];
}
interface Product {
  id: number;
  name: string;
  description: string;
  images: string[];
  price: number;
  discount: number;
  categories: string[];
  amount: number;
  rating: number;
  reviews: number;
}
interface User {
  id: number;
  password: string;
  name: string;
  email: string;
  phone: string;
  cart: {
    productId: number;
    quantity: number;
  }[];
}
interface Response {
  success: boolean;
  message: string;
  data: unknown;
}
type ATagProps = { text: string };

interface BodyPageProps {
  categories: Category[];
  products: Product[];
}
interface ProductsGridProps {
  products: Product[];
}

type SortBy = "pop" | "htl" | "lth";
export type {
  Category,
  Product,
  User,
  Response,
  ATagProps,
  BodyPageProps,
  ProductsGridProps,
  SortBy,
};
