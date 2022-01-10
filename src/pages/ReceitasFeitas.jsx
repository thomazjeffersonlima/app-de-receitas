import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import RecipesDoneFilter from '../components/RecipesDoneFilter';
import shared from '../images/shareIcon.svg';

export default function ReceitasFeitas() {
  const [listObjectDoneRicipes, setListObjectDoneRicipes] = useState([]);

  const handleShare = (id, type) => {
    const typeAddS = type.concat('s');
    const idConcat = `/${id}`;
    const typeConcat = `/${typeAddS}`;
    copy(window.location.origin + typeConcat + idConcat);
    alert('Link copiado!');
  };

  useEffect(() => {
    if (localStorage.getItem('doneRecipes') !== undefined) {
      setListObjectDoneRicipes(JSON.parse(localStorage.getItem('doneRecipes')));
    }
  }, []);

  return (
    <div>
      <RecipesDoneFilter />
      {
        listObjectDoneRicipes.length > 0 && listObjectDoneRicipes.map(
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
              <img src={ image } alt="" data-testid={ `${i}-horizontal-image` } />
              <p data-testid={ `${i}-horizontal-top-text` }>{ category }</p>
              {
                area !== '' && <p>{ area }</p>
              }
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
                tags !== '' && tags.split(',').map((tag) => ((
                  <p
                    key={ tag }
                    data-testid={ `${i}-${tag}-horizontal-tag` }
                  >
                    { tag }
                  </p>
                )))
              }
            </div>
          ),
        )
      }
    </div>
  );
}
