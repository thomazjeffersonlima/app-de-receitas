export default async function fetchRecipes(type, category) {
  if (type === 'Comidas') {
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const { meals } = await fetch(URL)
      .then((response) => response.json()).catch(() => []);
    return meals;
  }
  if (type === 'Bebidas') {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    const { drinks } = await fetch(URL)
      .then((response) => response.json()).catch(() => []);
    return drinks;
  }
}
