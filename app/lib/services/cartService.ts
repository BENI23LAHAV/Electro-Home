import ProductService from "./productService";
import fs from "fs";
import path from "path";
let filePath = process.env.REACT_GLOBAL_PATH_FOR_DB as string;
filePath += process.env.REACT_CART_DB_PATH;
const cartPath = path.resolve(process.cwd(), filePath);

import type { CartContent, Response } from "../definitions";
class CartService {
  static async getCart(): Promise<Response> {
    try {
      const data = fs.readFileSync(cartPath, "utf-8");

      return {
        success: true,
        message: "Cart fetched successfully",
        data: (await JSON.parse(data)) as CartContent[],
      };
    } catch (error) {
      console.log(error);
      return { success: false, message: (error as Error).message, data: null };
    }
  }
  static async addProduct({
    productId,
    quantity,
  }: CartContent): Promise<Response> {
    if (productId && quantity >= 1) {
      try {
        const data = fs.readFileSync(cartPath, "utf-8");
        const cart = JSON.parse(data) as CartContent[];
        const productResponse = await ProductService.getProductById(productId);
        if (productResponse.success && productResponse.data) {
          const productData = productResponse.data;
          const cartItem = cart.find((item) => item.productId === productId);
          if (cartItem) {
            cartItem.quantity += quantity;
          } else {
            cart.push({ productId, quantity });
          }
          fs.writeFileSync(cartPath, JSON.stringify(cart, null, 2));
          return {
            success: true,
            message: "Product added to cart successfully",
            data: productData,
          };
        } else {
          return {
            success: false,
            message: "Product not found",
            data: null,
          };
        }
      } catch (error) {
        console.log(error);
        return {
          success: false,
          message: (error as Error).message,
          data: null,
        };
      }
    }

    return {
      success: false,
      message: "productId and quantity are required",
      data: null,
    };
  }
  static async cartCapacity(): Promise<Response> {
    try {
      const data = (await this.getCart()).data as CartContent[];

      return {
        success: true,
        message: "Cart capacity fetched successfully",
        data: data.length,
      };
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
        data: null,
      };
    }
  }
  static async changeQuantity(
    productID: number,
    quantity: number
  ): Promise<Response> {
    if (quantity >= 1) {
      const data = (await this.getCart()).data as CartContent[];
      const cartItem = data.find((item) => item.productId === productID);
      if (cartItem) {
        cartItem.quantity = quantity;
        fs.writeFileSync(cartPath, JSON.stringify(data, null, 2));
        return {
          success: true,
          message: "Quantity changed successfully",
          data: null,
        };
      } else {
        return {
          success: false,
          message: "Product not found in cart",
          data: null,
        };
      }
    } else {
      return {
        success: false,
        message: "Quantity must be greater than 0",
        data: null,
      };
    }
  }
  static async removeProduct(productID: number): Promise<Response> {
    if (productID) {
      const data = (await this.getCart()).data as CartContent[];
      const cartItem = data.find((item) => item.productId === productID);
      if (cartItem) {
        data.splice(data.indexOf(cartItem), 1);
        fs.writeFileSync(cartPath, JSON.stringify(data, null, 2));
        return {
          success: true,
          message: "Product removed from cart successfully",
          data: null,
        };
      } else {
        return {
          success: false,
          message: "Product not found in cart",
          data: null,
        };
      }
    } else {
      return {
        success: false,
        message: "Product ID is required",
        data: null,
      };
    }
  }
}
export default CartService;
