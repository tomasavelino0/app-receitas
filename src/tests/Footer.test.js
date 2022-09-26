import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import Footer from '../components/Footer';
import App from '../App';

describe('Testes do componente Footer', () => {
  test('testa se tudo esta renderizado no componente Footer', () => {
    render(<Footer />);
    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    const mealsButton = screen.getByTestId('meals-bottom-btn');
    const footer = screen.getByTestId('footer');

    expect(drinkButton).toBeInTheDocument();
    expect(mealsButton).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });
  test('verifica se os botão drinks funciona corretamente na pagina Profile', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    const footer = screen.getByTestId('footer');

    expect(footer).toBeInTheDocument();

    userEvent.click(drinkButton);
    expect(history.location.pathname).toBe('/drinks');
  });
  test('verifica se os botão meals funciona corretamente na pagina Profile', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const mealsButton = screen.getByTestId('meals-bottom-btn');
    const footer = screen.getByTestId('footer');

    expect(footer).toBeInTheDocument();

    userEvent.click(mealsButton);
    expect(history.location.pathname).toBe('/meals');
  });
});
