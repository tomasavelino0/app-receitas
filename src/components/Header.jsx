import React, { useState } from 'react';
import { bool, string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

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
      <h1 data-testid="page-title">{`Título da Página ${title}`}</h1>
      {isRenderProfile
        && (
          <button onClick={ handleProfileClick } type="button">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profile icon"
            />
          </button>
        )}
      {isRenderSearch
        && (
          <button onClick={ handleSearchClick } type="button">
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
    </header>
  );
}

Header.propTypes = {
  title: string.isRequired,
  isRenderProfile: bool.isRequired,
  isRenderSearch: bool.isRequired,
};

export default Header;
