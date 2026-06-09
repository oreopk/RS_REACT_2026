import { it, expect } from 'vitest';
import { convertToBase64 } from '../utils/convertToBase64';

it('converts file to base64', async () => {
  const file = new File(['hello'], 'test.txt', { type: 'text/plain' });
  const result = await convertToBase64(file);
  expect(typeof result).toBe('string');
});
