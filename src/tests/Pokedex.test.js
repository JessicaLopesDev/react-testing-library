import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemonList from '../data';

import { Pokedex } from '../pages';
import renderWithRouter from '../renderWithRouter';

const pokemonlist1 = [
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

describe('Testes Pokedex.js', () => {
  const isFavorite = {};
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(
      <Pokedex pokemonList={ pokemonlist1 } isPokemonFavoriteById={ isFavorite } />,
    );

    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Encountered Pokémon');
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(
      <Pokedex pokemonList={ pokemonlist1 } isPokemonFavoriteById={ isFavorite } />,
    );

    const nextPokButton = screen.getByRole('button', { name: 'Próximo Pokémon' });
    expect(nextPokButton).toBeInTheDocument();

    userEvent.click(nextPokButton);

    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(
      <Pokedex pokemonList={ pokemonlist1 } isPokemonFavoriteById={ isFavorite } />,
    );

    const average = screen.getAllByText(/average/i);
    expect(average).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro e se funcionam corretamente', () => {
    renderWithRouter(
      <Pokedex pokemonList={ pokemonList } isPokemonFavoriteById={ isFavorite } />,
    );
    // Pega os botões de tipos e verifica se não se repetem na tela
    const pokemons = screen.getAllByTestId('pokemon-type-button');
    const pokemonTypes = pokemons.map((item) => item.type);
    expect(pokemonTypes).toHaveLength(7);

    // Verifica se aparece na tela apenas pokemons do tipo do botão clicado e se o botão tem o nome correto
    const fireButton = screen.getByRole('button', { name: 'Fire' });
    const currentPokemonType = screen.queryByTestId('pokemon-type');
    userEvent.click(fireButton);

    expect(currentPokemonType.innerHTML).toBe('Fire');
    expect(fireButton).toHaveTextContent('Fire');

    const nextPokButton = screen.getByRole('button', { name: 'Próximo Pokémon' });
    userEvent.click(nextPokButton);
    expect(currentPokemonType.innerHTML).toBe('Fire');

    // Verifica se o botão All está sempre visível
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    userEvent.click(allButton);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
