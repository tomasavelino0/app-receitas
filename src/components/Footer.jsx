import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();

  const drinksButton = () => {
    history.push('/drinks');
  };

  const mealButton = () => {
    history.push('/meals');
  };
  return (
    <footer data-testid="footer">
      <button
        data-testid="drinks-bottom-btn"
        type="button"
        onClick={ drinksButton }
        src={ drinkIcon }
      >
        <img src={ drinkIcon } alt="" />
      </button>
      <button
        data-testid="meals-bottom-btn"
        type="button"
        onClick={ mealButton }
        src={ mealIcon }
      >
        <img src={ mealIcon } alt="" />
      </button>
    </footer>
  );
}
