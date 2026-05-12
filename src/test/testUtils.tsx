import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ReactElement } from 'react';
import { ToastProvider } from '../components/ToastManager';

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });
}

export function renderWithProviders(ui: ReactElement, options?: RenderOptions & { route?: string }) {
  const client = createTestQueryClient();
  return render(
    <QueryClientProvider client={client}>
      <ToastProvider>
        <MemoryRouter initialEntries={[options?.route ?? '/']}>{ui}</MemoryRouter>
      </ToastProvider>
    </QueryClientProvider>,
    options
  );
}
