import fs from "fs";
import path from "path";
import type { Category, Response } from "../definitions";

let filePath = process.env.REACT_GLOBAL_PATH_FOR_DB as string;
filePath += process.env.REACT_CATEGORIES_DB_PATH;

const categoriesPath = path.resolve(process.cwd(), filePath);

class CategoriesService {
  static async getCategories(): Promise<Response> {
    try {
      const data = fs.readFileSync(categoriesPath, "utf-8");
      const res = JSON.parse(data);
      const success = res !== undefined && res !== null;

      return {
        success,
        message: success
          ? "Categories fetched successfully"
          : "Categories not found",
        data: res as Category[],
      };
    } catch (err) {
      return {
        success: false,
        message: (err as Error).message,
        data: null,
      };
    }
  }

  static async getCategoryById(id: string): Promise<Response> {
    try {
      const categories = (await this.getCategories()).data as Category[];
      const res = categories.find((category) => category.id === id);
      const success = res !== undefined && res !== null;

      return {
        success,
        message: success
          ? "Category fetched successfully"
          : "Category not found",
        data: res as Category,
      };
    } catch (err) {
      return {
        success: false,
        message: (err as Error).message,
        data: null,
      };
    }
  }
}

export default CategoriesService;
