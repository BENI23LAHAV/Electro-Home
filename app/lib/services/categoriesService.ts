import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { Category, Response } from "../definitions";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const categoriesPathe = process.env.REACT_CATEGORIES_DB_PATH;
const CATEGORIES_PATH = path.resolve(__dirname, categoriesPathe as string);

class CategoriesService {
  //It gets the all categories from the DB
  static async getCategories(): Promise<Response> {
    try {
      const data = fs.readFileSync(CATEGORIES_PATH, "utf-8");
      const res = JSON.parse(data);
      const success = res !== undefined || res !== null ? true : false;
      return {
        success,
        message: `${
          success ? "Categories fetched successfully" : "Categories not found"
        }`,
        data: res as Category[],
      };
    } catch (err) {
      return {
        success: false,
        message: err as string,
        data: null,
      };
    }
  }

  //It gets the category by id
  static async getCategoryById(id: string): Promise<Response> {
    try {
      const categories = (await this.getCategories()).data as Category[];
      const res = categories.find((category) => category.id === id);
      const success = res !== undefined || res !== null ? true : false;
      return {
        success,
        message: `${
          success ? "Category fetched successfully" : "Category not found"
        }`,
        data: res as Category,
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

export default CategoriesService;
