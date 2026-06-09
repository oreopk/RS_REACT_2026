import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import UncontrolledForm from '../components/forms/UncontrolledForm';

describe('UncontrolledForm', () => {
  it('renders all label in form', () => {
    render(<UncontrolledForm onClose={() => {}} />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });
});
