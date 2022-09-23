import React from 'react';
import { bool, string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title = 'Header', isRenderProfile = false, isRenderSearch = false }) {
  const history = useHistory();

  const handleClick = () => {
    history.push('/profile');
  };

  return (
    <header>
      <h1 data-testid="page-title">{`Título da Página ${title}`}</h1>
      {isRenderProfile
        ? (
          <button onClick={ handleClick } type="button">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profile icon"
            />
          </button>
        )
        : null}
      {isRenderSearch
        ? <img data-testid="search-top-btn" src={ searchIcon } alt="search icon" />
        : null}
    </header>
  );
}

Header.propTypes = {
  title: string.isRequired,
  isRenderProfile: bool.isRequired,
  isRenderSearch: bool.isRequired,
};

export default Header;
