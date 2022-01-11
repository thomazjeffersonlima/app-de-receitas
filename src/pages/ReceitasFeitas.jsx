import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipesDoneFilter from '../components/RecipesDoneFilter';
import shared from '../images/shareIcon.svg';

export default function ReceitasFeitas() {
  const [listObjectDoneRicipes, setListObjectDoneRicipes] = useState([]);
  const [objectoFilter, setObjectoFilter] = useState({
    filterAll: true,
    filterFood: false,
    filterDrink: false,
  });

  const handleShare = (id, type) => {
    const typeAddS = type.concat('s');
    const idConcat = `/${id}`;
    const typeConcat = `/${typeAddS}`;
    copy(window.location.origin + typeConcat + idConcat);
    global.alert('Link copiado!');
  };

  useEffect(() => {
    if (localStorage.getItem('doneRecipes') !== undefined) {
      setListObjectDoneRicipes(JSON.parse(localStorage.getItem('doneRecipes')));
    }
  }, []);

  const AllFunc = () => {
    if (listObjectDoneRicipes.length > 0) {
      return listObjectDoneRicipes.map(
        ({
          image,
          category,
          name,
          doneDate,
          tags,
          alcoholicOrNot,
          area,
          id,
          type,
        }, i) => (
          <div key={ i }>
            <Link to={ `/${type}s/${id}` }>
              <img src={ image } alt="" data-testid={ `${i}-horizontal-image` } />
            </Link>
            <div data-testid={ `${i}-horizontal-top-text` }>
              <p>{ `${area} - ${category}` }</p>
              {
                alcoholicOrNot !== '' && <p>{ alcoholicOrNot }</p>
              }
            </div>
            <h2 data-testid={ `${i}-horizontal-name` }>{ name }</h2>
            <p data-testid={ `${i}-horizontal-done-date` }>{ doneDate }</p>
            <input
              type="image"
              src={ shared }
              onClick={ () => handleShare(id, type) }
              data-testid={ `${i}-horizontal-share-btn` }
              alt="share-btn"
            />
            {
              (Array.isArray(tags) === true) && tags.map((tag) => (
                <p
                  key={ tag }
                  data-testid={ `${i}-${tag}-horizontal-tag` }
                >
                  { tag }
                </p>
              ))
            }
          </div>
        ),
      );
    }
  };

  const foodFilterFunc = () => {
    if (listObjectDoneRicipes.length > 0) {
      return listObjectDoneRicipes.filter(({ type }) => type === 'comida').map(({
        image,
        category,
        name,
        doneDate,
        tags,
        area,
        id,
        type,
      }, i) => (
        <div key={ i }>
          <Link to={ `/${type}s/${id}` }>
            <img src={ image } alt="" data-testid={ `${i}-horizontal-image` } />
          </Link>
          <div data-testid={ `${i}-horizontal-top-text` }>
            <p>{ `${area} - ${category}` }</p>
          </div>
          <h2 data-testid={ `${i}-horizontal-name` }>{ name }</h2>
          <p data-testid={ `${i}-horizontal-done-date` }>{ doneDate }</p>
          <input
            type="image"
            src={ shared }
            onClick={ () => handleShare(id, type) }
            data-testid={ `${i}-horizontal-share-btn` }
            alt="share-btn"
          />
          {
            (Array.isArray(tags) === true) && tags.map((tag) => (
              <p
                key={ tag }
                data-testid={ `${i}-${tag}-horizontal-tag` }
              >
                { tag }
              </p>
            ))
          }
        </div>
      ));
    }
  };

  const drinkFilterFunc = () => {
    if (listObjectDoneRicipes.length > 0) {
      return listObjectDoneRicipes.filter(({ type }) => type === 'bebida').map(({
        image,
        category,
        name,
        doneDate,
        tags,
        alcoholicOrNot,
        area,
        id,
        type,
      }, i) => (
        <div key={ i }>
          <Link to={ `/${type}s/${id}` }>
            <img src={ image } alt="" data-testid={ `${i}-horizontal-image` } />
          </Link>
          <div data-testid={ `${i}-horizontal-top-text` }>
            <p>{ `${area} - ${category}` }</p>
            {
              alcoholicOrNot !== '' && <p>{ alcoholicOrNot }</p>
            }
          </div>
          <h2 data-testid={ `${i}-horizontal-name` }>{ name }</h2>
          <p data-testid={ `${i}-horizontal-done-date` }>{ doneDate }</p>
          <input
            type="image"
            src={ shared }
            onClick={ () => handleShare(id, type) }
            data-testid={ `${i}-horizontal-share-btn` }
            alt="share-btn"
          />
          {
            (Array.isArray(tags) === true) && tags.map((tag) => (
              <li
                key={ tag }
                data-testid={ `${i}-${tag}-horizontal-tag` }
              >
                { tag }
              </li>
            ))
          }
        </div>
      ));
    }
  };

  const rootFunc = () => {
    if (objectoFilter.filterDrink === true) {
      return drinkFilterFunc();
    }
    if (objectoFilter.filterFood === true) {
      return foodFilterFunc();
    }
    if (objectoFilter.filterAll === true) {
      return AllFunc();
    }
  };

  return (
    <div>
      <RecipesDoneFilter setObjectoFilter={ setObjectoFilter } />
      {
        rootFunc()
      }
    </div>
  );
}
