import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import fetchRecipeById from '../services/fetchRecipeById';

export default function Details() {
  const { pathname } = useLocation();
  const id = pathname.replace(/\D/g, '');

  const [recipe, setRecipe] = useState({});
  const [recipeType, setRecipeType] = useState('');

  useEffect(() => {
    async function getRecipe() {
      if (pathname.includes('comidas')) {
        setRecipeType('comida');
        const { meals } = await fetchRecipeById('comida', id);
        setRecipe(meals[0]);
        console.log(meals[0]);
      } else {
        setRecipeType('bebida');
        const { drinks } = await fetchRecipeById('bebida', id);
        setRecipe(drinks[0]);
      }
    }
    getRecipe();
  }, [id, pathname]);

  const ingredients = Object.entries(recipe)
    .filter((entrie) => entrie[0].includes('strIngredient') && entrie[1])
    .map((element) => element[1]);
  const measure = Object.entries(recipe)
    .filter(
      (entrie) => entrie[0].includes('strMeasure') && entrie[1],
    )
    .map((element) => element[1]);

  return (
    Object.keys(recipe).length > 0 && (
      <section>
        <img
          src={
            recipeType === 'comida' ? recipe.strMealThumb : recipe.strDrinkThumb
          }
          alt="recipe thumb"
          data-testid="recipe-photo"
        />
        <h2 data-testid="recipe-title">
          {recipeType === 'comida' ? recipe.strMeal : recipe.strDrink}
        </h2>
        <p data-testid="recipe-category">{recipe.strCategory}</p>
        <input
          type="image"
          src={ shareIcon }
          alt="share icon"
          data-testid="share-btn"
        />
        <input
          type="image"
          src={ whiteHeart }
          alt="favorite icon"
          data-testid="favorite-btn"
        />
        <div>
          <p>Ingredientes</p>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li
                key={ ingredient }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${ingredient} - ${measure[index]}`}
              </li>
            ))}
          </ul>
        </div>
        <p data-testid="instructions">{recipe.strIntructions}</p>
        {recipeType === 'comida' && (
          <ReactPlayer url={ recipe.strYoutube } controls data-testid="video" />
        )}
        <button type="button" data-testid="start-recipe-btn">
          Inicar Receita
        </button>
      </section>
    )
  );
}
