import React from 'react';
import { bool, string } from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title = 'Header', isRenderProfile = false, isRenderSearch = false }) {
  return (
    <header>
      <h1 data-testid="page-title">{`Título da Página ${title}`}</h1>
      {isRenderProfile
        ? <img data-testid="profile-top-btn" src={ profileIcon } alt="profile icon" />
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
