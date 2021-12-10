import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer data-testid="footer" className="footer-wrapper">
      <Link to="/bebidas">
        <input
          type="image"
          src={ drinkIcon }
          alt="drink icon"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/explorar">
        <input
          type="image"
          src={ exploreIcon }
          alt="explore icon"
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link to="/comidas">
        <input
          type="image"
          src={ mealIcon }
          alt="food icon"
          data-testid="food-bottom-btn"
        />
      </Link>
    </footer>
  );
}
