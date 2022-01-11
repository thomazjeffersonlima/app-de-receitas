export const handleDetailsButtonText = (id, recipeType) => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const inProgressRecipes = JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  );

  if (!inProgressRecipes) {
    return 'Iniciar Receita';
  }

  if (
    inProgressRecipes[recipeType === 'comida' ? 'meals' : 'cocktails'][id]
    && !doneRecipes
  ) {
    return 'Continuar Receita';
  }

  if (
    inProgressRecipes[recipeType === 'comida' ? 'meals' : 'cocktails'][id]
    && !doneRecipes.some((recipe) => recipe.id === id)
  ) {
    return 'Continuar Receita';
  }

  return 'Iniciar Receita';
};

export const checkDoneRecipes = (id) => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  if (!doneRecipes) return 'initial';

  if (doneRecipes.some((recipe) => recipe.id === id)) return 'none';

  return 'initial';
};
