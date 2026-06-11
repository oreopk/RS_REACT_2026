import './PasswordStrength.css';

function PasswordStrength({ password }: { password: string }) {
  let hasDigit = false;
  let hasLower = false;
  let hasUpper = false;
  let hasSpecial = false;

  for (const c of password) {
    if (c >= '0' && c <= '9') hasDigit = true;
    else if (c >= 'a' && c <= 'z') hasLower = true;
    else if (c >= 'A' && c <= 'Z') hasUpper = true;
    else hasSpecial = true;
  }

  const score = Number(hasDigit) + Number(hasLower) + Number(hasUpper) + Number(hasSpecial);

  return (
    <div className="strength">
      <div className="strength-bar">
        <div className={`strength-fill strength-${score}`} role="progressbar" aria-value={score} />
      </div>
    </div>
  );
}

export default PasswordStrength;
