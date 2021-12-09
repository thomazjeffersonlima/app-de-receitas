export default async function fetchRecipies(type, endpoint) {
  if (type === 'Comidas') {
    const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/${endpoint}`)
      .then((results) => results.json());
    return meals;
  }
  if (type === 'Bebidas') {
    const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/${endpoint}`)
      .then((results) => results.json());
    return drinks;
  }
}
