import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ScriptElementKind } from 'typescript';
import ColorGenerator from './ColorGenerator';

test('Render ColorgGen App', () => {
  render(<ColorGenerator />, { wrapper: MemoryRouter });

  const colorInputs = screen.getAllByRole('row');
  expect(colorInputs).toHaveLength(2);
});
