import React from 'react';

import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes App.js', () => {
  it('Verifica se o topo da aplicação contém os links de navegação: Home, About e Favorite Pokémon', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();

    const favPokemonLink = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(favPokemonLink).toBeInTheDocument();
  });

  it('Verifica se ao clicar no link Home, redireciona para a página inicial na URL /', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica se ao clicar no link About, redireciona para a página de About na URL /about', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Verifica se ao clicar no link Favorite Pokémon, redireciona para a página correta', () => {
    const { history } = renderWithRouter(<App />);
    const favPokemonLink = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favPokemonLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Verifica se ao clicar no link Favorite Pokémon, redireciona para a página correta', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pagina-que-nao-existe');
    });

    const notFound = screen.getByText(/not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
