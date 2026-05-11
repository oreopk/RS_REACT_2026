import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../../App';

describe('App', () => {
  it('if error API should returns not ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({ detail: [{ msg: 'Server error' }] }),
        })
      )
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Server error')).toBeInTheDocument();
    });

    vi.unstubAllGlobals();
  });
});
