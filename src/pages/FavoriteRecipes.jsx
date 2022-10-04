import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const [filterBy, setFilterBy] = useState('');
  const [allFilter, setAllFIlter] = useState(true);
  const [clipBoard, setClipBoard] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      const favoritesLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavorites(favoritesLocalStorage);
    }
  }, []);

  const handleClick = ({ target }) => {
    const { name } = target;
    setAllFIlter(false);
    if (name === 'all') {
      setAllFIlter(true);
    } else {
      setFilterBy(name);
    }
  };

  const removeFavorites = (id) => {
    setFavorites(favorites.filter((favorite) => favorite.id !== id));
    const storageFavorites = localStorage.getItem('favoriteRecipes');
    const filteredFavorites = JSON.parse(storageFavorites)
      .filter((favorite) => favorite.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredFavorites));
  };

  return (
    <div>
      <div className="header-conteiner">
        <Header isRenderSearch={ false } isRenderProfile title="Favorite Recipes" />
      </div>
      <section className="filters-favorite">
        <button
          onClick={ handleClick }
          type="button"
          data-testid="filter-by-all-btn"
          name="all"
        >
          All
        </button>
        <button
          onClick={ handleClick }
          type="button"
          data-testid="filter-by-meal-btn"
          name="meal"
        >
          Meals
        </button>
        <button
          onClick={ handleClick }
          type="button"
          data-testid="filter-by-drink-btn"
          name="drinks"
        >
          Drinks
        </button>
      </section>
      <main className="recipes-favorites">
        {favorites.filter(({ type }) => allFilter || type === filterBy)
          .map((favorite, index) => (
            <div
              key={ favorite.id }
            >
              <div>
                <Link
                  to={ { pathname: `/${favorite.type}s/${favorite.id}` } }
                >
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    alt={ favorite.name }
                    src={ favorite.image }
                    width="15%"
                  />
                </Link>
              </div>
              <div>
                <div>
                  <Link
                    to={ { pathname: `/${favorite.type}s/${favorite.id}` } }
                  >
                    <h5 data-testid={ `${index}-horizontal-name` }>{favorite.name}</h5>
                  </Link>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {favorite.type === 'meal'
                      ? `${favorite.nationality} - ${favorite.category}`
                      : favorite.alcoholicOrNot}
                  </p>
                </div>
                <div>
                  <input
                    onClick={ () => {
                      copy(`http://localhost:3000/${favorite.type}s/${favorite.id}`);
                      setClipBoard(true);
                    } }
                    data-testid={ `${index}-horizontal-share-btn` }
                    type="image"
                    src={ shareIcon }
                    alt="clip-board button"
                  />
                  {clipBoard && <p>Link copied!</p>}
                  <input
                    onClick={ () => removeFavorites(favorite.id) }
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    type="image"
                    src={ blackHeartIcon }
                    alt="Favorite button"
                  />
                </div>

              </div>
            </div>
          ))}
      </main>

    </div>

  );
}

export default FavoriteRecipes;
