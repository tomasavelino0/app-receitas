import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import renderWithRouter from '../services/renderWithRouter';
import Login from '../pages/Login';

describe('Testes do componente Header', () => {
  it('Testa se os componentes são renderizados na tela', () => {
    render(<Header title="Meals" isRenderProfile isRenderSearch />);
    const title = screen.getByRole('heading', { name: /meals/i, level: 1 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Meals');
    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();
    const searchIcon = screen.getByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();
  });

  it('Testa o botão Profile', () => {
    const { history } = renderWithRouter(<Header title="Meals" isRenderProfile />);
    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();
    userEvent.click(profileIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  it('Testa o botão Search', () => {
    render(<Header title="Meals" isRenderSearch />);
    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);
    const input = screen.getByTestId('search-input');
    expect(input).toBeInTheDocument();
    userEvent.click(searchIcon);
    expect(input).not.toBeInTheDocument();
  });

  it('Testa se o Header não aparece na página de Login', () => {
    render(<Login />);
    const header = screen.queryByTestId('page-title');
    expect(header).not.toBeInTheDocument();
  });

  it('Testa o Header com default parâmetros diferentes', () => {
    render(<Header isRenderProfile isRenderSearch />);
    const header = screen.queryByText('Título da Página Header');
    expect(header).toBeInTheDocument();
  });
});
