import { screen } from '@testing-library/react';
import { App } from './App';
import { renderWithProviders } from './test/testUtils';

test('renders the home upload route', async () => {
  renderWithProviders(<App />);

  expect(await screen.findByRole('heading', { name: /analyze a resume/i })).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: /primary navigation/i })).toBeInTheDocument();
});

test('lazy loads dashboard route', async () => {
  renderWithProviders(<App />, { route: '/dashboard' });

  expect(await screen.findByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
  expect(screen.getByText(/recent resume analyses/i)).toBeInTheDocument();
});
