import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from '../../pages/404';

describe('NotFoundPage', () => {
  it('should render 404', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Back to site')).toBeInTheDocument();
  });
});
