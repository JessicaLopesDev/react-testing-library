import React from 'react';
import { screen } from '@testing-library/react';

import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Testes About.js', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  it('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    const title = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(title).toBeInTheDocument();
  });

  // it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  //   const paragraphs = screen.getAllByLabelText(<p />);
  //   expect(paragraphs).toHaveLength(2);
  // });

  it('Verifica se a página contém a imagem de uma Pokédex:', () => {
    const image = screen.getByAltText('Pokédex');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
