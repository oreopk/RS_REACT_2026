import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../../App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('App', () => {
  it('if error API should returns Server error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve(
          new Response(JSON.stringify({ detail: [{ msg: 'Server error' }] }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          })
        )
      )
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
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
        Promise.resolve(
          new Response(
            JSON.stringify({
              numFound: 1,
              docs: [{ key: '/works/OL23286W', title: 'The Last Kingdom' }],
            })
          )
        )
      )
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('The Last Kingdom')).toBeInTheDocument();
    });

    vi.unstubAllGlobals();
  });
});
