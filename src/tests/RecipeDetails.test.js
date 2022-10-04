import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import fetchMock from '../../cypress/mocks/fetch';

const mealPage = '/meals/52977';

describe('Testes do  componente RecipeDetails', () => {
  test('testa ao clicar em alguma comida a pagina e redirecionada para os detalhes da comida', async () => {
    global.fetch = fetchMock;
    jest.spyOn(global, 'fetch');
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(4));
    const beefCategoryBtn = screen.getByTestId('Beef-category-filter');
    const itemMeal = screen.getByTestId('0-recipe-card');
    expect(itemMeal).toBeInTheDocument();
    expect(beefCategoryBtn).toBeInTheDocument();
    userEvent.click(itemMeal);
    expect(history.location.pathname).toBe(mealPage);
  });
  test('testa se o titulo e imagem foram renderizados', async () => {
    global.fetch = fetchMock;
    jest.spyOn(global, 'fetch');
    const { history } = renderWithRouter(<App />);
    history.push(mealPage);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(6));
    const recipeTitle = screen.getByTestId('recipe-title');
    const recipeImage = screen.getAllByRole('img', { name: /recipe/i })[0];

    expect(recipeTitle).toBeDefined();
    expect(recipeImage).toBeInTheDocument();
  });
  test('testa se os ingredientes sao renderizados', async () => {
    global.fetch = fetchMock;
    jest.spyOn(global, 'fetch');
    const { history } = renderWithRouter(<App />);
    history.push(mealPage);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(6));

    const ingredient0 = screen.getAllByRole('listitem');

    expect(ingredient0).toHaveLength(8);
  });
  test('testa seas intruçoes foram renderizadas', async () => {
    global.fetch = fetchMock;
    jest.spyOn(global, 'fetch');
    const { history } = renderWithRouter(<App />);
    history.push(mealPage);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(6));

    const recipeInstructions = screen.getByText(/Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste./i);
    expect(recipeInstructions).toBeDefined();
  });
  test('testa se o video foi renderizado', async () => {
    global.fetch = fetchMock;
    jest.spyOn(global, 'fetch');
    const { history } = renderWithRouter(<App />);
    history.push(mealPage);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(6));

    const recipeVideo = screen.getByTestId('video');
    expect(recipeVideo).toBeDefined();
    expect(recipeVideo).toHaveAttribute('src', 'https://www.youtube.com/embed/1IszT_guI08');
  });
  test('testa se o botao de start/continuar receita esta na tela', async () => {
    global.fetch = fetchMock;
    jest.spyOn(global, 'fetch');
    const { history } = renderWithRouter(<App />);
    history.push(mealPage);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(6));

    const recipeButtonStart = screen.getByRole('button', { name: /start recipe/i });
    expect(recipeButtonStart).toBeDefined();
  });
});
