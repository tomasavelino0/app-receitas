import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Login from '../pages/Login';
import renderWithRouter from '../services/renderWithRouter';

describe('Testes do componente Login', () => {
  test('verifica se todos os campos sao renderizados', () => {
    render(<Login />);
    const emailInput = screen.getByTestId('email-input');
    const passWordInput = screen.getByTestId('password-input');
    const btnSubmitLogin = screen.getByTestId('login-submit-btn');
    expect(emailInput).toBeInTheDocument();
    expect(passWordInput).toBeInTheDocument();
    expect(btnSubmitLogin).toBeInTheDocument();
  });
  test('verifica as verificacoes do botao de login', () => {
    const { history } = renderWithRouter(<Login />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const emailInput = screen.getByTestId('email-input');
    const passWordInput = screen.getByTestId('password-input');
    const btnSubmitLogin = screen.getByTestId('login-submit-btn');
    expect(btnSubmitLogin).toBeDisabled();
    userEvent.type(emailInput, 'trybe@test.com');
    userEvent.type(passWordInput, '1234567');
    expect(btnSubmitLogin).toBeEnabled();
  });
});
