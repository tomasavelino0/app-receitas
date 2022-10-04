import React, { useState } from 'react';
import { bool, string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/icone-perfil.png';
import searchIcon from '../images/Vector.png';
import '../styles/Header.css';
import recipeTitle from '../images/Recipes.png';
import appTitle from '../images/App.png';
import logo from '../images/iconeRecipes.png';
import iconePrato from '../images/icone-prato.png';
import iconeDrink from '../images/icone-bebida.png';
import iconeDoneRecipe from '../images/doneRecipes.png';
import iconeFavorito from '../images/icone-favorito.png';
import iconeProfile from '../images/Perfil.png';

function Header({ title = 'Header', isRenderProfile, isRenderSearch }) {
  const history = useHistory();
  const [isInputRender, setIsInputRender] = useState(true);

  const handleProfileClick = () => {
    history.push('/profile');
  };

  const handleSearchClick = () => {
    setIsInputRender((prevState) => !prevState);
  };

  return (
    <header>
      <div className="header-container">

        <div className="logo-icon">
          <img src={ logo } alt="logo" />
        </div>
        <h3 className="header-title">
          <img src={ recipeTitle } alt="recipeTitle" />
          <img src={ appTitle } alt="recipeTitle" />
        </h3>
        <div className="buttons-header">
          {isRenderSearch
        && (
          <button onClick={ handleSearchClick } type="button" className="button-search">
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="search icon"
            />
          </button>
        )}
          {!isInputRender && (
            <SearchBar />
          )}
          {isRenderProfile
        && (
          <button onClick={ handleProfileClick } type="button" className="icon-profile ">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profile icon"
            />
          </button>
        )}
        </div>
      </div>

      <div className="page-title">
        {title === 'Meals' && (
          <div>
            <img src={ iconePrato } alt="prato" />
            <h1 data-testid="page-title" className="page-title">{`${title}`}</h1>
          </div>) }
        {title === 'Drinks' && (
          <div>
            <img src={ iconeDrink } alt="drink" />
            <h1 data-testid="page-title" className="page-title">{`${title}`}</h1>
          </div>) }
        {title === 'DoneRecipes' && (
          <div>
            <img src={ iconeDoneRecipe } alt="drink" />
            <h1 data-testid="page-title" className="page-title">{`${title}`}</h1>
          </div>) }
        {title === 'FavoriteRecipes' && (
          <div>
            <img src={ iconeFavorito } alt="drink" />
            <h1 data-testid="page-title" className="page-title">{`${title}`}</h1>
          </div>) }
        {title === 'Profile' && (
          <div>
            <img src={ iconeProfile } alt="drink" />
            <h1 data-testid="page-title" className="page-title">{`${title}`}</h1>
          </div>) }
      </div>
    </header>
  );
}

Header.propTypes = {
  title: string.isRequired,
  isRenderProfile: bool.isRequired,
  isRenderSearch: bool.isRequired,
};

export default Header;
