import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import fetchMock from '../../cypress/mocks/fetch';

const FINISH_RECIPE_BTN = 'finish-recipe-btn';
const FAVORITE_RECIPE_BTN = 'favorite-btn';
const SHARE_BTN = 'share-btn';

describe('Testa o componente RecipeInProgress', () => {
  beforeEach(() => {
    global.fetch = fetchMock;
    jest.spyOn(global, 'fetch');
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Testa se os botões estão na tela do Meals', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals/52977/in-progress');
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    const btnFinish = screen.getByTestId(FINISH_RECIPE_BTN);
    const btnFavorite = screen.getByTestId(FAVORITE_RECIPE_BTN);
    const btnShare = screen.getByTestId(SHARE_BTN);

    expect(btnFinish).toBeInTheDocument();
    expect(btnFavorite).toBeInTheDocument();
    expect(btnShare).toBeInTheDocument();
  });
  it('Testa se os botões estão na tela do Drinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/15997/in-progress');
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(5));
    const btnFinish = screen.getByTestId(FINISH_RECIPE_BTN);
    const btnFavorite = screen.getByTestId(FAVORITE_RECIPE_BTN);
    const btnShare = screen.getByTestId(SHARE_BTN);

    expect(btnFinish).toBeInTheDocument();
    expect(btnFavorite).toBeInTheDocument();
    expect(btnShare).toBeInTheDocument();
  });
});
