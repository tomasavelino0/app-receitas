const USER = 'user';

const saveEmail = (email) => localStorage.setItem(USER, JSON.stringify(email));

const saveFavoriteRecipes = (favorite) => {
  if (JSON.parse(localStorage.getItem('favoriteRecipes'))) {
    const savedFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    localStorage.setItem('favoriteRecipes', JSON.stringify(
      [...savedFavoriteRecipes, favorite],
    ));
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([favorite]));
  }
};

const removeFavorite = (id) => {
  const savedFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const newFavoriteRecipes = savedFavoriteRecipes.filter((recipe) => recipe.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
};

// const readEmail = () => {
//   if (!JSON.parse(localStorage.getItem(EMAIL))) {
//     localStorage.setItem(EMAIL, JSON.stringify());
//   }
//   const email = JSON.parse(localStorage.getItem(EMAIL));
//   saveEmail(email);
// };

export {
  saveEmail,
  saveFavoriteRecipes,
  removeFavorite,
};
