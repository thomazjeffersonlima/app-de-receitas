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
      } else {
        setRecipeType('bebida');
        const { drinks } = await fetchRecipeById('bebida', id);
        setRecipe(drinks[0]);
      }
    }
    getRecipe();
  }, [id, pathname]);

  return (
    <section>
      <img src="" alt="" data-testid="recipe-photo" />
      <h2 data-testid="recipe-title" />
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
      <p data-testid="recipe-category" />
      <div>
        <p>Ingredientes</p>
      </div>
      <p data-testid="instructions" />
      <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" controls data-testid="video" />
      <button data-testid="start-recipe-btn">Inicar Receita</button>
    </section>
  );
}
