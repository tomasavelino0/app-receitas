import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const userEmail = JSON.parse(localStorage.getItem('user'));

  const history = useHistory();

  return (
    <section>
      <Header isRenderSearch={ false } isRenderProfile title="Profile" />
      <section>
        <h3 data-testid="profile-email">{userEmail.email}</h3>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          Logout
        </button>
      </section>
      <Footer />
    </section>
  );
}

export default Profile;
