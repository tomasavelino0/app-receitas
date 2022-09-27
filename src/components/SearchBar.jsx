import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchApiIngredient, fetchAPIFirstLetter,
  fetchAPIName } from '../services/fetchAPI';
import RecipesContext from '../context/RecipesContext';

function SearchBar() {
  const [formSearch, setFormSearch] = useState({
    searchByText: '',
    searchType: '',
  });

  const [resultsAPI, setResultsAPI] = useState({});

  const { setRecipes } = useContext(RecipesContext);

  const history = useHistory();

  const handleChange = ({ target: { value, name } }) => {
    setFormSearch({
      ...formSearch,
      [name]: value,
    });
  };

  useEffect(() => {
    if (resultsAPI.meals && Object.keys(resultsAPI.meals).length === 1) {
      return history.push(`/meals/${resultsAPI.meals[0].idMeal}`);
    }
    if (resultsAPI.drinks && Object.keys(resultsAPI.drinks).length === 1) {
      return history.push(`/drinks/${resultsAPI.drinks[0].idDrink}`);
    }
  }, [resultsAPI, history]);

  useEffect(() => {
    if (resultsAPI.meals) {
      setRecipes((prevState) => ({ ...prevState,
        meals: resultsAPI.meals }));
    }
    if (resultsAPI.drinks) {
      setRecipes((prevState) => ({ ...prevState,
        drinks: resultsAPI.drinks }));
    }
  }, [resultsAPI, setRecipes]);

  const { searchByText, searchType } = formSearch;

  const handleClick = async () => {
    if (resultsAPI.drinks === null || resultsAPI.meals === null) {
      console.log('oi');
      return global.alert('Sorry, we haven\'t found any recipes for these filters');
    }
    const title = document.querySelector('[data-testid="page-title"]').innerHTML;
    const verify = title.includes('Meals');
    const typeFood = verify ? 'meal' : 'cocktail';
    switch (searchType) {
    case 'Ingredient':
      return setResultsAPI(await fetchApiIngredient(searchByText, typeFood));
    case 'First letter':
      return setResultsAPI(await fetchAPIFirstLetter(searchByText, typeFood));
    case 'Name':
      return setResultsAPI(await fetchAPIName(searchByText, typeFood));
    default:
      break;
    }
  };

  return (
    <form>
      <input
        data-testid="search-input"
        type="text"
        onChange={ handleChange }
        name="searchByText"
        value={ formSearch.searchByText }
      />
      <label htmlFor="search-type">
        Ingredient
        <input
          data-testid="ingredient-search-radio"
          name="searchType"
          onChange={ handleChange }
          type="radio"
          value="Ingredient"
        />
      </label>
      <label htmlFor="search-type">
        Name
        <input
          data-testid="name-search-radio"
          name="searchType"
          onChange={ handleChange }
          type="radio"
          value="Name"
        />
      </label>
      <label htmlFor="search-type">
        First letter
        <input
          data-testid="first-letter-search-radio"
          name="searchType"
          onChange={ handleChange }
          type="radio"
          value="First letter"
        />
      </label>
      <button
        data-testid="exec-search-btn"
        onClick={ () => handleClick() }
        type="button"
      >
        Buscar

      </button>
    </form>
  );
}

export default SearchBar;
