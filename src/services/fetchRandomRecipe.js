export default async function fetchRandomRecipe(path) {
  const url = path === 'meals'
    ? 'https://www.themealdb.com/api/json/v1/1/random.php'
    : 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

  const randomRecipe = await fetch(url).then((response) => response.json());
  return randomRecipe[path][0];
}
