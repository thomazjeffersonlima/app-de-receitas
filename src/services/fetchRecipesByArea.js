export async function fetchAreas() {
  const areaUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

  const { meals } = await fetch(areaUrl).then((response) => response.json());
  return meals.map(({ strArea }) => strArea);
}

export async function fetchRecipesByArea(area) {
  const areaRecipesUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;

  const { meals } = await fetch(areaRecipesUrl).then((response) => response.json());
  return meals;
}
