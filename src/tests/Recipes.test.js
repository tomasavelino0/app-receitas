import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';

const BEEF_CATEGORY_FILTER = 'Beef-category-filter';
const BREAKFAST_CATEGORY_FILTER = 'Breakfast-category-filter';
const CHICKEN_CATEGORY_FILTER = 'Chicken-category-filter';
const DESSERT_CATEGORY_FILTER = 'Dessert-category-filter';
const GOAT_CATEGORY_FILTER = 'Goat-category-filter';

const ORDINARY_DRINK_CATEGORY_FILTER = 'Ordinary-drink-category-filter';
const COCKTAIL_CATEGORY_FILTER = 'Cocktail-category-filter';
const SHAKE_CATEGORY_FILTER = 'Shake-category-filter';
const COCOA_CATEGORY_FILTER = 'Cocoa-category-filter';
const OTHER_UNKNOWN = 'Other-category-filter';
const ALL = 'All';

describe('Testa o componente Recipes', () => {
  it('Testa se os botões estão presentes na página de meals', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const btnBeef = screen.getByTestId(BEEF_CATEGORY_FILTER);
    const btnBreakfast = screen.getByTestId(BREAKFAST_CATEGORY_FILTER);
    const btnChicken = screen.getByTestId(CHICKEN_CATEGORY_FILTER);
    const btnDessert = screen.getByTestId(DESSERT_CATEGORY_FILTER);
    const btnGoat = screen.getByTestId(GOAT_CATEGORY_FILTER);
    const btnAll = screen.getByText(ALL);

    expect(btnBeef).toBeInTheDocument();
    expect(btnBreakfast).toBeInTheDocument();
    expect(btnChicken).toBeInTheDocument();
    expect(btnDessert).toBeInTheDocument();
    expect(btnGoat).toBeInTheDocument();
    expect(btnAll).toBeInTheDocument();
  });
  it('Testa se os botões estão presentes na página de drinks', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const btnOrdinary = screen.getByTestId(ORDINARY_DRINK_CATEGORY_FILTER);
    const btnCocktail = screen.getByTestId(COCKTAIL_CATEGORY_FILTER);
    const btnShake = screen.getByTestId(SHAKE_CATEGORY_FILTER);
    const btnCocoa = screen.getByTestId(COCOA_CATEGORY_FILTER);
    const btnAll = screen.getByText(ALL);
    const btnOther = screen.getByTestId(OTHER_UNKNOWN);

    expect(btnOrdinary).toBeInTheDocument();
    expect(btnCocktail).toBeInTheDocument();
    expect(btnShake).toBeInTheDocument();
    expect(btnCocoa).toBeInTheDocument();
    expect(btnAll).toBeInTheDocument();
    expect(btnOther).toBeInTheDocument();
  });
});
