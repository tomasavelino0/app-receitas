import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import { mockFavoriteDrink, mockFavoriteMeal } from './mocks/favoriteRecipe';

describe('testes do componente FavoriteRecipes', () => {
  test('testa se renderiza a img de um Drink do localStorage', () => {
    jest.spyOn(localStorage, 'setItem');
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavoriteDrink));
    renderWithRouter(<FavoriteRecipes />);
    const imgDrink = screen.getByTestId('0-horizontal-image');
    expect(imgDrink).toBeInTheDocument();
  });
  test('Testa se renderiza a img de um Meal do localStorage', () => {
    jest.spyOn(localStorage, 'setItem');
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavoriteMeal));
    renderWithRouter(<FavoriteRecipes />);
    const favoriteRecipe = screen.getByAltText(/corba/i);
    expect(favoriteRecipe).toBeInTheDocument();
  });
  test('testa o filtro Meals', () => {
    jest.spyOn(localStorage, 'setItem');
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavoriteMeal));
    renderWithRouter(<FavoriteRecipes />);
    const favoriteRecipe = screen.getByAltText(/corba/i);
    expect(favoriteRecipe).toBeInTheDocument();
    const btnDrink = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(btnDrink);
    expect(favoriteRecipe).not.toBeInTheDocument();
  });
  test('testa o filtro Drink', () => {
    jest.spyOn(localStorage, 'setItem');
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavoriteDrink));
    renderWithRouter(<FavoriteRecipes />);
    const drinkItem = screen.getByTestId('0-horizontal-name');
    expect(drinkItem).toBeInTheDocument();
    const btnMealFilter = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(btnMealFilter);
    expect(drinkItem).not.toBeInTheDocument();
  });
  test('testa o filtro all', () => {
    jest.spyOn(localStorage, 'setItem');
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavoriteMeal));
    renderWithRouter(<FavoriteRecipes />);
    const favoriteRecipe = screen.getByAltText(/corba/i);
    expect(favoriteRecipe).toBeInTheDocument();
    const btnAll = screen.getByTestId('filter-by-all-btn');
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);
    expect(favoriteRecipe).toBeInTheDocument();
  });
  test('testa se remover dos favoritos', () => {
    jest.spyOn(localStorage, 'setItem');
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavoriteDrink));
    renderWithRouter(<FavoriteRecipes />);
    const drinkItem = screen.getByTestId('0-horizontal-name');
    expect(drinkItem).toBeInTheDocument();
    const btnFavorite = screen.getByAltText('Favorite button');
    expect(btnFavorite).toBeInTheDocument();
    userEvent.click(btnFavorite);
    expect(drinkItem).not.toBeInTheDocument();
  });
});
