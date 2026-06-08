import { useState } from 'react';
import { createFormSchema } from '../../schema/formSchema';
import { useFormStore } from '../../store/useFormStore';
import type { ChangeEvent, FormEvent } from 'react';
import { convertToBase64 } from '../../utils/convertToBase64';

type Errors = Partial<Record<string, string>>;

function UncontrolledForm({ onClose }: { onClose: () => void }) {
  const [errors, setErrors] = useState<Errors>({});
  const countries = useFormStore((s) => s.countries);
  const addSubmission = useFormStore((s) => s.addSubmission);
  const [imageBase64, setImageBase64] = useState('');

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return setImageBase64('');
    const base64 = await convertToBase64(file);
    setImageBase64(base64);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      name: String(formData.get('name') ?? ''),
      age: Number(formData.get('age')),
      email: String(formData.get('email') ?? ''),
      gender: formData.get('gender') as 'male' | 'female' | null,
      country: String(formData.get('country') ?? ''),
      password: String(formData.get('password') ?? ''),
      confirmPassword: String(formData.get('confirmPassword') ?? ''),
      image: formData.get('image') as File,
      acceptTerms: formData.get('acceptTerms') === 'on',
    };

    const schema = createFormSchema(countries);
    const result = schema.safeParse(data);

    if (!result.success) {
      const newErrors: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as string;
        if (!newErrors[key]) newErrors[key] = issue.message;
      }
      setErrors(newErrors);
      return;
    }

    addSubmission({
      name: result.data.name,
      age: result.data.age,
      email: result.data.email,
      gender: result.data.gender,
      country: result.data.country,
      password: result.data.password,
      image: imageBase64,
      acceptTerms: result.data.acceptTerms,
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="button" onClick={onClose}>
        Close
      </button>

      <label>
        Name
        <input type="text" name="name" />
      </label>
      {errors.name && <span className="error">{errors.name}</span>}

      <label>
        Age
        <input type="number" name="age" />
      </label>
      {errors.age && <span className="error">{errors.age}</span>}

      <label>
        Email
        <input type="email" name="email" />
      </label>
      {errors.email && <span className="error">{errors.email}</span>}

      <div className="radiogroup" role="radiogroup" aria-label="Gender">
        <label>
          <input type="radio" name="gender" value="male" /> Male
        </label>
        <label>
          <input type="radio" name="gender" value="female" /> Female
        </label>
      </div>
      {errors.gender && <span className="error">{errors.gender}</span>}

      <label>
        Country
        <input type="text" name="country" list="countriesUncontrolledForm" autoComplete="off" />
        <datalist id="countriesUncontrolledForm">
          {countries.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </label>
      {errors.country && <span className="error">{errors.country}</span>}

      <label>
        Image
        <input
          type="file"
          name="image"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
        />{' '}
      </label>
      {errors.image && <span className="error">{errors.image}</span>}

      <label>
        Password
        <input type="password" name="password" />
      </label>
      {errors.password && <span className="error">{errors.password}</span>}

      <label>
        Confirm password
        <input type="password" name="confirmPassword" />
      </label>
      {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

      <label className="acceptTerms">
        <input type="checkbox" name="acceptTerms" />I accept terms
      </label>
      {errors.acceptTerms && <span className="error">{errors.acceptTerms}</span>}

      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledForm;
