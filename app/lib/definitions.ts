interface Category {
  id: string;
  name: string;
  description: string;
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

export type { Category, Product, User, Response, ATagProps };
