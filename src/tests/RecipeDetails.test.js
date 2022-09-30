import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import fetchMock from '../../cypress/mocks/fetch';

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
    expect(history.location.pathname).toBe('/meals/52977');
  });
});
