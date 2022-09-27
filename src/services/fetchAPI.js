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

export {
  fetchApiIngredient,
  fetchAPIName,
  fetchAPIFirstLetter,
};
