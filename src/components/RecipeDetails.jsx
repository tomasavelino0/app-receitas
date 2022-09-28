import React, { useState, useEffect } from 'react';
import { fetchApiFood, fetchApiDrink,
  fetchMeals, fetchDrinks } from '../services/fetchAPI';

export default function RecipeDetails() {
  const [returnFetch, setReturnFetch] = useState({});
  const [returnRecomendationFetch, setRecomendationFetch] = useState({});
  const [loading, setLoading] = useState(true);
  const typeFood = window.location.pathname.split('/')[1];
  const MN = -9;
  const MN2 = -21;
  const magicNumber = 6;

  useEffect(() => {
    const detailsFetch = async () => {
      const id = window.location.pathname.split('/')[2];
      const returnFetchApi = typeFood === 'meals'
        ? await fetchApiFood(id)
        : await fetchApiDrink(id);
      setReturnFetch(returnFetchApi);
      const returnRecomendationFetchApi = typeFood === 'meals'
        ? await fetchDrinks()
        : await fetchMeals();
      setRecomendationFetch(returnRecomendationFetchApi.slice(0, magicNumber));
    };
    detailsFetch();
  }, [typeFood]);

  useEffect(() => {
    if (Object.keys(returnFetch).length > 0
    && Object.keys(returnRecomendationFetch).length > 0) {
      setLoading(false);
    }
  }, [returnFetch, returnRecomendationFetch]);

  return (
    <div>
      { !loading && (
        <div>
          {console.log(returnRecomendationFetch)}
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
          <div id="carrosel-scroll">
            {typeFood === 'meals'
              ? returnRecomendationFetch.map((drink, index) => (
                <div
                  data-testid={ `${index}-recomendation-card` }
                  key={ index }
                >
                  <img
                    src={ drink.strDrinkThumb }
                    alt="recipe"
                    width="140px"
                  />
                  <p
                    data-testid={ `${drink.strGlass}-recomendation-title` }
                  >
                    {drink.strGlass}
                  </p>
                </div>
              ))
              : returnRecomendationFetch.map((meal, index) => (
                <div
                  data-testid={ `${index}-recomendation-card` }
                  key={ index }
                >
                  <img
                    src={ meal.strMealThumb }
                    alt="recipe"
                    width="140px"
                  />
                  <p
                    data-testid={ `${meal.strMeal}-recomendation-title` }
                  >
                    {meal.strMeal}
                  </p>
                </div>
              ))}
          </div>
        </div>
      ) }
    </div>
  );
}
