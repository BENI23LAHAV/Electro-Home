import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { Product, Response } from "../definitions";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsPath = process.env.REACT_PRODUCTS_DB_PATH;
const PRODUCT_PATH = path.resolve(__dirname, productsPath as string);

class ProductService {
  /**---------- Get Products ---------- */

  //It gets the all products from the DB
  static async getProducts(): Promise<Response> {
    try {
      const data = fs.readFileSync(PRODUCT_PATH, "utf-8");
      const res = JSON.parse(data) as Product[];
      const success = res !== undefined || res !== null ? true : false;
      return {
        success,
        message: `${
          success ? "Products fetched successfully" : "Products not found"
        }`,
        data: res,
      };
    } catch (err) {
      return {
        success: false,
        message: err as string,
        data: null,
      };
    }
  }
  //It gets the product by id
  static async getProductById(id: number): Promise<Response> {
    try {
      const products = (await this.getProducts()).data as Product[];
      const res = products.find((product) => product.id === id) as Product;
      const success = res !== undefined || res !== null ? true : false;
      return {
        success,
        message: `${
          success ? "Product fetched successfully" : "Product not found"
        }`,
        data: res,
      };
    } catch (err) {
      return {
        success: false,
        message: err as string,
        data: null,
      };
    }
  }
}

export default ProductService;
