const fetchApiIngredient = async (ingrediente, food) => {
  try {
    const URL = `https://www.the${food}db.com/api/json/v1/1/filter.php?i=${ingrediente}`;
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchAPIName = async (name, food) => {
  try {
    const URL = `https://www.the${food}db.com/api/json/v1/1/search.php?s=${name}`;
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchAPIFirstLetter = async (firstLetter, food) => {
  if (firstLetter.length > 1) {
    return global.alert('Your search must have only 1 (one) character');
  }
  try {
    const URL = `https://www.the${food}db.com/api/json/v1/1/search.php?f=${firstLetter}`;
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchMeals = async () => {
  try {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(url);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.log(error);
  }
};

const fetchDrinks = async () => {
  try {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(url);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.log(error);
  }
};

const fetchMealsCategorys = async () => {
  try {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(url);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.log(error);
  }
};

const fetchDrinksCategory = async () => {
  try {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(url);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.log(error);
  }
};

const fetchCategory = async (category, food) => {
  try {
    const URL = `https://www.the${food}db.com/api/json/v1/1/filter.php?c=${category}`;
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export {
  fetchApiIngredient,
  fetchAPIName,
  fetchAPIFirstLetter,
  fetchMeals,
  fetchDrinks,
  fetchMealsCategorys,
  fetchDrinksCategory,
  fetchCategory,
};
