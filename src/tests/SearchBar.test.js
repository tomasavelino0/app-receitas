import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testes do componente SearchBar', () => {
  it('Testa se os componentes são renderizados na tela', () => {
    renderWithRouter(<App />);
    const inputText = screen.getByTestId('search-input');
    expect(inputText).toBeInTheDocument();
  });
});
