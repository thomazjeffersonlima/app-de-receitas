export default async function fetchRecipies(type, endpoint) {
  if (type === 'Comidas') {
    const foodApi = await fetch(`https://www.themealdb.com/api/json/v1/1/${endpoint}`).then((results) => results.json());
    return foodApi.meals;
  }
}
