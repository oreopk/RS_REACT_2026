import { describe, it, expect } from 'vitest';
import { useFormStore } from '../store/useFormStore';

describe('useFormStore', () => {
  it('countries list', () => {
    const countries = useFormStore.getState().countries;
    expect(countries.length).toBeGreaterThan(0);
  });

  it('adds submission', () => {
    useFormStore.getState().addSubmission({
      name: 'NameTest',
      age: 20,
      email: 'test@mail.com',
      gender: 'male' as const,
      country: 'Russia',
      password: 'Aaaaaa!',
      image: '',
      acceptTerms: false,
    });

    const submissions = useFormStore.getState().submissions;
    expect(submissions[0].name).toBe('NameTest');
    expect(submissions[0].id).toBeDefined();
    expect(submissions[0].createdAt).toBeDefined();
  });
});
