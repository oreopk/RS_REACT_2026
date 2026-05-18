import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import AboutPage from '../../pages/About';

describe('AboutPage', () => {
  it('should render about page', () => {
    render(<AboutPage />);

    expect(screen.getByText('ABOUT')).toBeInTheDocument();
    expect(screen.getByText('Author: Kozin Pavel')).toBeInTheDocument();
    expect(screen.getByText('RS School React Course')).toBeInTheDocument();
  });
});
