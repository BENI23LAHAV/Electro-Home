import fs from "fs";
import path from "path";
import ProductService from "./productService";
import type { User, Response } from "../definitions";

let filePath = process.env.REACT_GLOBAL_PATH_FOR_DB as string;
filePath += process.env.REACT_USERS_DB_PATH;

const USERS_PATH = path.resolve(process.cwd(), filePath);

class UserService {
  static ProductService = ProductService;

  static login(email: string, password: string): Response {
    try {
      const data = fs.readFileSync(USERS_PATH, "utf-8");
      const users = JSON.parse(data) as User[];
      const user = users.find(
        (user) => user.email === email && user.password === password
      ) as User;
      const success = user !== undefined || user !== null ? true : false;
      return {
        success,
        message: `${
          success ? "User logged in successfully" : "The details are incorrect"
        }`,
        data: user,
      };
    } catch (err) {
      return {
        success: false,
        message: err as string,
        data: null,
      };
    }
  }
  static getUser(email: string): Response {
    try {
      const data = fs.readFileSync(USERS_PATH, "utf-8");
      const users = JSON.parse(data) as User[];
      const user = users.find((user) => user.email === email) as User;
      const success = user !== undefined || user !== null ? true : false;
      return {
        success,
        message: `${success ? "User fetched successfully" : "User not found"}`,
        data: user,
      };
    } catch (err) {
      return {
        success: false,
        message: err as string,
        data: null,
      };
    }
  }
  static async addToCart(
    userId: number,
    productId: number,
    quantity: number = 1
  ): Promise<Response> {
    try {
      const product = await ProductService.getProductById(productId);
      if (!product.success) {
        return {
          success: false,
          message: "Product not found",
          data: null,
        };
      }

      const data = fs.readFileSync(USERS_PATH, "utf-8");
      const users = JSON.parse(data) as User[];

      const userIndex = users.findIndex((user) => user.id === userId);
      if (userIndex === -1) {
        return {
          success: false,
          message: "User not found",
          data: null,
        };
      }

      const user = users[userIndex];
      user.cart.push({ productId, quantity });

      fs.writeFileSync(USERS_PATH, JSON.stringify(users));

      return {
        success: true,
        message: "Product added to cart successfully",
        data: null,
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

export default UserService;
