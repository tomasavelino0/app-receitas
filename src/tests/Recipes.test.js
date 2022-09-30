import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import fetchMock from '../../cypress/mocks/fetch';

const BEEF_CATEGORY_FILTER = 'Beef-category-filter';
const BREAKFAST_CATEGORY_FILTER = 'Breakfast-category-filter';
const CHICKEN_CATEGORY_FILTER = 'Chicken-category-filter';
const DESSERT_CATEGORY_FILTER = 'Dessert-category-filter';
const GOAT_CATEGORY_FILTER = 'Goat-category-filter';

const ORDINARY_DRINK_CATEGORY_FILTER = 'Ordinary Drink-category-filter';
const COCKTAIL_CATEGORY_FILTER = 'Cocktail-category-filter';
const SHAKE_CATEGORY_FILTER = 'Shake-category-filter';
const COCOA_CATEGORY_FILTER = 'Cocoa-category-filter';
const OTHER_UNKNOWN = 'Other/Unknown-category-filter';
const ALL = 'All';

describe('Testa o componente Recipes', () => {
  beforeEach(() => {
    global.fetch = fetchMock;
    jest.spyOn(global, 'fetch');
  });

  afterEach(() => {
    jest.clearAllMocks();
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
  it('Testa se os botões estão presentes na página de drinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(4));
    const btnOrdinary = screen.getByTestId(ORDINARY_DRINK_CATEGORY_FILTER);
    const btnCocktail = screen.getByTestId(COCKTAIL_CATEGORY_FILTER);
    const btnShake = screen.getByTestId(SHAKE_CATEGORY_FILTER);
    const btnCocoa = screen.getByTestId(COCOA_CATEGORY_FILTER);
    const btnAll = screen.getByText(ALL);
    const btnOther = screen.getByTestId(OTHER_UNKNOWN);

    expect(btnOrdinary).toBeInTheDocument();
    expect(btnCocktail).toBeInTheDocument();
    expect(btnShake).toBeInTheDocument();
    expect(btnCocoa).toBeInTheDocument();
    expect(btnAll).toBeInTheDocument();
    expect(btnOther).toBeInTheDocument();
  });
  it('Testa se renderiza 12 receitas de comida ao iniciar a pagina', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(4));
    const cardsFood = document.getElementsByClassName('meals-card');
    expect(cardsFood).toHaveLength(12);
  });
  it('test se renderiza 12 drinks ao iniciar a pagina', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(4));
    const cardsDrink = document.getElementsByClassName('card-drink');
    expect(cardsDrink).toHaveLength(12);
  });
  it('testa o botao all se renderiza 12 receitas apos ser clicado', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(4));
    const btnAll = screen.getByTestId('All-category-filter');
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);
    const cardsRenderAll = document.getElementsByClassName('meals-card');
    expect(cardsRenderAll).toHaveLength(12);
  });
  it('testa se ao clicar em um Meal a pagina e redirecionada para o Id da Meal', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(4));
    const btnMealRedirect = screen.getByTestId('0-recipe-card');
    userEvent.click(btnMealRedirect);
    expect(history.location.pathname).toBe('/meals/52977');
  });
  it('Testa se ao clicar no botão Breakfast, 12 receitas com a palavra Beef são renderizadas', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(4));
    const drinkItem = screen.getByTestId('0-recipe-card');
    userEvent.click(drinkItem);
    expect(history.location.pathname).toBe('/drinks/15997');
  });
});
