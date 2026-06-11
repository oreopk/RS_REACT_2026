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

      <label htmlFor="name">Name</label>
      <input id="name" type="text" {...register('name')} />
      {errors.name && <span className="error">{errors.name.message}</span>}

      <label htmlFor="age">Age</label>
      <input id="age" type="number" {...register('age', { valueAsNumber: true })} />
      {errors.age && <span className="error">{errors.age.message}</span>}

      <label htmlFor="email">Email</label>
      <input id="email" type="email" {...register('email')} />
      {errors.email && <span className="error">{errors.email.message}</span>}

      <div className="radiogroup" role="radiogroup" aria-label="Gender">
        <input id="gender-male" type="radio" value="male" {...register('gender')} />
        <label htmlFor="gender-male">Male</label>
        <input id="gender-female" type="radio" value="female" {...register('gender')} />
        <label htmlFor="gender-female">Female</label>
      </div>
      {errors.gender && <span className="error">{errors.gender.message}</span>}

      <label htmlFor="country">Country</label>
      <input
        id="country"
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
      {errors.country && <span className="error">{errors.country.message}</span>}

      <label htmlFor="image">Image</label>
      <input
        id="image"
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

      <label htmlFor="password">Password</label>
      <input id="password" type="password" {...register('password')} />
      <PasswordStrength password={password} />
      {errors.password && <span className="error">{errors.password.message}</span>}

      <label htmlFor="confirmPassword">Confirm password</label>
      <input id="confirmPassword" type="password" {...register('confirmPassword')} />
      {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}

      <div className="acceptTerms">
        <input id="acceptTerms" type="checkbox" {...register('acceptTerms')} />
        <label htmlFor="acceptTerms">I accept terms</label>
      </div>
      {errors.acceptTerms && <span className="error">{errors.acceptTerms.message}</span>}

      <button type="submit" disabled={isSubmitted && !isValid}>
        Submit
      </button>
    </form>
  );
}

export default ControlledForm;
