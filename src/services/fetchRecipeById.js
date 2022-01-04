export default async function fetchRecipeById(type, id) {
  const idFoodUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const idDrinkUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  const recipe = await fetch(type === 'comida' ? idFoodUrl : idDrinkUrl).then(
    (response) => response.json(),
  );
  return recipe;
}
