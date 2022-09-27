import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

const PROFILE_DONE_BTN = 'profile-done-btn';
const PROFILE_FAVORITE_BTN = 'profile-favorite-btn';
const PROFILE_LOGOUT_BTN = 'profile-logout-btn';

const obj = { email: 'jubartoafonce@gmail.com' };
localStorage.setItem('user', JSON.stringify(obj));

describe('Teste do componente Profile', () => {
  it('Testa se as informações estão sendo renderizadas na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const doneBtn = screen.getByTestId(PROFILE_DONE_BTN);
    const favoriteBtn = screen.getByTestId(PROFILE_FAVORITE_BTN);
    const logoutBtn = screen.getByTestId(PROFILE_LOGOUT_BTN);
    const email = screen.getByText('jubartoafonce@gmail.com');
    expect(email).toBeInTheDocument();
    expect(doneBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });
  it('Testa o botão done recipes', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const doneBtn = screen.getByTestId(PROFILE_DONE_BTN);
    userEvent.click(doneBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  it('Testa o botão favorite recipes', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const favoriteBtn = screen.getByTestId(PROFILE_FAVORITE_BTN);
    userEvent.click(favoriteBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it('Testa o botão logout', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const logoutBtn = screen.getByTestId(PROFILE_LOGOUT_BTN);
    userEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
  });
});
