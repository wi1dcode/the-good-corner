
import { Category } from "../types/categories";
import { categories } from "../data";

class CategoryServices {
  create(data: Category) {
    categories.push(data);
    return categories;
  }
  list() {
    return categories;
  }
  checkIfExist(id: number): void {
    const isAlreadyInData: boolean = categories.some((c) => c.id === id);
    if (isAlreadyInData) {
      throw new Error("Cette categories existe déjà!");
    }
  }
  find(id: number) {}
}

export default CategoryServices;
