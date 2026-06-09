import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SubmissionCard from '../components/Card';

const submission = {
  id: '1',
  name: 'NameTest',
  age: 20,
  email: 'test@mail.com',
  gender: 'male' as const,
  country: 'Russia',
  password: 'Aaaaaa!',
  image: '',
  acceptTerms: true,
  createdAt: Date.now(),
};

describe('Card', () => {
  it('renders data card', () => {
    render(<SubmissionCard submission={submission} />);
    expect(screen.getByText('NameTest')).toBeInTheDocument();
    expect(screen.getByText(/test@mail.com/)).toBeInTheDocument();
    expect(screen.getByText(/20/)).toBeInTheDocument();
    expect(screen.getByText(/Russia/)).toBeInTheDocument();
  });
});
