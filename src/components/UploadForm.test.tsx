import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { UploadForm } from './UploadForm';
import { ToastManager } from './ToastManager';
import { renderWithProviders } from '../test/testUtils';

test('loads demo analysis after consent without uploading the file', async () => {
  global.fetch = jest.fn() as jest.Mock;
  const user = userEvent.setup();

  renderWithProviders(
    <>
      <Routes>
        <Route path="/" element={<UploadForm />} />
        <Route path="/analysis/:id" element={<h2>Analysis loaded</h2>} />
      </Routes>
      <ToastManager />
    </>
  );

  await user.upload(screen.getByLabelText(/resume file/i), new File(['resume'], 'resume.pdf', { type: 'application/pdf' }));
  await user.type(screen.getByLabelText(/target role/i), 'Engineer');
  await user.click(screen.getByRole('button', { name: /analyze resume/i }));
  await user.click(await screen.findByRole('button', { name: /i have consent/i }));

  expect(global.fetch).not.toHaveBeenCalled();
  expect(await screen.findByText(/demo analysis loaded/i)).toBeInTheDocument();
  expect(await screen.findByRole('heading', { name: /analysis loaded/i })).toBeInTheDocument();
});

test('requires a supported file before upload', async () => {
  global.fetch = jest.fn() as jest.Mock;
  const user = userEvent.setup();

  renderWithProviders(
    <>
      <UploadForm />
      <ToastManager />
    </>
  );

  await user.type(screen.getByLabelText(/target role/i), 'Engineer');
  await user.click(screen.getByRole('button', { name: /analyze resume/i }));

  expect(await screen.findByText(/choose a pdf or docx/i)).toBeInTheDocument();
  expect(global.fetch).not.toHaveBeenCalled();
});
