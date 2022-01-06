import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Link, useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import fetchRecipeById from '../services/fetchRecipeById';
import fetchRecipes from '../services/fetchApi';
import FoodRecipeCard from '../components/FoodRecipeCard';
import DrinksRecipesCards from '../components/DrinksRecipesCards';
import '../styles/Details.css';
import IngredientsProgress from '../components/IngredientsProgress';

export default function Details({ inProgress }) {
  const { pathname } = useLocation();
  const id = pathname.replace(/\D/g, '');

  const [recipe, setRecipe] = useState({});
  const [recipeType, setRecipeType] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    async function getRecipe() {
      if (pathname.includes('comidas')) {
        const getDrinksRecomendations = await fetchRecipes(
          'Bebidas',
          'search.php?s=',
        );
        setRecommendations(getDrinksRecomendations);
        setRecipeType('comida');
        const { meals } = await fetchRecipeById('comida', id);
        setRecipe(meals[0]);
      } else {
        const getFoodRecomendations = await fetchRecipes(
          'Comidas',
          'search.php?s=',
        );
        setRecommendations(getFoodRecomendations);
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
    .filter((entrie) => entrie[0].includes('strMeasure') && entrie[1])
    .map((element) => element[1]);

  const handleShare = () => {
    const COPIED_MESSAGE = 4000;

    setIsCopied(true);
    setInterval(() => {
      setIsCopied(false);
    }, COPIED_MESSAGE);
    copy(window.location.href);
  };

  return (
    Object.keys(recipe).length > 0 && (
      <section className="details-wrapper">
        {isCopied && (
          <div className="copied-message">
            <p>Link copiado!</p>
          </div>
        )}
        <img
          src={
            recipeType === 'comida' ? recipe.strMealThumb : recipe.strDrinkThumb
          }
          alt="recipe thumb"
          data-testid="recipe-photo"
          className="details-img"
        />
        <h2 data-testid="recipe-title">
          {recipeType === 'comida' ? recipe.strMeal : recipe.strDrink}
        </h2>
        <p data-testid="recipe-category">
          {recipeType === 'comida' ? recipe.strCategory : recipe.strAlcoholic}
        </p>
        <input
          type="image"
          src={ shareIcon }
          alt="share icon"
          data-testid="share-btn"
          onClick={ handleShare }
        />
        <input
          type="image"
          src={ whiteHeart }
          alt="favorite icon"
          data-testid="favorite-btn"
        />
        <div>
          <p>Ingredientes</p>
          {inProgress ? (
            <IngredientsProgress
              ingredients={ ingredients }
              id={ id }
              recipeType={ recipeType }
            />
          ) : (
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
          )}
        </div>
        <p data-testid="instructions">{recipe.strInstructions}</p>
        {recipeType === 'comida' && (
          <ReactPlayer
            url={ recipe.strYoutube }
            controls
            data-testid="video"
            className="details-video"
          />
        )}
        {!inProgress && recipeType === 'comida' && (
          <ReactPlayer url={ recipe.strYoutube } controls data-testid="video" />
        )}
        {!inProgress && (
          <div className="recommentadions-wrapper">
            {recommendations.length > 0
              && (recipeType === 'comida' ? (
                <DrinksRecipesCards
                  recipes={ recommendations }
                  maxRecipes={ 6 }
                  testId="recomendation-card"
                  titleTestId="recomendation-title"
                />
              ) : (
                <FoodRecipeCard
                  recipes={ recommendations }
                  maxRecipes={ 6 }
                  testId="recomendation-card"
                  titleTestId="recomendation-title"
                />
              ))}
          </div>
        )}
        {inProgress ? (
          <Link to="/receitas-feitas">
            <button
              type="button"
              data-testid="finish-recipe-btn"
              className="details-begin-recipe"
              // disabled={ isRecipeInompleted() }
            >
              Finalizar receita
            </button>
          </Link>
        ) : (
          <Link to={ `${pathname}/in-progress` }>
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="details-begin-recipe"
            >
              Inicar Receita
            </button>
          </Link>
        )}
      </section>
    )
  );
}

Details.propTypes = {
  inProgress: PropTypes.bool,
};

Details.defaultProps = {
  inProgress: false,
};
