import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('Renders the main page', () => {
  render(<App />, { wrapper: MemoryRouter });
});
