import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import Analysis from './Analysis';
import { ToastManager } from '../components/ToastManager';
import { renderWithProviders } from '../test/testUtils';
import { demoAnalysis } from '../lib/demoData';

test('renders fetched analysis scores and feedback', async () => {
  global.fetch = jest.fn().mockResolvedValueOnce({ ok: true, json: async () => ({ ...demoAnalysis, id: 'abc' }) }) as jest.Mock;

  renderWithProviders(
    <Routes>
      <Route path="/analysis/:id" element={<Analysis />} />
    </Routes>,
    { route: '/analysis/abc' }
  );

  expect(await screen.findByRole('heading', { name: /analysis for product manager/i })).toBeInTheDocument();
  expect(screen.getByRole('progressbar', { name: /overall/i })).toHaveAttribute('aria-valuenow', '82');
  expect(screen.getByRole('heading', { name: /highlighted resume feedback/i })).toBeInTheDocument();
});

test('exports an analysis through the API client', async () => {
  const user = userEvent.setup();
  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({ ok: true, json: async () => ({ ...demoAnalysis, id: 'abc' }) })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ analysisId: 'abc', downloadUrl: '/downloads/abc.pdf', expiresAt: '2026-05-06T10:00:00.000Z' })
    }) as jest.Mock;

  renderWithProviders(
    <>
      <Routes>
        <Route path="/analysis/:id" element={<Analysis />} />
      </Routes>
      <ToastManager />
    </>,
    { route: '/analysis/abc' }
  );

  await screen.findByRole('heading', { name: /analysis for product manager/i });
  await user.click(screen.getByRole('button', { name: /^pdf$/i }));

  await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(
    '/api/export/abc',
    expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ format: 'pdf', includeHighlights: true, includeRewrite: true })
    })
  ));
  expect(window.location.assign).toHaveBeenCalledWith('/downloads/abc.pdf');
});
