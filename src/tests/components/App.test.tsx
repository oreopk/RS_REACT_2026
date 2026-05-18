import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../../App';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
  it('if error API should returns Server error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({ detail: [{ msg: 'Server error' }] }),
        })
      )
    );

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Server error')).toBeInTheDocument();
    });

    vi.unstubAllGlobals();
  });

  it('renders books when page open', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              numFound: 1,
              docs: [{ key: '/works/OL23286W', title: 'The Last Kingdom' }],
            }),
        })
      )
    );

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('The Last Kingdom')).toBeInTheDocument();
    });

    vi.unstubAllGlobals();
  });
});
