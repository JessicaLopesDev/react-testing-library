import React from 'react';

import { screen } from '@testing-library/react';

import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Testes NotFound.js', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });

  it('Verifica se a página contém um heading h2 com o texto Page requested not found', () => {
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Page requested not found');
  });

  it('Verifica se a página mostra a imagem correta', () => {
    const image = screen.getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
