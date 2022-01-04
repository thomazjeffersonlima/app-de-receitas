export async function fetchFoodsIngredients() {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const ingredients = await fetch(url).then((response) => response.json());
  return ingredients.meals;
}

export async function fetchDrinksIngredients() {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const ingredients = await fetch(url).then((response) => response.json());
  return ingredients.drinks;
}
