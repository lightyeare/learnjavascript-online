import { calculateCalories } from "./helpers.js";

export default class FoodData {
  constructor() {
    this.food = [];
  }

  addFood(carbs, protein, fat) {
    this.food.push({
      carbs: Number.parseInt(carbs, 10),
      protein: Number.parseInt(protein, 10),
      fat: Number.parseInt(fat, 10),
    });
  }

  getTotalMacro(macro) {
    return this.food.reduce((total, current) => {
      return total + current[macro];
    }, 0);
  }

  getTotalCalories() {
    return calculateCalories(
      this.getTotalMacro("carbs"),
      this.getTotalMacro("protein"),
      this.getTotalMacro("fat")
    );
  }
}
