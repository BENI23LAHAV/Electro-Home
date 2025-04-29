import type { ReactNode } from "react";

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
  specifications: Specialty;
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
interface ATagProps {
  text: string;
  path?: string | null | undefined;
}

interface BodyPageProps {
  categories: Category[];
  products: Product[];
}
interface ProductsGridProps {
  products: Product[];
}

interface CartContent {
  productId: number;
  quantity: number;
}
type PriceProps = {
  price: number | string;
  discount: number | string;
};
type StarRatingProps = {
  rating: number;
};

type SortBy = "pop" | "htl" | "lth";

interface ScrollLinkProps {
  targetId: string;
  children: ReactNode;
}
interface LogoProps {
  showIcon?: boolean;
  width?: string | number;
  height?: string | number;
}

export type {
  Category,
  Product,
  User,
  Response,
  ATagProps,
  BodyPageProps,
  ProductsGridProps,
  SortBy,
  CartContent,
  Specialty,
  PriceProps,
  StarRatingProps,
  ScrollLinkProps,
  LogoProps,
};
