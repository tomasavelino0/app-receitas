import React, { useState } from 'react';
import { fetchApiIngredient, fetchAPIFirstLetter,
  fetchAPIName } from '../services/fetchAPI';

function SearchBar() {
  const [formSearch, setFormSearch] = useState({
    searchByText: '',
    searchType: '',
  });

  const handleChange = ({ target: { value, name } }) => {
    setFormSearch({
      ...formSearch,
      [name]: value,
    });
  };

  const { searchByText, searchType } = formSearch;

  const handleClick = async () => {
    let typeFood;
    const title = document.querySelector('[data-testid="page-title"]').innerHTML;
    const verify = title.includes('Meals');
    if (verify) {
      typeFood = 'meal';
    } else {
      typeFood = 'cocktail';
    }
    switch (searchType) {
    case 'Ingredient':
      await fetchApiIngredient(searchByText, typeFood);
      break;
    case 'First letter':
      await fetchAPIFirstLetter(searchByText, typeFood);
      break;
    case 'Name':
      await fetchAPIName(searchByText, typeFood);
      break;
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
        onClick={ handleClick }
        type="button"
      >
        Buscar

      </button>
    </form>
  );
}

export default SearchBar;
