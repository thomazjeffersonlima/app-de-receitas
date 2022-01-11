import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import RecipesDoneFilter from '../components/RecipesDoneFilter';
import shared from '../images/shareIcon.svg';

export default function ReceitasFeitas({ history }) {
  const [listObjectDoneRicipes, setListObjectDoneRicipes] = useState([]);
  const [filtro, setFiltro] = useState('');

  const handleRedirect = (id, type) => {
    history.push(`/${type}s/${id}`);
  };

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

  const renderRecipesDone = () => {
    if (listObjectDoneRicipes.length > 0) {
      return listObjectDoneRicipes.filter(({ type }) => type.includes(filtro))
        .map(({
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
            <input
              type="image"
              alt={ name }
              onClick={ () => handleRedirect(id, type) }
              src={ image }
              data-testid={ `${i}-horizontal-image` }
            />
            <div data-testid={ `${i}-horizontal-top-text` }>
              <p>{ `${area} - ${category}` }</p>
              {
                alcoholicOrNot !== '' && <p>{ alcoholicOrNot }</p>
              }
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
          </div>
        ));
    }
  };

  return (
    <div>
      <RecipesDoneFilter setFiltro={ setFiltro } />
      {
        renderRecipesDone()
      }
    </div>
  );
}

ReceitasFeitas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
