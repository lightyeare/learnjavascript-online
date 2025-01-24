export { capitalize, calculateCalories };

function capitalize(word) {
  return word[0].toUpperCase() + word.substring(1);
}

function calculateCalories(carbs, protein, fat) {
  return carbs * 4 + protein * 4 + fat * 9;
}
