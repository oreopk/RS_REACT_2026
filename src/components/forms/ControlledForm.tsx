import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFormSchema } from '../../schema/formSchema';
import { useFormStore } from '../../store/useFormStore';
import type { z } from 'zod';
import { convertToBase64 } from '../../utils/convertToBase64';
import PasswordStrength from '../../components/PasswordStrength/PasswordStrength';

function ControlledForm({ onClose }: { onClose: () => void }) {
  const countries = useFormStore((s) => s.countries);
  const addSubmission = useFormStore((s) => s.addSubmission);

  const schema = createFormSchema(countries);
  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isValid, isSubmitted },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const password = useWatch({ control, name: 'password' }) || '';

  const onSubmit = async (data: FormData) => {
    const base64 = await convertToBase64(data.image);
    addSubmission({
      name: data.name,
      age: data.age,
      email: data.email,
      gender: data.gender,
      country: data.country,
      password: data.password,
      acceptTerms: data.acceptTerms,
      image: base64,
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button type="button" onClick={onClose}>
        Close
      </button>

      <label>
        Name
        <input type="text" {...register('name')} />
      </label>
      {errors.name && <span className="error">{errors.name.message}</span>}

      <label>
        Age
        <input type="number" {...register('age', { valueAsNumber: true })} />
      </label>
      {errors.age && <span className="error">{errors.age.message}</span>}

      <label>
        Email
        <input type="email" {...register('email')} />
      </label>
      {errors.email && <span className="error">{errors.email.message}</span>}

      <div className="radiogroup" role="radiogroup" aria-label="Gender">
        <label>
          <input type="radio" value="male" {...register('gender')} /> Male
        </label>
        <label>
          <input type="radio" value="female" {...register('gender')} /> Female
        </label>
      </div>
      {errors.gender && <span className="error">{errors.gender.message}</span>}

      <label>
        Country
        <input
          type="text"
          list="countriesControlledForm"
          autoComplete="off"
          {...register('country')}
        />
        <datalist id="countriesControlledForm">
          {countries.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </label>
      {errors.country && <span className="error">{errors.country.message}</span>}

      <label>
        Image
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setValue('image', file, { shouldValidate: true });
            }
          }}
        />
        {errors.image && <span className="error">{errors.image.message}</span>}
      </label>

      <label>
        Password
        <input type="password" {...register('password')} />
      </label>
      <PasswordStrength password={password} />
      {errors.password && <span className="error">{errors.password.message}</span>}

      <label>
        Confirm password
        <input type="password" {...register('confirmPassword')} />
      </label>
      {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}

      <label className="acceptTerms">
        <input type="checkbox" {...register('acceptTerms')} />I accept terms
      </label>
      {errors.acceptTerms && <span className="error">{errors.acceptTerms.message}</span>}

      <button type="submit" disabled={isSubmitted && !isValid}>
        Submit
      </button>
    </form>
  );
}

export default ControlledForm;
