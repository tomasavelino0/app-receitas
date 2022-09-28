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
        type="button"
        onClick={ drinksButton }
      >
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="" />
      </button>
      <button
        type="button"
        onClick={ mealButton }
      >
        <img data-testid="meals-bottom-btn" src={ mealIcon } alt="" />
      </button>
    </footer>
  );
}
