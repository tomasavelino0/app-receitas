import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Login from '../pages/Login';
import renderWithRouter from '../services/renderWithRouter';

const idInputEmail = 'email-input';
const idPasswordInput = 'password-input';
const idBtnLogin = 'login-submit-btn';

describe('Testes do componente Login', () => {
  test('verifica se todos os campos sao renderizados', () => {
    render(<Login />);
    const emailInput = screen.getByTestId(idInputEmail);
    const passWordInput = screen.getByTestId(idPasswordInput);
    const btnSubmitLogin = screen.getByTestId(idBtnLogin);
    expect(emailInput).toBeInTheDocument();
    expect(passWordInput).toBeInTheDocument();
    expect(btnSubmitLogin).toBeInTheDocument();
  });
  test('verifica as verificacoes do botao de login', () => {
    const { history } = renderWithRouter(<Login />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const emailInput = screen.getByTestId(idInputEmail);
    const passWordInput = screen.getByTestId(idPasswordInput);
    const btnSubmitLogin = screen.getByTestId(idBtnLogin);
    expect(btnSubmitLogin).toBeDisabled();
    userEvent.type(emailInput, 'trybe@test.com');
    userEvent.type(passWordInput, '1234567');
    expect(btnSubmitLogin).toBeEnabled();
  });
  test('verifica se o botao de login redericiona para rota "/meals"', () => {
    const { history } = renderWithRouter(<Login />);
    const emailInput = screen.getByTestId(idInputEmail);
    const passWordInput = screen.getByTestId(idPasswordInput);
    const btnSubmitLogin = screen.getByTestId(idBtnLogin);
    userEvent.type(emailInput, 'trybe@test.com');
    userEvent.type(passWordInput, '1234567');
    expect(btnSubmitLogin).toBeEnabled();
    userEvent.click(btnSubmitLogin);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
