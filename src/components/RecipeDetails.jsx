import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchApiFood, fetchApiDrink,
  fetchMeals, fetchDrinks } from '../services/fetchAPI';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { saveFavoriteRecipes, removeFavorite } from '../services/localStorage';

const copy = require('clipboard-copy');

export default function RecipeDetails() {
  const [returnFetch, setReturnFetch] = useState({});
  const [returnRecomendationFetch, setRecomendationFetch] = useState({});
  const [loading, setLoading] = useState(true);
  const [sharetext, setSharetext] = useState('');
  const [favorite, setFavorite] = useState(false); const location = useLocation();
  const typeFood = location.pathname.split('/')[1];
  const { id } = useParams();
  const MN = -9; const MN2 = -21; const magicNumber = 6;

  const shareClick = () => {
    copy(`http://localhost:3000/${typeFood}/${id}`);
    setSharetext('Link copied!');
  };

  const handleFavorite = () => {
    let favorites;
    let newFetch;
    if (typeFood === 'meals') {
      newFetch = returnFetch.meals;
      if (favorite === true) {
        removeFavorite(id); setFavorite(false);
      } else {
        favorites = {
          id: newFetch[0].idMeal,
          type: 'meal',
          nationality: newFetch[0].strArea,
          category: newFetch[0].strCategory,
          alcoholicOrNot: '',
          name: newFetch[0].strMeal,
          image: newFetch[0].strMealThumb,
        };
        setFavorite(true); saveFavoriteRecipes(favorites);
      }
    } else if (favorite === true) {
      removeFavorite(id); setFavorite(false);
    } else {
      newFetch = returnFetch.drinks;
      favorites = {
        id: newFetch[0].idDrink,
        type: 'drink',
        nationality: '',
        category: newFetch[0].strCategory,
        alcoholicOrNot: newFetch[0].strAlcoholic,
        name: newFetch[0].strDrink,
        image: newFetch[0].strDrinkThumb,
      };
      saveFavoriteRecipes(favorites); setFavorite(true);
    }
  };

  useEffect(() => {
    try {
      const detailsFetch = async () => {
        const returnFetchApi = typeFood === 'meals'
          ? await fetchApiFood(id) : await fetchApiDrink(id);
        setReturnFetch(returnFetchApi);
        const returnRecomendationFetchApi = typeFood === 'meals'
          ? await fetchDrinks() : await fetchMeals();
        setRecomendationFetch(returnRecomendationFetchApi.slice(0, magicNumber));
      };
      detailsFetch();
    } catch (error) {
      console.log(error);
    }
  }, [typeFood, id]);

  useEffect(() => {
    if (Object.keys(returnFetch).length > 0
    && Object.keys(returnRecomendationFetch).length > 0) {
      setLoading(false);
    }
  }, [returnFetch, returnRecomendationFetch]);

  useEffect(() => {
    const favoriteLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteLocalStorage) {
      const favoriteFilter = favoriteLocalStorage.filter((item) => item.id === id);
      if (favoriteFilter.length > 0) {
        setFavorite(true);
      }
    }
  }, [id]);

  return (
    <div>
      { !loading && (
        <div>
          <h1>Recipe Details</h1>
          <h2 data-testid="recipe-title">
            {typeFood === 'meals' ? returnFetch.meals[0].strMeal
              : returnFetch.drinks[0].strDrink}
          </h2>
          <img
            data-testid="recipe-photo"
            src={ typeFood === 'meals' ? returnFetch.meals[0].strMealThumb
              : returnFetch.drinks[0].strDrinkThumb }
            alt="recipe"
            width="140px"
          />
          <h3 data-testid="recipe-category">
            {typeFood === 'meals' ? returnFetch.meals[0].strCategory
              : returnFetch.drinks[0].strAlcoholic}
          </h3>
          <h3>Ingredients</h3>
          <ul>
            {typeFood === 'meals'
              ? Object.entries(returnFetch.meals[0]).map((ingredient, index) => {
                if (ingredient[0].includes('strIngredient') && ingredient[1] !== ''
                && ingredient[1] !== null) {
                  return (
                    <li
                      data-testid={ `${index + MN}-ingredient-name-and-measure` }
                      key={ index + MN }
                    >
                      {ingredient[1]}
                      {` - ${returnFetch.meals[0][`strMeasure${ingredient[0]
                        .split('strIngredient')[1]}`]}`}
                    </li>
                  );
                }
                return null;
              })
              : Object.entries(returnFetch.drinks[0]).map((ingredient, index) => {
                if (ingredient[0].includes('strIngredient') && ingredient[1] !== ''
                && ingredient[1] !== null) {
                  return (
                    <li
                      data-testid={ `${index + MN2}-ingredient-name-and-measure` }
                      key={ index + MN2 }
                    >
                      {ingredient[1]}
                      {` - ${returnFetch.drinks[0][`strMeasure${ingredient[0]
                        .split('strIngredient')[1]}`]}`}
                    </li>
                  );
                }
                return null;
              })}
          </ul>
          <h3>Instructions</h3>
          <p data-testid="instructions">
            {
              typeFood === 'meals'
                ? returnFetch.meals[0].strInstructions
                : returnFetch.drinks[0].strInstructions
            }
          </p>
          { typeFood === 'meals'
          && <iframe
            data-testid="video"
            src={ returnFetch.meals[0].strYoutube.replace('watch?v=', 'embed/') }
            title="video"
            width="420"
            height="315"
          />}
          <h3>Recomendations</h3>
          <div className="carrosel-scroll">
            {typeFood === 'meals'
              ? returnRecomendationFetch.map((drink, index) => (
                <div
                  key={ index }
                  data-testid={ `${index}-recommendation-card` }
                >
                  <img
                    src={ drink.strDrinkThumb }
                    alt="recipe"
                    width="140px"
                  />
                  <p
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {drink.strDrink}
                  </p>
                </div>
              ))
              : returnRecomendationFetch.map((meal, index) => (
                <div
                  data-testid={ `${index}-recommendation-card` }
                  key={ index }
                >
                  <img
                    src={ meal.strMealThumb }
                    alt="recipe"
                    width="140px"
                  />
                  <p
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {meal.strMeal}
                  </p>
                </div>
              ))}
          </div>
          <div className="container-btn-footer">
            <button
              data-testid="start-recipe-btn"
              type="button"
              className="buttonStartRecipe"
              onClick={ () => {
                window.location.href = `/${typeFood}/${window.location.pathname
                  .split('/')[2]}/in-progress`;
              } }
            >
              Start Recipe
            </button>
          </div>
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ () => { handleFavorite(); } }
          >
            <img
              src={ favorite ? blackHeartIcon : whiteHeartIcon }
              alt="ShareIcon"
            />
          </button>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ shareClick }
          >
            <img
              src={ shareIcon }
              alt="ShareIcon"
            />
          </button>
          {sharetext && <p>Link copiado!</p>}
        </div>
      ) }
    </div>
  );
}
