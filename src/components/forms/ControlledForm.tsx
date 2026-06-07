function ControlledForm({ onClose }: { onClose: () => void }) {
  return (
    <form>
      <button onClick={onClose}>Close</button>
      <label>
        Name
        <input type="text" name="name" />
      </label>
      <label>
        Age
        <input type="number" name="age" />
      </label>
      <label>
        Email
        <input type="email" name="email" />
      </label>

      <div className="radiogroup" role="radiogroup" aria-label="Gender">
        <label>
          <input type="radio" name="gender" value="male" /> Male
        </label>
        <label>
          <input type="radio" name="gender" value="female" /> Female
        </label>
      </div>

      <label>
        Country
        <input type="text" name="country" list="countriesControlledForm" autoComplete="off" />
        <datalist id="countriesControlledForm">
          <option value="Russia" />
          <option value="USA" />
          <option value="Germany" />
        </datalist>
      </label>

      <label>
        Image
        <input type="file" name="image" accept="image/png, image/jpeg" />
      </label>

      <label>
        Password
        <input type="password" name="password" />
      </label>

      <label>
        Confirm password
        <input type="password" name="confirmPassword" />
      </label>

      <label className="acceptTerms">
        <input type="checkbox" name="acceptTerms" />I accept terms
      </label>

      <button type="button">Submit</button>
    </form>
  );
}
export default ControlledForm;
