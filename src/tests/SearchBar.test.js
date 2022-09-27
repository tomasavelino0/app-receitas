import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import beefMeals from '../../cypress/mocks/beefMeals';
import ginDrinks from '../../cypress/mocks/ginDrinks';
import Aquamarine from '../../cypress/mocks/oneDrink';
import SpicyArrabiataPenne from '../../cypress/mocks/oneMeal';
import firstLetterMeal from './mocks/firstLetterMeal';

const SEARCH_TOP_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';

describe('Testes do componente SearchBar', () => {
  // beforeEach(() => {
  //   global.fetch = jest.fn().mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(beefMeals),
  //   });
  // });
  it('Testa se os componentes são renderizados na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const title = screen.getByTestId('page-title');
    expect(title).toHaveTextContent('Meals');
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);

    userEvent.click(searchBtn);
    const inputText = screen.getByRole('textbox');
    const ingredientRadio = screen.getByLabelText('Ingredient');
    const nameRadio = screen.getByLabelText('Name');
    const firstLetterRadio = screen.getByLabelText('First letter');
    const btn = screen.getByRole('button', { name: 'Buscar' });

    expect(inputText).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });

  it('Testa se o campo de busca do meals está funcionando ', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(beefMeals),
    });

    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchBtn);
    const inputMeals = screen.getByTestId(SEARCH_INPUT);
    const ingredientRadio = screen.getByLabelText('Ingredient');
    const btn = screen.getByRole('button', { name: 'Buscar' });

    userEvent.type(inputMeals, 'Beef');
    userEvent.click(ingredientRadio);
    userEvent.click(btn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    const title = screen.getAllByRole('heading', { level: 2 });
    expect(title).toHaveLength(12);
  });

  it('Testa se o campo de busca do drinks está funcionando ', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(ginDrinks),
    });

    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchBtn);
    const inputMeals = screen.getByTestId(SEARCH_INPUT);
    const nameRadio = screen.getByLabelText('Name');
    const btn = screen.getByRole('button', { name: 'Buscar' });

    userEvent.type(inputMeals, 'Gin');
    userEvent.click(nameRadio);
    userEvent.click(btn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    const title = screen.getAllByRole('heading', { level: 2 });
    expect(title).toHaveLength(12);
  });

  it('Testa o redirecionamento caso a API retorne apenas uma bebida ', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(Aquamarine),
    });

    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchBtn);
    const inputDrinks = screen.getByTestId(SEARCH_INPUT);
    const nameRadio = screen.getByLabelText('Name');
    const btn = screen.getByRole('button', { name: 'Buscar' });

    userEvent.type(inputDrinks, 'Aquamarine');
    userEvent.click(nameRadio);
    userEvent.click(btn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(history.location.pathname).toBe('/drinks/178319');
  });

  it('Testa o redirecionamento caso a API retorne apenas uma comida ', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(SpicyArrabiataPenne),
    });

    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchBtn);
    const inputMeals = screen.getByTestId(SEARCH_INPUT);
    const nameRadio = screen.getByLabelText('Name');
    const btn = screen.getByRole('button', { name: 'Buscar' });

    userEvent.type(inputMeals, 'Spicy Arrabiata Penne');
    userEvent.click(nameRadio);
    userEvent.click(btn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(history.location.pathname).toBe('/meals/52771');
  });

  it('Testa se a página retorna um aviso quando nenhuma receita é encontrada', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ drinks: null }),
    });

    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchBtn);
    const inputDrinks = screen.getByTestId(SEARCH_INPUT);
    const nameRadio = screen.getByLabelText('Name');
    const btn = screen.getByRole('button', { name: 'Buscar' });

    userEvent.type(inputDrinks, 'Arrabiata12');
    userEvent.click(nameRadio);
    userEvent.click(btn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(alertMock).toHaveBeenCalledTimes(1);
  });

  it('Testa se ao digitar apenas uma letra a busca na API é realizada', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(firstLetterMeal),
    });

    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchBtn);
    const inputMeals = screen.getByTestId(SEARCH_INPUT);
    const firstLetterRadio = screen.getByLabelText('First letter');
    const btn = screen.getByRole('button', { name: 'Buscar' });

    userEvent.type(inputMeals, 'a');
    userEvent.click(firstLetterRadio);
    userEvent.click(btn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  });

  it('Testa o break', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(firstLetterMeal),
    });

    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchBtn);
    const inputMeals = screen.getByTestId(SEARCH_INPUT);
    const btn = screen.getByRole('button', { name: 'Buscar' });

    userEvent.type(inputMeals, 'a');
    userEvent.click(btn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(0));
  });
});
