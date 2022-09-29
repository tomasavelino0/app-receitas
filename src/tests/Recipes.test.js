import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import fetchMock from '../../cypress/mocks/fetch';
import Meals from '../../cypress/mocks/meals';
import Drinks from '../../cypress/mocks/drinks';
import MealsCategory from '../../cypress/mocks/mealCategories';
import DrinksCategory from '../../cypress/mocks/drinkCategories';

const BEEF_CATEGORY_FILTER = 'Beef-category-filter';
const BREAKFAST_CATEGORY_FILTER = 'Breakfast-category-filter';
const CHICKEN_CATEGORY_FILTER = 'Chicken-category-filter';
const DESSERT_CATEGORY_FILTER = 'Dessert-category-filter';
const GOAT_CATEGORY_FILTER = 'Goat-category-filter';

const ORDINARY_DRINK_CATEGORY_FILTER = 'Ordinary-drink-category-filter';
const COCKTAIL_CATEGORY_FILTER = 'Cocktail-category-filter';
const SHAKE_CATEGORY_FILTER = 'Shake-category-filter';
const COCOA_CATEGORY_FILTER = 'Cocoa-category-filter';
const OTHER_UNKNOWN = 'Other-category-filter';
const ALL = 'All';

describe('Testa o componente Recipes', () => {
  beforeEach(() => {
    global.fetch = fetchMock('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    jest.spyOn(global, 'fetch');
  });
  it('Testa se os botões estão presentes na página de meals', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(4));
    const btnBeef = screen.getByTestId(BEEF_CATEGORY_FILTER);
    const btnBreakfast = screen.getByTestId(BREAKFAST_CATEGORY_FILTER);
    const btnChicken = screen.getByTestId(CHICKEN_CATEGORY_FILTER);
    const btnDessert = screen.getByTestId(DESSERT_CATEGORY_FILTER);
    const btnGoat = screen.getByTestId(GOAT_CATEGORY_FILTER);
    const btnAll = screen.getByText(ALL);

    expect(btnBeef).toBeInTheDocument();
    expect(btnBreakfast).toBeInTheDocument();
    expect(btnChicken).toBeInTheDocument();
    expect(btnDessert).toBeInTheDocument();
    expect(btnGoat).toBeInTheDocument();
    expect(btnAll).toBeInTheDocument();
  });
  // it('Testa se os botões estão presentes na página de drinks', () => {
  //   const { history } = renderWithRouter(<App />);
  //   history.push('/drinks');
  //   const btnOrdinary = screen.getByTestId(ORDINARY_DRINK_CATEGORY_FILTER);
  //   const btnCocktail = screen.getByTestId(COCKTAIL_CATEGORY_FILTER);
  //   const btnShake = screen.getByTestId(SHAKE_CATEGORY_FILTER);
  //   const btnCocoa = screen.getByTestId(COCOA_CATEGORY_FILTER);
  //   const btnAll = screen.getByText(ALL);
  //   const btnOther = screen.getByTestId(OTHER_UNKNOWN);

  //   expect(btnOrdinary).toBeInTheDocument();
  //   expect(btnCocktail).toBeInTheDocument();
  //   expect(btnShake).toBeInTheDocument();
  //   expect(btnCocoa).toBeInTheDocument();
  //   expect(btnAll).toBeInTheDocument();
  //   expect(btnOther).toBeInTheDocument();
  // });
  // it('Testa se ao clicar no botão Beef, 12 receitas com a palavra Beef são renderizadas', () => {
  //   const { history } = renderWithRouter(<App />);
  //   history.push('/meals');
  //   const btnBeef = screen.getByTestId(BEEF_CATEGORY_FILTER);

  //   userEvent.click(btnBeef);
  // });
  // it('Testa se ao clicar no botão Breakfast, 12 receitas com a palavra Beef são renderizadas', () => {
  //   const { history } = renderWithRouter(<App />);
  //   history.push('/meals');
  //   const btnBreakfast = screen.getByTestId(BREAKFAST_CATEGORY_FILTER);

  //   userEvent.click(btnBreakfast);
  // });
  // it('Testa se ao clicar no botão Chicken, 12 receitas com a palavra Beef são renderizadas', () => {
  //   const { history } = renderWithRouter(<App />);
  //   history.push('/meals');
  //   const btnChicken = screen.getByTestId(CHICKEN_CATEGORY_FILTER);

  //   userEvent.click(btnChicken);
  // });
  // it('Testa se ao clicar no botão Dessert, 12 receitas com a palavra Beef são renderizadas', () => {
  //   const { history } = renderWithRouter(<App />);
  //   history.push('/meals');
  //   const btnDessert = screen.getByTestId(DESSERT_CATEGORY_FILTER);

  //   userEvent.click(btnDessert);
  // });
  // it('Testa se ao clicar no botão Goat, 12 receitas com a palavra Beef são renderizadas', () => {
  //   const { history } = renderWithRouter(<App />);
  //   history.push('/meals');
  //   const btnGoat = screen.getByTestId(GOAT_CATEGORY_FILTER);

  //   userEvent.click(btnGoat);
  // });
  // it('Testa se ao clicar no botão All, 12 receitas com a palavra Beef são renderizadas', () => {
  //   const { history } = renderWithRouter(<App />);
  //   history.push('/meals');
  //   const btnAll = screen.getByText(ALL);

  //   userEvent.click(btnAll);
  // });
});
