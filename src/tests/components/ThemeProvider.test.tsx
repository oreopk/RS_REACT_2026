import { describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../context/ThemeProvider';
import Header from '../../components/Header';
import { BrowserRouter } from 'react-router-dom';

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('default light theme', () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </ThemeProvider>
    );

    expect(document.documentElement).toHaveClass('light');
    expect(screen.getByRole('button', { name: 'Dark' })).toBeInTheDocument();
  });

  it('toggles theme', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </ThemeProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Dark' }));
    expect(document.documentElement).toHaveClass('dark');
    expect(localStorage.getItem('theme')).toBe('dark');

    await user.click(screen.getByRole('button', { name: 'Light' }));
    expect(document.documentElement).toHaveClass('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
