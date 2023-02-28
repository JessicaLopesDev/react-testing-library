import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Pokemon } from '../components';
import renderWithRouter from '../renderWithRouter';

const pokemonlist = [
  {
    id: 148,
    name: 'Dragonair',
    type: 'Dragon',
    averageWeight: {
      value: '16.5',
      measurementUnit: 'kg',
    },
    image: 'https://archives.bulbagarden.net/media/upload/2/2c/Spr_5b_148.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Dragonair_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Johto Route 45',
        map: 'https://archives.bulbagarden.net/media/upload/2/21/Johto_Route_45_Map.png',
      },
      {
        location: 'Johto Dragon\'s Den',
        map: 'https://archives.bulbagarden.net/media/upload/1/1e/Johto_Dragons_Den_Map.png',
      },
    ],
    summary: 'They say that if it emits an aura from its whole body, the weather will begin to change instantly.',
  },
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  },
];

describe('Testes do Pokemon.js', () => {
  it('Verifica se é renderizado um card com as informações corretas do Pokémon', () => {
    renderWithRouter(
      <Pokemon isFavorite={ false } pokemon={ pokemonlist[0] } />,
    );
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonAverageWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByAltText('Dragonair sprite');

    expect(pokemonName).toHaveTextContent('Dragonair');
    expect(pokemonType).toHaveTextContent('Dragon');
    expect(pokemonAverageWeight).toHaveTextContent('Average weight: 16.5 kg');
    expect(pokemonImg).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/2/2c/Spr_5b_148.png');
  });

  it('se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
    const { history } = renderWithRouter(
      <Pokemon isFavorite pokemon={ pokemonlist[0] } />,
    );
    const detailsLink = screen.getByRole('link', { name: 'More details' });

    screen.logTestingPlaygroundURL();
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', '/pokemon/148');

    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/148');

    const favoriteImg = screen.getByAltText('Dragonair is marked as favorite');
    expect(favoriteImg).toBeInTheDocument();
    expect(favoriteImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
